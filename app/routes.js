const express = require('express')
const router = express.Router()

const chartCardDataConfig = require('./chartCardDataConfig')
const insightCardDataConfig = require('./insightCardDataConfig')
const handlers = require('./utils/handlers')
const listEndpoints = require('express-list-endpoints')

router.get('/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('cards', {
    ...req.renderOptions,
    title: 'Home',
    cards: req.renderOptions.navigationOptions
  })
}])

// Charts
router.get('/charts/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('charts/charts-home', req.renderOptions)
}])

router.get('/charts/:chartType', [
  handlers.configureCurrentUrl,
  function (req, res, next) {
    const chartType = req.params.chartType
    req.renderOptions = {
      chartType,
      chartData: chartCardDataConfig.filter(c => c.chart[0].type === chartType)
    }
    next()
  },
  function (req, res) {
    res.render('charts/chart', {
      ...req.renderOptions
    })
  }
])

// Insights
router.get('/insights/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('insights/insight-home', req.renderOptions)
}])

router.get('/insights/:insightType', [
  handlers.configureCurrentUrl,
  function (req, res, next) {
    const insightType = req.params.insightType
    req.renderOptions = {
      insightType,
      insightsData: insightCardDataConfig
    }
    next()
  },
  function (req, res) {
    res.render('insights/insight', {
      ...req.renderOptions
    })
  }
])

router.get('/routes', (req, res) => {
  res.status(200).send(listEndpoints(router))
})

module.exports = router
