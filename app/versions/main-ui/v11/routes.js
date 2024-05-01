const express = require('express')
const router = express.Router()

const reportingService = require('../../../services/reportingService')
const dataFormats = require('./data/reportDataFormats')
const { filterTableLayoutHandlers } = require('../v6/components/data-table-layout/handlers')
const handlers = require('../../../utils/handlers')
const listEndpoints = require('express-list-endpoints')
const listDefinitions = require('../../../data/listDefinitions')
const dashboardDefinitions = require('../../../data/dashboardDefinitions')

const version = 'v11'

const distinct = (values, value) => values.includes(value) ? values : values.concat(value)
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

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`main-ui/${version}/views/cards`, {
    ...req.renderOptions,
    title: 'Version 11',
    cards: [{
      text: 'Lists',
      href: './lists/',
      description: 'Tabular data (e.g. prisoner movements).'
    }, {
      text: 'Metrics',
      href: './metrics/',
      description: 'Grouped and summarised data (e.g. prisoners arriving today).'
    }],
    myLists,
    breadcrumbs: [{
      text: 'Home',
      href: '/'
    },
    {
      text: 'Main UI',
      href: '/main-ui'
    }]
  })
}])

router.get('/lists/save', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('main-ui/v11/views/save-list', {
    ...req.renderOptions,
    title: 'Pin to homepage',
    myLists,
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
}])

router.get('/lists/manage', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`main-ui/${version}/views/manage-lists`, {
    ...req.renderOptions,
    title: 'Manage pins',
    myLists,
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
}])

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

router.get('/lists/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  renderSearch(req, res, 'lists', listDefinitions)
}])

router.get('/lists/:listId', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  (req, res, next) => {
    const listId = req.params.listId
    const list = listDefinitions.find(definition => definition.id === listId)

    req.dataTableLayoutOptions = {
      dataFormat: dataFormats.externalMovements,
      title: list.name,
      listData: reportingService.listExternalMovements,
      countData: reportingService.countExternalMovements,
      version: 'v9'
    }
    req.renderOptions.breadcrumbs = [{
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
    next()
  },
  ...filterTableLayoutHandlers
])

function getCategories (dashboard) {
  return dashboardDefinitions
    .filter(definition => definition.product === dashboard.product)
    .map(definition => ({
      id: definition.id,
      name: definition.name.startsWith(dashboard.product) ? definition.name.replace(`${dashboard.product} `, '') : definition.name
    }))
}

function getDashboard (dashboardId) {
  return dashboardDefinitions.find(definition => definition.id === dashboardId)
}

router.get('/metrics/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  const definitions = dashboardDefinitions.map(d => ({
    ...d,
    id: d.metrics ? d.id : false // Don't show a link for dashboards with no metrics
  }))
  renderSearch(req, res, 'metrics', definitions)
}])

router.get('/metrics/:dashboardId/', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  function (req, res) {
    const dashboardId = req.params.dashboardId
    const dashboard = getDashboard(dashboardId)

    res.render(`main-ui/${version}/views/metrics-dashboard`,
      {
        ...req.renderOptions,
        data: dashboard.metrics,
        categories: getCategories(dashboard),
        title: dashboard.name,
        category: dashboardId,
        metric: dashboard,
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
          },
          {
            text: 'Metrics',
            href: `/main-ui/${version}/metrics/`
          }
        ]
      }
    )
  }])

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
