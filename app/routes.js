const reportingService = require('./services/reportingService')

const express = require('express')
const router = express.Router()

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
    head: getHeaders(personRegisterDataFormat),
    rows: mapData(personRegisterData, personRegisterDataFormat)
  })
}])

router.get('/reports/people/prisoner-movements', [configureReportsOptions, function (req, res) {
  res.render('reports-people-prisoner-movements', req.renderOptions)
}])

router.get('/reports/locations/summary', [configureReportsOptions, function (req, res) {
  res.render('reports-locations-summary', req.renderOptions)
}])

const personRegisterDataFormat = [
  { header: 'Book Number', data: d => d.bookNumber },
  { header: 'Agency Location Code', data: d => d.agencyLocationCode },
  { header: 'Prison Number', data: d => d.prisonNumber },
  { header: 'First Name', data: d => d.firstName },
  { header: 'Last Name', data: d => d.lastName },
  { header: 'Date Of Birth', data: d => mapDate(d.dateOfBirth), format: 'numeric' },
  { header: 'Establishment', data: d => d.establishment },
  { header: 'Cell', data: d => d.cell }
]

const getHeaders = format => (format.map(f => ({
  text: f.header,
  format: f.format
})))

const mapData = (data, format) => (data.map(d => (format.map(f => ({
  text: f.data(d),
  format: f.format
})))))

const mapDate = isoDate => isoDate

module.exports = router
