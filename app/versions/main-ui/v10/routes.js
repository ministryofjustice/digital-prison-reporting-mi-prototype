const express = require('express')
const router = express.Router()

const reportDefinition = require('../../../data/reportDefinition')

const reportingService = require('../../../services/reportingService')
const dataFormats = require('../../../data/reportDataFormats')
const { filterTableLayoutHandlers } = require('./components/data-table-layout/handlers')
const { configureFilterOptions } = require('../v1/components/filters/handlers')
const handlers = require('../../../utils/handlers')
const { getBreadcrumbs } = require('../../../utils/utils')
const { getFilters, getSortedBy } = require('./components/filters/utils')
const listEndpoints = require('express-list-endpoints')
const { v4: uuidv4 } = require('uuid');

const getTodayMinusDays = days => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().substring(0, 10)
}

const version = 'v10'

const reports = [{
  id: 'all',
  text: 'All',
  href: './report/all',
  description: 'A record of all prisoner external movements.',
  query: ''
}, {
  id: 'admissions-last-week',
  text: 'Admissions last week',
  href: './report/admissions-last-week',
  description: 'A list of admissions in the past week. Classified as OFFICIAL.',
  query: '?filters.date.start=' + getTodayMinusDays(8) + '&filters.date.end=' + getTodayMinusDays(0) + '&filters.direction=in&filters.type=admission&classification=OFFICIAL'
}, {
  id: 'yesterdays-transfers-out',
  text: 'Yesterday\'s transfers out',
  href: './report/yesterdays-transfers-out',
  description: 'A list of yesterday\'s transfers out. Not printable.',
  query: '?filters.date.start=' + getTodayMinusDays(1) + '&filters.date.end=' + getTodayMinusDays(0) + '&filters.direction=out&filters.type=transfer&printable=false'
}]

const recentlyViewed = []
const requested = []

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`main-ui/${version}/views/home`, {
    ...req.renderOptions,
    title: 'Version 10 - Asynchronous Reports',
    recentlyViewed,
    requested,
    reports,
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



router.get('/report/:id', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  (req, res, next) => {
    const report = reports.find((r) => r.id === req.params.id)
    req.query = Object.fromEntries(new URLSearchParams(report.query.replace(/&amp;/g, "&")))
    next()
  },
  configureFilterOptions,
  (req, res) => {
    const variantId = req.params.id
    const variant = reportDefinition.report.variants.find((v) => v.id === variantId)
    const fields = variant.specification.fields

    res.render(`main-ui/${version}/views/list-query`, {
      ...req.renderOptions,
      reportName: "External Movements",
      variantName: variant.name,
      filters: getFilters(fields, req.renderOptions.filterValues),
      sortedBy: getSortedBy(fields),
      variant,
      fields: variant.specification.fields,
      breadcrumbs: [{
        text: 'Home',
        href: '/'
      },
      {
        text: 'Main UI',
        href: '/main-ui'
      },
      {
        text: 'Version 10',
        href: '/main-ui/v10/'
      }]
    })
  }
])

router.get('/expired/:id', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  (req, res, next) => {
    const report = recentlyViewed.find((r) => r.requestId === req.params.id)
    req.query = Object.fromEntries(new URLSearchParams(report.query.replace(/&amp;/g, "&")))
    next()
  },
  configureFilterOptions,
  (req, res) => {
    const report = recentlyViewed.find((r) => r.requestId === req.params.id)
    const variantId = report.id
    const variant = reportDefinition.report.variants.find((v) => v.id === variantId)
    const fields = variant.specification.fields

    res.render(`main-ui/${version}/views/list-query`, {
      ...req.renderOptions,
      reportName: "External Movements",
      variantName: variant.name,
      filters: getFilters(fields, req.renderOptions.filterValues),
      sortedBy: getSortedBy(fields, report.sortedBy),
      variant,
      status: 'expired',
      fields: variant.specification.fields,
      requestId: req.params.id,
      breadcrumbs: [{
        text: 'Home',
        href: '/'
      },
      {
        text: 'Main UI',
        href: '/main-ui'
      },
      {
        text: 'Version 10',
        href: '/main-ui/v10/'
      }]
    })
  }
])

