const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')
const definitions = require('../../../data/listDefinitions')
const reportMockData = require('../../../data/legacyReportData/leagacyNomisReportsData')
const { baseBreadCrumbs, createRows, createHead } = require('./utils')

const { getTagsFromReq, getTagBreadcrumbs, addTagsToDefinition, filterRowsByTags } = require('./services/tagService')
const { addBookmark, removeBookmark, bumpBookmark, isBookmarked, resetBookmarkList, getBookmarkPageData } = require('./services/bookmarkService')
const { addToRecentlyViewed, resetRecentlyViewedList, getRecentlyViewedPageData } = require('./services/recentlyViewedService')
const { getRelatedItems } = require('./services/relatedItemsService')

const version = 'v6'
const enhancedDefinitions = addTagsToDefinition(definitions)

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  const bookmarks = getBookmarkPageData(enhancedDefinitions, req, createRows, createHead, 6)
  const recentlyViewed = getRecentlyViewedPageData(enhancedDefinitions, req, createRows, createHead, 6)

  res.render(`operational-reporting/${version}/views/home`,
    {
      ...req.renderOptions,
      bookmarks,
      recentlyViewed,
      breadcrumbs: [
        ...baseBreadCrumbs
      ]
    })
}])

router.get('/my-reports/:type/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  const type = req.params.type
  let listingData
  switch (type) {
    case 'bookmarks':
      listingData = getBookmarkPageData(enhancedDefinitions, req, createRows, createHead, 100)
      break
    case 'recently-viewed':
      listingData = getRecentlyViewedPageData(enhancedDefinitions, req, createRows, createHead, 15)
      break
    default:
      listingData = getBookmarkPageData(enhancedDefinitions, req, createRows, createHead, 100)
      break
  }

  res.render(`operational-reporting/${version}/views/my-reports`,
    {
      ...req.renderOptions,
      listingData,
      breadcrumbs: [
        ...baseBreadCrumbs,
        { text: 'Home', href: '/operational-reporting/v6/' }
      ]
    })
}])

const reportPaths = [
  '/my-reports/:type/report/:id',
  '/report/:id',
  '/my-reports/report/:id',
  '/catalogue/report/:id',
  '/catalogue/:tag1/report/:id',
  '/catalogue/:tag1/:tag2/report/:id',
  '/catalogue/:tag1/:tag2/:tag3/report/:id',
  '/catalogue/:tag1/:tag2/:tag3/:tag4/report/:id',
  '/catalogue/:tag1/:tag2/:tag3/:tag4/:tag5/report/:id'
]

router.get(reportPaths, [handlers.configureNavigation, function (req, res) {
  const reportId = req.params.id
  const reportData = enhancedDefinitions.find((def) => def.id === req.params.id)
  const tags = getTagsFromReq(req.params, true)
  const tagBreadcrumbs = getTagBreadcrumbs(tags, true)
  const crumbs = tagBreadcrumbs.length ? tagBreadcrumbs : [{ text: 'Catalogue', href: '/operational-reporting/v6/catalogue/' }]
  let mockData = reportMockData.find(item => item.id === reportId)
  if (!mockData) mockData = reportMockData[0]
  res.render(`operational-reporting/${version}/views/report`,
    {
      ...req.renderOptions,
      tags,
      reportData,
      mockData,
      bookmarked: isBookmarked(reportId),
      relatedItems: [...getRelatedItems(reportData, enhancedDefinitions)],
      breadcrumbs: [
        ...baseBreadCrumbs,
        { text: 'Home', href: '/operational-reporting/v6/' },
        ...crumbs
      ]
    })
}])

const cataloguePath = [
  '/catalogue',
  '/catalogue/:tag1',
  '/catalogue/:tag1/:tag2',
  '/catalogue/:tag1/:tag2/:tag3',
  '/catalogue/:tag1/:tag2/:tag3/:tag4',
  '/catalogue/:tag1/:tag2/:tag3/:tag4/:tag5'
]

router.get(cataloguePath, [handlers.configureNavigation, function (req, res) {
  const selectedTags = getTagsFromReq(req.params)
  const filteredByTags = filterRowsByTags(selectedTags, enhancedDefinitions)
  const rows = createRows(filteredByTags, req)
  const head = createHead(rows)

  res.render(`operational-reporting/${version}/views/catalogue`,
    {
      ...req.renderOptions,
      selectedTags,
      head,
      rows,
      definitions: filteredByTags,
      breadcrumbs: [
        ...baseBreadCrumbs,
        { text: 'Home', href: '/operational-reporting/v6/' },
        ...getTagBreadcrumbs(selectedTags)
      ]
    })
}])

router.get(['/contact-us', '/getting-started'], [handlers.configureNavigation, function (req, res) {
  let title, content
  let gettingStarted = false
  switch (req.url) {
    case '/contact-us/':
      title = 'Contact Us'
      content = 'Information about how to contact us with questions will be available on this page'
      break
    case '/getting-started/':
      title = 'Getting started'
      gettingStarted = true
      content = 'Information about how to get started and tutorials about how to use the service will be available on this page'
      break
    default:
      title = 'Generic title'
      content = 'Information about page'
      break
  }

  res.render(`operational-reporting/${version}/views/generic`,
    {
      ...req.renderOptions,
      title,
      content,
      gettingStarted,
      breadcrumbs: [
        ...baseBreadCrumbs,
        { text: 'Home', href: '/operational-reporting/v6/' }
      ]
    })
}])

// Bookmarking

router.post('/addBookmark/', (req, res) => {
  const data = JSON.parse(req.body.data)
  addBookmark(data)
  res.end()
})

router.post('/removeBookmark/', (req, res) => {
  const data = JSON.parse(req.body.data)
  removeBookmark(data)
  res.end()
})

router.post('/bumpBookmark/', (req, res) => {
  const data = JSON.parse(req.body.data)
  bumpBookmark(data)
  res.end()
})

// RecentlyViewed

router.post('/addToRecentlyViewed/', (req, res) => {
  const data = JSON.parse(req.body.data)
  data.timestamp = new Date().toLocaleString()
  addToRecentlyViewed(data)
  res.end()
})

// Reset lists

router.post('/resetLists/', (req, res) => {
  resetBookmarkList()
  resetRecentlyViewedList()
  res.end()
})

module.exports = router
