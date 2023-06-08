const express = require('express')
const router = express.Router()

const reportingService = require('./services/reportingService')
const dataFormats = require('./reportDataFormats')
const { filterTableLayoutHandlers } = require('./components/data-table-layout/handlers')

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

router.get('/reports/', [configureCurrentUrl, function (req, res) {
  res.render('reports-home', req.renderOptions)
}])

router.get('/reports/person-register', [
  configureCurrentUrl,
  (req, res, next) => {
    req.dataTableLayoutOptions = {
      dataFormat: dataFormats.personRegister,
      template: 'reports-people-person-register',
      listData: reportingService.listPersonRegister,
      countData: reportingService.countPersonRegister
    }
    next()
  },
  ...filterTableLayoutHandlers
])

router.get('/reports/prisoner-movements', [
  configureCurrentUrl,
  (req, res, next) => {
    req.dataTableLayoutOptions = {
      dataFormat: dataFormats.externalMovements,
      template: 'reports-people-prisoner-movements',
      listData: reportingService.listExternalMovements,
      countData: reportingService.countExternalMovements
    }
    next()
  },
  ...filterTableLayoutHandlers
])

router.get('/reports/locations/summary', [configureCurrentUrl, function (req, res) {
  res.render('reports-locations-summary', req.renderOptions)
}])

module.exports = router
