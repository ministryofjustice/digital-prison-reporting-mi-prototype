const express = require('express')
const router = express.Router()
const { createRows, createHead, enhancedDefinitions, getRelatedByTags } = require('./utils')
const handlers = require('../../../utils/handlers')
const definitions = require('../../../data/listDefinitions')

const version = 'v5'
const enhancedDefinition = enhancedDefinitions(definitions)
const baseBreadcrumbs = [
  { text: 'Digital Prison Services', href: 'https://dps-dev.prison.service.justice.gov.uk/' },
  { text: 'Prototype', href: '/' },
  { text: 'Operational Reporting', href: '/operational-reporting/' }
]

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.redirect(`/operational-reporting/${version}/reports/`)
}])

const reportPaths = [
  '/reports/report/:id',
  '/reports/:tag1/report/:id',
  '/reports/:tag1/:tag2/report/:id',
  '/reports/:tag1/:tag2/:tag3/report/:id'
]
router.get(reportPaths, [handlers.configureNavigation, function (req, res) {
  const reportData = enhancedDefinition.find((def) => def.id === req.params.id)
  delete req.params.id
  const tags = getTagsFromReq(req.params)
  res.render(`operational-reporting/${version}/views/report`,
    {
      ...req.renderOptions,
      definitions: enhancedDefinition,
      reportData,
      tags: reportData.tags,
      relatedItems: [...getRelatedItems(reportData)],
      breadcrumbs: [
        ...baseBreadcrumbs,
        ...getTagBreadcrumbs(tags)
      ]
    })
}])

const tagsPath = [
  '/reports',
  '/reports/:tag1',
  '/reports/:tag1/:tag2',
  '/reports/:tag1/:tag2/:tag3',
  '/reports/:tag1/:tag2/:tag3/:tag4',
  '/reports/:tag1/:tag2/:tag3/:tag4/:tag5'
]

const getTagBreadcrumbs = (tags) => {
  let currentTagHref = '/operational-reporting/v5/reports/'
  const crumbs = tags.length ? [{ text: 'Reports', href: currentTagHref }] : []
  tags.forEach(tag => {
    currentTagHref += tag.id + '/'
    crumbs.push({ text: 'Tag: ' + tag.text, href: currentTagHref })
  })
  crumbs.pop()
  return crumbs
}

const filterRowsByTags = (tags, definition) => {
  return definition.filter(def => {
    const defTags = def.tags.map(t => t.slug)
    const found = []
    tags.forEach(tag => {
      found.push(defTags.includes(tag.id))
    })
    return found.every(Boolean)
  })
}

const getTagsFromReq = (params) => {
  return Object.values(params).filter(tag => tag).map(tag => {
    return { id: tag.toLowerCase(), text: tag.replaceAll('-', ' ') }
  })
}

router.get(tagsPath, [
  handlers.configureCurrentUrl,
  handlers.configureNavigation,
  function (req, res) {
    const tags = getTagsFromReq(req.params)
    const filteredByTag = filterRowsByTags(tags, enhancedDefinition)
    res.render(`operational-reporting/${version}/views/home`, {
      tags,
      rows: createRows(filteredByTag, req.originalUrl),
      head: createHead(),
      breadcrumbs: [
        ...baseBreadcrumbs,
        ...getTagBreadcrumbs(tags)
      ]
    })
  }
])

const getRelatedItems = (reportData) => {
  const relatedItems = []
  const relatedLevelOne = reportData.tags[1] ? getRelatedByTags({ tag: reportData.tags[1].text, definition: enhancedDefinition }) : []
  relatedItems.push(relatedLevelOne)

  const relatedLevelZero = getRelatedByTags({
    tag: reportData.tags[0].text,
    duplicates: relatedLevelOne,
    definition: enhancedDefinition
  })
  relatedItems.push(relatedLevelZero)

  if (reportData.tags[2]) {
    const relatedLeveltwo = getRelatedByTags({
      tag: reportData.tags[2].text,
      duplicates: [...relatedLevelOne, ...relatedLevelZero],
      definition: enhancedDefinition
    })
    relatedItems.push(relatedLeveltwo)
  }

  return relatedItems
}

module.exports = router
