const express = require('express')
const router = express.Router()

const reportingService = require('./services/reportingService')
const dataTableUtils = require('./components/data-table/utils')
const dataFormats = require('./reportDataFormats')

const configureReportsOptions = (req, res, next) => {
  console.log(req)
  const query = req.query ? req.query : {}
  const {
    selectedPage = 1,
    pageSize = 20,
    sortColumn = 0,
    sortedAsc = true
  } = query

  req.renderOptions = {
    currentUrl: req.route.path,
    dataTable: {
      selectedPage,
      pageSize,
      sortColumn,
      sortedAsc
    }
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
  console.log(req.renderOptions)
  const personRegisterData = reportingService.listPersonRegister({
    ...req.renderOptions.dataTable,
    sortColumnName: dataFormats.personRegister[req.renderOptions.dataTable.sortColumn].name
  })

  res.render('reports-people-person-register', {
    ...req.renderOptions,
    head: dataTableUtils.getHeaders(dataFormats.personRegister),
    rows: dataTableUtils.mapData(personRegisterData, dataFormats.personRegister),
    totalRowCount: reportingService.countPersonRegister()
  })
}])

router.get('/reports/people/prisoner-movements', [configureReportsOptions, function (req, res) {
  res.render('reports-people-prisoner-movements', req.renderOptions)
}])

router.get('/reports/locations/summary', [configureReportsOptions, function (req, res) {
  res.render('reports-locations-summary', req.renderOptions)
}])

module.exports = router
