const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')
const data = require('./data/data')

const version = 'v1'
const cats = data.metrics.map(item => JSON.stringify(item.category))
const categoriesSet = [...new Set(cats)]
const categories = Array.from(categoriesSet).map((c) => JSON.parse(c))
const bookmarks = []

router.post('/addBookmark/', (req, res) => {
  const metricData = JSON.parse(req.body.metricData)
  const index = bookmarks.find((m) => m.id === metricData.id)
  if (!index) {
    bookmarks.push(metricData)
  }
})

router.post('/removeBookmark/', (req, res) => {
  const metricData = JSON.parse(req.body.metricData)
  const index = bookmarks.find((m) => m.id === metricData.id)
  bookmarks.splice(index, 1)
})

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`mis/${version}/views/home`,
    {
      ...req.renderOptions,
      data: bookmarks,
      categories
    })
}])

router.get('/category/:category/metrics', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  function (req, res) {
    const category = req.params.category
    const displayCategory = categories.find((c) => c.id === category).displayName
    const augmentedData = data.metrics.filter((m) => m.category.id === category)
      .map((m) => {
        let bookmarked = false
        if (bookmarks.find((b) => b.id === m.id)) bookmarked = true
        return {
          ...m,
          bookmarked
        }
      })
    res.render(`mis/${version}/views/metrics-dashboard`,
      {
        ...req.renderOptions,
        data: augmentedData,
        categories,
        bookmarks,
        title: displayCategory,
        category
      }
    )
  }])

router.get('/metric/:id/dashboard', [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  function (req, res) {
    const metricId = req.params.id
    res.render(`mis/${version}/views/canonical-dashboard`,
      {
        ...req.renderOptions,
        data: data.metrics.find((m) => m.id === metricId),
        categories
      }
    )
  }])

module.exports = router
