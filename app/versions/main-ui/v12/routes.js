const express = require('express')
const router = express.Router()

const reportingService = require('../../../services/reportingService')
const dataFormats = require('./data/reportDataFormats')
const { filterTableLayoutHandlers } = require('../v12/components/data-table-layout/handlers')
const handlers = require('../../../utils/handlers')
const listEndpoints = require('express-list-endpoints')
const listDefinitions = require('./data/listDefinitions')
const dashboardDefinitions = require('./data/dashboardDefinitions')
const filterHandlers = require('./components/filters/handlers')
const { getRagStatus, distinct } = require('./utils/metrics')

const version = 'v12'

const distinctKeywords = (values, value) => values.find(v => v.type === value.type && v.value === value.value) ? values : values.concat(value)
const stringSort = (a, b) => a > b ? 1 : -1

const getTags = (definitions) => definitions
  .flatMap(d => d.tags)
  .reduce(distinct, [])
  .sort(stringSort)

const getAuthors = (definitions) => definitions
  .map(d => d.author)
  .reduce(distinct, [])
  .sort(stringSort)

const getKeywords = (definitions) => definitions
  .flatMap(d => Object.keys(d.keywords).map(k => ({ type: k, value: d.keywords[k] })))
  .reduce(distinctKeywords, [])
  .sort((a, b) => a.type === b.type ? (a.value > b.value ? 1 : -1) : (a.type > b.type ? 1 : -1))

const getSelectedKeywords = (selectedKeywords, definitions) => selectedKeywords
  .flatMap(k => definitions.flatMap(d => Object.keys(d.keywords).filter(dk => d.keywords[dk] === k).map(dk => ({ type: dk, value: k }))))
  .reduce(distinctKeywords, [])

const getSelectedValues = (req, section) => req.query[section] ? (Array.isArray(req.query[section]) ? req.query[section] : req.query[section].split(/,/)) : []

const renderSearch = (req, res, type, definitions) => {
  const selectedTags = getSelectedValues(req, 'tags')
  const selectedAuthors = getSelectedValues(req, 'authors')
  const selectedKeywords = getSelectedValues(req, 'keywords')
  const searchValue = !req.query.search ? req.query.prevSearch : req.query.search

  const filteredDefinitionRows = definitions
    .filter(d => (!searchValue || d.name.toLowerCase().includes(searchValue.toLowerCase())))
    .filter(d => (selectedTags.length === 0 || d.tags.find(t => selectedTags.includes(t))))
    .filter(d => (selectedAuthors.length === 0 || selectedAuthors.includes(d.author)))
    .filter(d => (selectedKeywords.length === 0 || Object.values(d.keywords).find(k => selectedKeywords.includes(k))))
    .sort((a, b) => a.name > b.name ? 1 : -1)
    .map(d => ([
      { text: d.name },
      { html: d.tags.map(t => '<strong class="govuk-tag">' + t + '</strong>').join('&nbsp;') }
    ]))

  res.render(`main-ui/${version}/views/search`, {
    ...req.renderOptions,
    type,
    searchValue,
    definitions,
    definitionRows: filteredDefinitionRows,
    tags: getTags(listDefinitions),
    authors: getAuthors(listDefinitions),
    keywords: getKeywords(listDefinitions),
    selectedTags,
    selectedAuthors,
    selectedKeywords: getSelectedKeywords(selectedKeywords, listDefinitions),
    breadcrumbs: [{
      text: 'Home',
      href: '/'
    },
    {
      text: 'Main UI',
      href: '/main-ui'
    },
    {
      text: version.toUpperCase() + ' Home',
      href: `/main-ui/${version}/`
    }]
  })
}

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  renderSearch(req, res, 'lists', [
    ...listDefinitions.map(l => ({
      ...l,
      type: 'List',
      path: 'lists'
    })),
    ...dashboardDefinitions.map(d => ({
      ...d,
      type: 'Dashboard',
      path: 'metrics',
      id: d.metrics ? d.id : false // Don't show a link for dashboards with no metrics
    }))
  ])
}])

router.get('/lists/:listId', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  (req, res, next) => {
    const listId = req.params.listId
    const list = listDefinitions.find(definition => definition.id === listId)

    req.dataTableLayoutOptions = {
      title: list.name,
      version,
      dataFormat: list.dataFormat ?? dataFormats.externalMovements,
      listData: list.listData ?? reportingService.listExternalMovements,
      countData: list.countData ?? reportingService.countExternalMovements
    }

    req.renderOptions.breadcrumbs = [
      {
        text: 'Home',
        href: '/'
      },
      {
        text: 'Main UI',
        href: '/main-ui'
      },
      {
        text: version.toUpperCase() + ' Home',
        href: `/main-ui/${version}/`
      }
    ]
    next()
  },
  ...filterTableLayoutHandlers
])

function getDashboard (dashboardId) {
  return dashboardDefinitions.find(definition => definition.id === dashboardId)
}

