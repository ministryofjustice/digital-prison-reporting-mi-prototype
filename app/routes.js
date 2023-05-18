const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', { currentUrl: req.originalUrl })
})

router.get('/reports-:type/', [configureReportsOptions, function (req, res) {
  res.render(`reports-${req.params.type}-home`, req.renderOptions)
}])

router.get('/reports-:type/people/person-register', [configureReportsOptions, function (req, res) {
  res.render('reports-people-person-register', req.renderOptions)
}])

router.get('/reports-:type/people/prisoner-movements', [configureReportsOptions, function (req, res) {
  res.render('reports-people-prisoner-movements', req.renderOptions)
}])

router.get('/reports-:type/locations/summary', [configureReportsOptions, function (req, res) {
  res.render('reports-locations-summary', req.renderOptions)
}])

function configureReportsOptions (req, res, next) {
  req.renderOptions = {
    currentUrl: req.originalUrl,
    type: cleanseType(req.params.type, res),
  }
  next()
}

function cleanseType (type, res) {
  switch (type) {
    case 'a':
    case 'b':
      return type
  }
  res.status(404).send('Page not found')
}

module.exports = router
