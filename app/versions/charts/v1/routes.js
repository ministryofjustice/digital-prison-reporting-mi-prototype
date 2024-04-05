const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')
const chartCardDataConfig = require('./../../../data/chartCardDataConfig')

const version = 'v1'

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`charts/${version}/views/home`, req.renderOptions)
}])

router.get('/type/:chartType', [
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
    res.render(`charts/${version}/views/chart`, {
      ...req.renderOptions
    })
  }
])

module.exports = router
