const express = require('express')
const router = express.Router()

const reportingService = require('./services/reportingService')
const dataFormats = require('./reportDataFormats')
const { filterTableLayoutHandlers } = require('./components/data-table-layout/handlers')
const { configureFilterOptions } = require('./components/filters/handlers')
const { renderVisualisation } = require('./visualisationHandlers')
const chartCardDataConfig = require('./chartCardDataConfig')
const insightCardDataConfig = require('./insightCardDataConfig')

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

// Safety Diagnostic Tool
router.get('/safety-diagnostic-tool/', [configureCurrentUrl, function (req, res) {
  res.render('safetyDiagnosticTool/sdt-home', req.renderOptions)
}])

router.get('/safety-diagnostic-tool/v1', [configureCurrentUrl, function (req, res) {
  res.render('safetyDiagnosticTool/versions/v1/home', req.renderOptions)
}])

router.get('/safety-diagnostic-tool/v2', [configureCurrentUrl, function (req, res) {
  res.render('safetyDiagnosticTool/versions/v2/home', req.renderOptions)
}])

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
      chartData: chartCardDataConfig.filter(c => c.chart.type === chartType)
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
