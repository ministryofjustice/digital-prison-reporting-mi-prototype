const express = require('express')
const router = express.Router()

const reportingService = require('./services/reportingService')
const dataFormats = require('./reportDataFormats')
const { getHeaders, mapData } = require('./components/data-table/utils')
const { getFilters } = require('./components/filters/utils')
const { configureDataTableOptions, queryParameterPrefix: dataTableQueryParameterPrefix } = require('./components/data-table/handlers')
const { configureFilterOptions, queryParameterPrefix: filtersQueryParameterPrefix } = require('./components/filters/handlers')
const { getCreateUrlForParametersFunction } = require('./utils/urlHelper')

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

router.get('/reports/person-register', [configureCurrentUrl, configureDataTableOptions, configureFilterOptions, function (req, res) {
  const personRegisterData = reportingService.listPersonRegister({
    ...req.renderOptions.dataTable,
    sortColumnName: dataFormats.personRegister[req.renderOptions.dataTable.sortColumn].name,
    filters: req.renderOptions.filterValues,
    dataFormat: dataFormats.personRegister
  })

  res.render('reports-people-person-register', {
    ...req.renderOptions,
    head: getHeaders(dataFormats.personRegister),
    rows: mapData(personRegisterData, dataFormats.personRegister),
    filters: getFilters(dataFormats.personRegister, req.renderOptions.filterValues),
    totalRowCount: reportingService.countPersonRegister(req.renderOptions.filterValues, dataFormats.personRegister),
    createUrlForParametersPaging: getCreateUrlForParametersFunction(req.query, dataTableQueryParameterPrefix),
    createUrlForParametersFilters: getCreateUrlForParametersFunction(req.query, filtersQueryParameterPrefix)
  })
}])

// router.get('/reports/prisoner-movements', [
//   configureCurrentUrl,
//   (req, res, next) => {
//     // Set data format and data source (maybe separate format no longer needed)
//     next()
//   },
//   ...filterTableLayoutHandlers
// ])

router.get('/reports/prisoner-movements', [
  configureCurrentUrl,
  configureDataTableOptions,
  configureFilterOptions,
  function (req, res) {
    const externalMovementsData = reportingService.listExternalMovements({
      ...req.renderOptions.dataTable,
      sortColumnName: dataFormats.externalMovements[req.renderOptions.dataTable.sortColumn].name,
      filters: req.renderOptions.filterValues,
      dataFormat: dataFormats.externalMovements
    })

    res.render('reports-people-prisoner-movements', {
      ...req.renderOptions,
      head: getHeaders(dataFormats.externalMovements),
      rows: mapData(externalMovementsData, dataFormats.externalMovements),
      filters: getFilters(dataFormats.externalMovements, req.renderOptions.filterValues),
      totalRowCount: reportingService.countExternalMovements(req.renderOptions.filterValues, dataFormats.externalMovements),
      createUrlForParametersPaging: getCreateUrlForParametersFunction(req.query, dataTableQueryParameterPrefix),
      createUrlForParametersFilters: getCreateUrlForParametersFunction(req.query, filtersQueryParameterPrefix)
    })
  }
])

router.get('/reports/locations/summary', [configureCurrentUrl, configureDataTableOptions, function (req, res) {
  res.render('reports-locations-summary', req.renderOptions)
}])

module.exports = router
