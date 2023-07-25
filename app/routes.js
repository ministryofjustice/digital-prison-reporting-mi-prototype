const express = require('express')
const router = express.Router()

const reportingService = require('./services/reportingService')
const dataFormats = require('./reportDataFormats')
const { filterTableLayoutHandlers } = require('./components/data-table-layout/handlers')
const { configureFilterOptions } = require('./components/filters/handlers')
const { renderReport } = require('./reportHandlers')

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

router.get('/lists/person-register', [
  configureCurrentUrl,
  (req, res, next) => {
    req.dataTableLayoutOptions = {
      dataFormat: dataFormats.personRegister,
      title: 'Person register',
      listData: reportingService.listPersonRegister,
      countData: reportingService.countPersonRegister
    }
    next()
  },
  ...filterTableLayoutHandlers
])

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

router.get('/reports/', [configureCurrentUrl, function (req, res) {
  res.render('reports-home', req.renderOptions)
}])

router.get('/reports/external-movements-by-:groupField-:chartType', [
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
  renderReport
])

module.exports = router
