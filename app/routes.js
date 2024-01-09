const express = require('express')
const router = express.Router()

const reportingService = require('./services/reportingService')
const dataFormats = require('./reportDataFormats')
const { filterTableLayoutHandlers } = require('./components/data-table-layout/handlers')
const { configureFilterOptions } = require('./components/filters/handlers')
const { renderVisualisation } = require('./visualisationHandlers')
const chartCardDataConfig = require('./chartCardDataConfig')
const insightCardDataConfig = require('./insightCardDataConfig')
const mockMetricData = require('./views/safetyDiagnosticTool/mockMetricData')

const configureCurrentUrl = (req, res, next) => {
  req.renderOptions = {
    ...req.renderOptions,
    currentUrl: req.route.path
  }
  next()
}

const getFieldByName = (name, format) => {
  const field = format.find(f => f.name === name)

  return field || {}
}

router.get('/', [configureCurrentUrl, function (req, res) {
  res.render('index', req.renderOptions)
}])

router.get('/lists/', [configureCurrentUrl, function (req, res) {
  res.render('lists-home', req.renderOptions)
}])

router.get('/lists/external-movements', [
  configureCurrentUrl,
  (req, res, next) => {
    req.dataTableLayoutOptions = {
      dataFormat: dataFormats.externalMovements,
      title: 'External movements',
      listData: reportingService.listExternalMovements,
      countData: reportingService.countExternalMovements
    }
    next()
  },
  ...filterTableLayoutHandlers
])

router.get('/visualisations/', [configureCurrentUrl, function (req, res) {
  res.render('visualisations-home', req.renderOptions)
}])

router.get('/visualisations/external-movements-by-:groupField-:chartType', [
  configureCurrentUrl,
  (req, res, next) => {
    const groupField = getFieldByName(req.params.groupField, dataFormats.externalMovements)
    const chartType = req.params.chartType

    req.reportOptions = {
      dataFormat: dataFormats.externalMovements,
      reportData: reportingService.reportExternalMovements,
      countData: reportingService.countExternalMovements,
      groupField,
      chartType
    }
    req.renderOptions = {
      ...req.renderOptions,
      title: 'External movements'
    }
    next()
  },
  configureFilterOptions,
  renderVisualisation
])
/**
 * Safety Diagnostic Tool
 */

router.get('/safety-diagnostic-tool/', [configureCurrentUrl, function (req, res) {
  res.render('safetyDiagnosticTool/sdt-home', req.renderOptions)
}])

router.get('/safety-diagnostic-tool/v1', [configureCurrentUrl, function (req, res) {
  res.render('safetyDiagnosticTool/versions/v1/home', req.renderOptions)
}])

const insights = []

router.post('/safety-diagnostic-tool/v2/addInsight/', (req, res) => {
  const body = JSON.parse(req.body.body)
  const index = insights.find((insight) => insight.id === body.id)
  if ( !index ) {
    insights.push(body)
  }
  res.redirect('/safety-diagnostic-tool/v2/category/assaults')
})

router.post('/safety-diagnostic-tool/v2/removeInsight/', (req, res) => {
  const body = JSON.parse(req.body.body)
  const index = insights.find((insight) => insight.id === body.id)
  insights.splice(index, 1)
  res.redirect('/safety-diagnostic-tool/v2/category/assaults')
})

router.get('/safety-diagnostic-tool/v2', [
  configureCurrentUrl,
  function (req, res, next) {
    const category = req.params.category
    req.renderOptions = {
      category,
      data: insights
    }
    next()
  },
  function (req, res) {
    res.render('safetyDiagnosticTool/versions/v2/home', {
      ...req.renderOptions
    })
  }
])

const categoryRouteMap = [
  { key: 'prisoners', path: 'prisoners' },
  { key: 'incidents', path: 'incidents' },
  { key: 'self-harm', path: 'self-harm' },
  { key: 'assaults', path: 'assaults' },
  { key: 'use-of-force', path: 'use-of-force' }
]

const metricRouteMap = [
  { key: 'assaults', path: 'assaults' }
]

router.get('/safety-diagnostic-tool/v2/category/:category', [
  configureCurrentUrl,
  function (req, res, next) {
    const category = req.params.category
    req.renderOptions = {
      category,
      data: mockMetricData.filter(c => c.type === category)
    }
    next()
  },
  function (req, res) {
    const category = req.renderOptions.category
    const path = categoryRouteMap.find((item) => item.key === category).path || 'assaults'
    res.render(`safetyDiagnosticTool/versions/v2/category/${path}/home`, {
      ...req.renderOptions
    })
  }
])

router.get('/safety-diagnostic-tool/v2/category/:category/breakdown/:metric', [
  configureCurrentUrl,
  function (req, res, next) {
    const metric = req.params.metric
    const category = req.params.category
    req.renderOptions = {
      metric,
      category
    }
    next()
  },
  function (req, res) {
    const metric = req.renderOptions.metric
    const metricPath = metricRouteMap.find((item) => item.key === metric).path || 'assaults'
    const category = req.renderOptions.category
    const categoryPath = categoryRouteMap.find((item) => item.key === category).path || 'assaults'

    res.render(`safetyDiagnosticTool/versions/v2/category/${categoryPath}/breakdown/${metricPath}`, {
      ...req.renderOptions
    })
  }
])

// Charts
router.get('/charts/', [configureCurrentUrl, function (req, res) {
  res.render('charts/charts-home', req.renderOptions)
}])

router.get('/charts/:chartType', [
  configureCurrentUrl,
  function (req, res, next) {
    const chartType = req.params.chartType
    req.renderOptions = {
      chartType,
      chartData: chartCardDataConfig.filter(c => c.chart[0].type === chartType)
    }
    next()
  },
  function (req, res) {
    res.render('charts/chart', {
      ...req.renderOptions
    })
  }
])

// Insights
router.get('/insights/', [configureCurrentUrl, function (req, res) {
  res.render('insights/insight-home', req.renderOptions)
}])

router.get('/insights/:insightType', [
  configureCurrentUrl,
  function (req, res, next) {
    const insightType = req.params.insightType
    req.renderOptions = {
      insightType,
      insightsData: insightCardDataConfig
    }
    next()
  },
  function (req, res) {
    res.render('insights/insight', {
      ...req.renderOptions
    })
  }
])

module.exports = router