function getMetrics (dashboard, filterValues, compareFilterValues) {
  return dashboard.metrics.map((m, index, all) => {
    let metrics = m.value
    let previousMetrics = null

    if (m.values) {
      if (filterValues) {
        metrics = m.values

        filterValues
          .filter(v => !Array.isArray(v.value))
          .forEach(v => {
            metrics = metrics[v.value]
          })
      }

      if (compareFilterValues) {
        previousMetrics = m.values

        compareFilterValues
          .filter(v => v !== null && !Array.isArray(v.value))
          .forEach(v => {
            previousMetrics = previousMetrics[v.value]
          })

        if (m.type === 'chartCard' && previousMetrics) {
          metrics = {
            ...metrics,
            chart: metrics.chart.map((chart, index) => ({
              ...chart,
              data: chart.data.concat(previousMetrics.chart[index].data)
            }))
          }
        }

        if (m.type === 'chartCard') {
          const rangeFilterValue = filterValues.find(f => Array.isArray(f.value))

          if (rangeFilterValue) {
            metrics = {
              ...metrics,
              chart: metrics.chart.map(chart => {
                const matchingIndices = chart.labels.map((label, index) => ({ label, index })).filter(l => rangeFilterValue.value.includes(l.label)).map(l => (l.index))

                return {
                  ...chart,
                  labels: chart.labels.filter(l => rangeFilterValue.value.includes(l)),
                  data: chart.data.filter(d => ({
                    title: d.title,
                    data: d.data.filter((dataPoint, index) => matchingIndices.includes(index))
                  }))
                }
              })
            }
          }
        }
      }
    }

    let status = m.status

    if (m.ragThresholdRules) {
      const value = metrics && metrics.headline ? metrics.headline : metrics

      if (!Number.isNaN(Number.parseFloat(value))) {
        status = {
          colour: getRagStatus(value, m.ragThresholdRules)
        }
      }
    }

    let groupStart = false
    let groupEnd = false

    if (index === 0) {
      groupStart = true
    } else if (index === all.length - 1) {
      groupEnd = true
    } else {
      if (all[index - 1].type !== m.type) {
        groupStart = true
      }

      if (all[index + 1].type !== m.type) {
        groupEnd = true
      }
    }

    return {
      ...m,
      groupStart,
      groupEnd,
      value: metrics,
      previousValue: previousMetrics,
      status
    }
  })
}

function getFilterValues (req, dashboard) {
  if (!dashboard.filters) {
    return null
  }

  return dashboard.filters.map(filter => {
    const filterValue = req.renderOptions.filterValues[filter.name]

    if (filter.type === 'SelectRange') {
      let startIndex = filter.options.findIndex(o => o.value === (req.renderOptions.filterValues[filter.name] ?? {}).start)
      let endIndex = filter.options.findIndex(o => o.value === (req.renderOptions.filterValues[filter.name] ?? {}).end)

      startIndex = startIndex === -1 ? 0 : startIndex
      endIndex = endIndex === -1 ? filter.options.length - 1 : endIndex

      if (startIndex > endIndex) {
        const tempIndex = endIndex
        endIndex = startIndex
        startIndex = tempIndex
      }

      return {
        name: filter.name,
        value: filter.options.map(o => o.value).slice(startIndex, endIndex + 1)
      }
    } else {
      if (!filterValue && filter.options) {
        return {
          name: filter.name,
          value: filter.options[filter.options.length - 1].value
        }
      }
    }

    return {
      name: filter.name,
      value: filterValue
    }
  })
}

function getCompareFilterValues (req, filterValues, dashboard) {
  if (!dashboard.filters || !dashboard.filters.find(f => f.type === 'SelectComparison')) {
    return null
  }

  return dashboard.filters
    .map(filter => {
      const compareFilterValue = req.renderOptions.filterValues[`${filter.name}.compare`]

      if (compareFilterValue) {
        return {
          name: filter.name,
          value: compareFilterValue
        }
      } else if (filter.options) {
        const filterValueIndex = filter.options
          .findIndex(o => o.value === filterValues.find(fv => fv.name === filter.name).value)

        if (filterValueIndex > -1) {
          const prevFilterValueIndex = filterValueIndex === 0 ? filterValueIndex + 1 : filterValueIndex - 1

          return {
            name: filter.name,
            value: filter.options[prevFilterValueIndex].value
          }
        }
      }

      return null
    })
}

router.get('/metrics/:dashboardId/', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  filterHandlers.configureFilterOptions,
  function (req, res) {
    const dashboardId = req.params.dashboardId
    const dashboard = getDashboard(dashboardId)
    const filterValues = getFilterValues(req, dashboard)
    const compareFilterValues = getCompareFilterValues(req, filterValues, dashboard)
    const filters = dashboard.filters
      ? dashboard.filters.map(filter => {
        const filterValue = filterValues ? filterValues.find(v => v.name === filter.name) : null
        const compareFilterValue = compareFilterValues ? compareFilterValues.find(v => v && v.name === filter.name) : null

        return {
          ...filter,
          value: filterValue ? filterValue.value : null,
          compareValue: compareFilterValue ? compareFilterValue.value : null
        }
      })
      : null

    res.render(`main-ui/${version}/views/metrics-dashboard`,
      {
        ...req.renderOptions,
        metrics: getMetrics(dashboard, filterValues, compareFilterValues),
        title: dashboard.name,
        category: dashboardId,
        metric: dashboard,
        filters,
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Main UI',
            href: '/main-ui'
          },
          {
            text: version.toUpperCase() + ' Home',
            href: `/main-ui/${version}/`
          }
        ]
      }
    )
  }
])

router.get('/routes', (req, res) => {
  res.status(200).send(listEndpoints(router))
})

const myLists = []

router.post('/addToMyList/', (req, res) => {
  const data = JSON.parse(req.body.data)

  const savedList = myLists.find((list) => {
    return list.appliedFilters === data.appliedFilters
  })

  if (!savedList) {
    data.id = myLists.length
    myLists.push(data)
  }

  res.end()
})

router.post('/removeFromMyList/', (req, res) => {
  const { id } = req.body
  const index = myLists.find((list) => list.id === id)
  myLists.splice(index, 1)
  res.end()
})

module.exports = router
