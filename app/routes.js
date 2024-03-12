const express = require('express')
const router = express.Router()

const chartCardDataConfig = require('./data/chartCardDataConfig')
const insightCardDataConfig = require('./data/insightCardDataConfig')
const handlers = require('./utils/handlers')
const listEndpoints = require('express-list-endpoints')

router.get('/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('cards', {
    ...req.renderOptions,
    title: 'Home',
    cards: req.renderOptions.navigationOptions
  })
}])

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
