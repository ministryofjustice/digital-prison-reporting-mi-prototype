import reportingService from 'services/reportingService'

const express = require('express')
const router = express.Router()

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
    personRegisterData
  })
}])

router.get('/reports/people/prisoner-movements', [configureReportsOptions, function (req, res) {
  res.render('reports-people-prisoner-movements', req.renderOptions)
}])

router.get('/reports/locations/summary', [configureReportsOptions, function (req, res) {
  res.render('reports-locations-summary', req.renderOptions)
}])

function configureReportsOptions (req, res, next) {
  req.renderOptions = {
    currentUrl: req.originalUrl
  }
  next()
}

module.exports = router
