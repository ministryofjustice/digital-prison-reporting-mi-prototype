const express = require('express')
const router = express.Router()

const reportingService = require('./services/reportingService')
const dataFormats = require('./reportDataFormats')
const { filterTableLayoutHandlers } = require('./components/data-table-layout/handlers')
const { configureFilterOptions, queryParameterPrefix } = require('./components/filters/handlers')
const { getFilters } = require('./components/filters/utils')
const { getCreateUrlForParametersFunction } = require('./utils/urlHelper')

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

const renderReport = (req, res) => {
  const {
    dataFormat,
    template,
    reportData
  } = req.reportOptions

  const groupField = req.renderOptions.groupField

  const data = reportData({
    filters: req.renderOptions.filterValues,
    dataFormat,
    groupFieldName: groupField.name
  })

  const rows = Object.keys(data).map(d => [
    { text: d },
    { text: data[d] }
  ])

  res.render(template, {
    ...req.renderOptions,
    head: groupField.header,
    rows,
    chart: {
      labels: Object.keys(data),
      data: Object.values(data)
    },
    filters: getFilters(dataFormat, req.renderOptions.filterValues),
    createUrlForParametersFilters: getCreateUrlForParametersFunction(req.query, queryParameterPrefix)
  })
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
      template: 'lists-people-person-register',
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
      template: 'lists-people-external-movements',
      listData: reportingService.listExternalMovements,
      countData: reportingService.countExternalMovements
    }
    next()
  },
  ...filterTableLayoutHandlers
])

router.get('/lists/locations/summary', [configureCurrentUrl, function (req, res) {
  res.render('lists-locations-summary', req.renderOptions)
}])

router.get('/reports/', [configureCurrentUrl, function (req, res) {
  res.render('reports-home', req.renderOptions)
}])

router.get('/reports/external-movements-by-:groupField', [
  configureCurrentUrl,
  (req, res, next) => {
    const groupField = getFieldByName(req.params.groupField, dataFormats.externalMovements)

    req.reportOptions = {
      dataFormat: dataFormats.externalMovements,
      template: 'reports-people-external-movements-by',
      reportData: reportingService.reportExternalMovements,
      countData: reportingService.countExternalMovements
    }
    req.renderOptions = {
      ...req.renderOptions,
      groupField
    }
    next()
  },
  configureFilterOptions,
  renderReport
])

module.exports = router
