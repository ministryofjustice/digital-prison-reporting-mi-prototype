const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')
const metricCardDataConfig = require('./../../../data/metricCardDataConfig')

const version = 'v1'

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`metrics/${version}/views/home`, req.renderOptions)
}])

router.get('/type/:metricType', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  function (req, res, next) {
    const metricType = req.params.metricType
    req.renderOptions = {
      metricType,
      metricsData: metricCardDataConfig
    }
    next()
  },
  function (req, res) {
    res.render(`metrics/${version}/views/metrics`, {
      ...req.renderOptions,
      navigationOptions: req.renderOptions.navigationOptions
    })
  }
])

module.exports = router
