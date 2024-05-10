const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')

const { getTagsFromReq, getTagBreadcrumbs } = require('./services/tagService')
const { addBookmark, removeBookmark, getBookmarkData, isBookmarked } = require('./services/bookmarkService')

const version = 'v6'
const baseBreadCrumbs = [
  { text: 'Digital Prison Services', href: 'https://dps-dev.prison.service.justice.gov.uk/' },
  { text: 'Prototype', href: '/' },
  { text: 'Operational Reporting', href: '/operational-reporting/' }
]

const mockReportData = [
  {
    id: '1',
    text: 'mock-report-data-1',
  },
  {
    id: '2',
    text: 'mock-report-data-2',
  },
  {
    id: '3',
    text: 'mock-report-data-3',
  }
]


router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`operational-reporting/${version}/views/home`,
    {
      ...req.renderOptions,
      bookmarks: getBookmarkData(mockReportData),
      breadcrumbs: [
        ...baseBreadCrumbs
      ]
    })
}])

const reportPaths = [
  '/report/:id',
  '/catalogue/report/:id',
  '/catalogue/:tag1/report/:id',
  '/catalogue/:tag1/:tag2/report/:id',
  '/catalogue/:tag1/:tag2/:tag3/report/:id',
  '/catalogue/:tag1/:tag2/:tag3/:tag4/report/:id',
  '/catalogue/:tag1/:tag2/:tag3/:tag4/:tag5/report/:id'
]

router.get(reportPaths, [handlers.configureNavigation, function (req, res) {
  const reportId = req.params.id
  // const reportData = enhancedDefinition.find((def) => def.id === req.params.id)
  const tags = getTagsFromReq(req.params, true)
  res.render(`operational-reporting/${version}/views/report`,
    {
      ...req.renderOptions,
      tags,
      bookmarked: isBookmarked(reportId),
      breadcrumbs: [
        ...baseBreadCrumbs,
        { text: 'Home', href: '/operational-reporting/v6/' },
        ...getTagBreadcrumbs(tags, true)
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
  const tags = getTagsFromReq(req.params)
  res.render(`operational-reporting/${version}/views/catalogue`,
    {
      ...req.renderOptions,
      tags,
      breadcrumbs: [
        ...baseBreadCrumbs,
        { text: 'Home', href: '/operational-reporting/v6/' },
        ...getTagBreadcrumbs(tags)
      ]
    })
}])

// BOOKMARKING

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

module.exports = router