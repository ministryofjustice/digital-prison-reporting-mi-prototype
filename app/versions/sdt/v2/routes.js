const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')
const mockMetricData = require('./../../../mockMetricData')

const version = 'v2'

// Safety Diagnostic Tool
router.get('', [
  handlers.configureCurrentUrl,
  function (req, res, next) {
    const category = req.params.category
    req.renderOptions = {
      category,
      data: insights
    }
    next()
  },
  function (req, res) {
    res.render(`sdt/${version}/home`, {
      ...req.renderOptions
    })
  }
])

const categoryRouteMap = [
  { key: 'prisoners', path: 'prisoners' },
  { key: 'incidents', path: 'incidents' },
  { key: 'self-harm', path: 'self-harm' },
  { key: 'assaults', path: 'assaults' },
  { key: 'use-of-force', path: 'use-of-force' }
]

const metricRouteMap = [
  { key: 'assaults', path: 'assaults' }
]

router.get('/category/:category', [
  handlers.configureCurrentUrl,
  function (req, res, next) {
    const category = req.params.category
    req.renderOptions = {
      category,
      data: mockMetricData.filter(c => c.type === category)
    }
    next()
  },
  function (req, res) {
    const category = req.renderOptions.category
    const path = categoryRouteMap.find((item) => item.key === category).path || 'assaults'
    res.render(`sdt/${version}/category/${path}/home`, {
      ...req.renderOptions
    })
  }
])

router.get('/category/:category/breakdown/:metric', [
  handlers.configureCurrentUrl,
  function (req, res, next) {
    const metric = req.params.metric
    const category = req.params.category
    req.renderOptions = {
      metric,
      category
    }
    next()
  },
  function (req, res) {
    const metric = req.renderOptions.metric
    const metricPath = metricRouteMap.find((item) => item.key === metric).path || 'assaults'
    const category = req.renderOptions.category
    const categoryPath = categoryRouteMap.find((item) => item.key === category).path || 'assaults'

    res.render(`sdt/${version}/category/${categoryPath}/breakdown/${metricPath}`, {
      ...req.renderOptions
    })
  }
])

const insights = []

router.post('/addInsight/', (req, res) => {
  const body = JSON.parse(req.body.body)
  const index = insights.find((insight) => insight.id === body.id)
  if (!index) {
    insights.push(body)
  }
  res.redirect(`sdt/${version}/category/assaults`)
})

router.post('/removeInsight/', (req, res) => {
  const body = JSON.parse(req.body.body)
  const index = insights.find((insight) => insight.id === body.id)
  insights.splice(index, 1)
  res.redirect(`sdt/${version}/category/assaults`)
})

module.exports = router
