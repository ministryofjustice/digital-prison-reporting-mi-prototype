const express = require('express')
const router = express.Router()

const chartCardDataConfig = require('./chartCardDataConfig')
const insightCardDataConfig = require('./insightCardDataConfig')
const mockMetricData = require('./views/safetyDiagnosticTool/mockMetricData')
const handlers = require('./utils/handlers')

router.get('/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('cards', {
    ...req.renderOptions,
    title: 'Home',
    cards: req.renderOptions.navigationOptions
  })
}])

// Safety Diagnostic Tool
router.get('/safety-diagnostic-tool/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('safetyDiagnosticTool/sdt-home', req.renderOptions)
}])

router.get('/safety-diagnostic-tool/v1', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('safetyDiagnosticTool/versions/v1/home', req.renderOptions)
}])

const insights = []

router.post('/safety-diagnostic-tool/v2/addInsight/', (req, res) => {
  const body = JSON.parse(req.body.body)
  const index = insights.find((insight) => insight.id === body.id)
  if (!index) {
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
  handlers.configureCurrentUrl,
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
  handlers.configureCurrentUrl,
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
  handlers.configureCurrentUrl,
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
router.get('/charts/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('charts/charts-home', req.renderOptions)
}])

router.get('/charts/:chartType', [
  handlers.configureCurrentUrl,
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
router.get('/insights/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('insights/insight-home', req.renderOptions)
}])

router.get('/insights/:insightType', [
  handlers.configureCurrentUrl,
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
