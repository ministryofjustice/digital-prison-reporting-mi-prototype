const express = require('express')
const router = express.Router()

const reportingService = require('./services/reportingService')
const dataTableUtils = require('./components/data-table/utils')
const dataFormats = require('./reportDataFormats')

const configureReportsOptions = (req, res, next) => {
  req.renderOptions = {
    currentUrl: req.originalUrl
  }
  next()
}

router.get('/', function (req, res) {
  res.render('index', { currentUrl: req.originalUrl })
})

router.get('/reports/', [configureReportsOptions, function (req, res) {
  res.render('reports-home', req.renderOptions)
}])

router.get('/reports/person-register', [configureReportsOptions, function (req, res) {
  const personRegisterData = reportingService.listPersonRegister()

  res.render('reports-people-person-register', {
    ...req.renderOptions,
    head: dataTableUtils.getHeaders(dataFormats.personRegister),
    rows: dataTableUtils.mapData(personRegisterData, dataFormats.personRegister)
  })
}])

router.get('/reports/people/prisoner-movements', [configureReportsOptions, function (req, res) {
  res.render('reports-people-prisoner-movements', req.renderOptions)
}])

router.get('/reports/locations/summary', [configureReportsOptions, function (req, res) {
  res.render('reports-locations-summary', req.renderOptions)
}])

module.exports = router
