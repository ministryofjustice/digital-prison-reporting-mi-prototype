const express = require('express')
const router = express.Router()
const { createRows, createHead, enhancedDefinitions, getRelatedByTags, getRelatedProducts } = require('./utils')
const handlers = require('../../../utils/handlers')

const version = 'v4'
const enhancedDefinition = enhancedDefinitions()

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`operational-reporting/${version}/views/home`,
    {
      ...req.renderOptions,
      rows: createRows(enhancedDefinition),
      head: createHead()
    })
}])

router.get('/report/:id', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  const reportData = enhancedDefinition.find((def) => def.id === req.params.id)

  const relatedLevelOne = reportData.tags[1] ? getRelatedByTags({ tag: reportData.tags[1].text, definition: enhancedDefinition }) : []
  const relatedLevelZero = getRelatedByTags({
    tag: reportData.tags[0].text,
    duplicates: relatedLevelOne,
    definition: enhancedDefinition
  })
  const relatedProductsA = getRelatedProducts(reportData, enhancedDefinition, 0)
  const relatedProductsB = getRelatedProducts(reportData, enhancedDefinition, 1)
  const relatedProductsC = getRelatedProducts(reportData, enhancedDefinition, 2)

  res.render(`operational-reporting/${version}/views/report`,
    {
      ...req.renderOptions,
      definitions: enhancedDefinition,
      reportData,
      relatedLevelOne,
      relatedLevelZero,
      getRelatedProducts,
      relatedProducts: [
        relatedProductsA,
        relatedProductsB,
        relatedProductsC
      ]
    })
}])

module.exports = router
