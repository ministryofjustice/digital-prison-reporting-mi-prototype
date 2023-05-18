const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', { currentUrl: req.originalUrl })
})

router.get('/reports-:type/', [configureReportsOptions, function (req, res) {
  res.render(`reports-${req.params.type}-home`, req.renderOptions)
}])

router.get('/reports-:type/:section/:report', [configureReportsOptions, function (req, res) {
  res.render(`reports-${req.params.section}-${req.params.report}`, { ...req.renderOptions, ...req.params })
}])

function configureReportsOptions (req, res, next) {
  req.renderOptions = {
    currentUrl: req.originalUrl,
    type: req.params.type
  }
  next()
}

module.exports = router