router.post('/requestReport/', (req, res) => {
  const data = JSON.parse(req.body.data)
  const { variantId, variantName, query, filters, sortedBy } = data
  const requestId = uuidv4()
  const card = reports.find((r) => r.id === variantId)
  const requestData = {
    variantId,
    variantName,
    requestId,
    ...card,
    href: `requested/${requestId}`,
    status: 'requested',
    query,
    filters,
    sortedBy,
    timestamp: Date.now(),
    requestedDate: new Date().toLocaleString()
  }
  requested.unshift(requestData)
  res.end(JSON.stringify({ requestId }));
})

const updateRequest = (data) => {
  const { status, requestId } = data
  const index = requested.findIndex((r) => r.requestId === requestId)
  requested[index].status = status
  if (status === 'ready') {
    requested[index].href = `requested/${requestId}/report`
  }
}

router.post('/updateRequest/', (req, res) => {
  const data = JSON.parse(req.body.data)
  updateRequest(data)
  res.end();
})

const cancelRequest = (data) => {
  const { requestId } = data
  const index = requested.findIndex((r) => r.requestId === requestId)
  const item = requested[index]
  requested.splice(index, 1)
  return item
}

router.post('/cancelRequest/', (req, res) => {
  const data = JSON.parse(req.body.data)
  cancelRequest(data)
  res.end()
})

router.post('/addToRecentlyViewed/', (req, res) => {
  const data = JSON.parse(req.body.data)
  const item = cancelRequest(data)
  item.status = data.status
  item.timestamp = data.timestamp
  item.viewedDate = data.viewedDate
  recentlyViewed.unshift(item)
  res.end()
})

const updateRecentlyViewed = (data) => {
  const { status, requestId, href, timestamp, viewedDate, sort, query, columnsQuery } = data
  const index = recentlyViewed.findIndex((r) => r.requestId === requestId)
  if (status) recentlyViewed[index].status = status
  if (href) recentlyViewed[index].href = href
  if (timestamp) recentlyViewed[index].timestamp = timestamp
  if (viewedDate) recentlyViewed[index].viewedDate = viewedDate
  if (query) recentlyViewed[index].query = query
  if (columnsQuery) recentlyViewed[index].columnsQuery = columnsQuery
  if (sort && timestamp) {
    recentlyViewed.sort((a, b) => b.timestamp - a.timestamp)
  }
}

router.post('/updateRecentlyViewed/', (req, res) => {
  const data = JSON.parse(req.body.data)
  updateRecentlyViewed(data)
  res.end();
})

const removeFromRecent = (data) => {
  const { requestId } = data
  const index = recentlyViewed.findIndex((r) => r.requestId === requestId)
  const item = recentlyViewed[index]
  recentlyViewed.splice(index, 1)
  return item
}

router.post('/removeFromRecent/', (req, res) => {
  const data = JSON.parse(req.body.data)
  removeFromRecent(data)
  res.end()
})

router.get('/requested/:requestId', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  (req, res) => {
    const requestId = req.params.requestId
    const requestData = requested.find((r) => r.requestId === requestId)
    res.render(`main-ui/${version}/views/list-polling`, {
      ...req.renderOptions,
      reportName: "External Movements",
      requestData,
      filters: requestData.filters,
      sortedBy: requestData.sortedBy,
      breadcrumbs: [{
        text: 'Home',
        href: '/'
      },
      {
        text: 'Main UI',
        href: '/main-ui'
      },
      {
        text: 'Version 10',
        href: '/main-ui/v10/'
      }]
    })
  }
])

router.get('/requested/:requestId/report', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  (req, res, next) => {
    const requestId = req.params.requestId
    const requestData = recentlyViewed.find((r) => r.requestId === requestId)
    const columnsQuery = requestData.columnsQuery
    req.query = Object.fromEntries(new URLSearchParams(requestData.query.replace(/&amp;/g, "&")))
    if (columnsQuery) {
      let cols = columnsQuery.replaceAll('&columns=', ' ').trimStart()
      req.query.columns = cols.split(' ')
    }

    req.dataTableLayoutOptions = {
      dataFormat: dataFormats.externalMovements,
      title: 'External movements',
      listData: reportingService.listExternalMovements,
      countData: reportingService.countExternalMovements,
      version,
      requestData
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
      href: '/main-ui/v10/'
    }]
    next()
  },
  ...filterTableLayoutHandlers
])


router.get('/routes', (req, res) => {
  res.status(200).send(listEndpoints(router))
})

module.exports = router
