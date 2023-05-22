const express = require('express')
const router = express.Router()

const reportingService = require('./services/reportingService')
const dataFormats = require('./reportDataFormats')
const { getHeaders, mapData } = require('./components/data-table/utils')
const { configureDataTableOptions } = require('./components/data-table/handlers')

const configureCurrentUrl = (req, res, next) => {
  req.renderOptions = {
    ...req.renderOptions,
    currentUrl: req.route.path
  }
  next()
}

router.get('/', [configureCurrentUrl, function (req, res) {
  res.render('index', req.renderOptions)
}])

router.get('/reports/', [configureCurrentUrl, configureDataTableOptions, function (req, res) {
  res.render('reports-home', req.renderOptions)
}])

router.get('/reports/person-register', [configureCurrentUrl, configureDataTableOptions, function (req, res) {
  const personRegisterData = reportingService.listPersonRegister({
    ...req.renderOptions.dataTable,
    sortColumnName: dataFormats.personRegister[req.renderOptions.dataTable.sortColumn].name
  })

  res.render('reports-people-person-register', {
    ...req.renderOptions,
    head: getHeaders(dataFormats.personRegister),
    rows: mapData(personRegisterData, dataFormats.personRegister),
    totalRowCount: reportingService.countPersonRegister()
  })
}])

router.get('/reports/people/prisoner-movements', [configureCurrentUrl, configureDataTableOptions, function (req, res) {
  const externalMovementsData = reportingService.listExternalMovements({
    ...req.renderOptions.dataTable,
    sortColumnName: dataFormats.externalMovements[req.renderOptions.dataTable.sortColumn].name
  })

  res.render('reports-people-prisoner-movements', {
    ...req.renderOptions,
    head: getHeaders(dataFormats.externalMovements),
    rows: mapData(externalMovementsData, dataFormats.externalMovements),
    totalRowCount: reportingService.countPersonRegister()
  })
}])

router.get('/reports/locations/summary', [configureCurrentUrl, configureDataTableOptions, function (req, res) {
  res.render('reports-locations-summary', req.renderOptions)
}])

module.exports = router
