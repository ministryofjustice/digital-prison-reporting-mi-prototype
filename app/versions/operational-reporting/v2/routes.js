const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')
const definitions = require('../../../data/listDefinitions')

const version = 'v2'

const distinct = (values, value) => values.includes(value) ? values : values.concat(value)
const distinctKeywords = (values, value) => values.find(v => v.type === value.type && v.value === value.value) ? values : values.concat(value)
const stringSort = (a, b) => a > b ? 1 : -1

const getTags = (definitions) => definitions
  .flatMap(d => d.tags)
  .reduce(distinct, [])
  .sort(stringSort)

const getAuthors = (definitions) => definitions
  .map(d => d.author)
  .reduce(distinct, [])
  .sort(stringSort)

const getKeywords = (definitions) => definitions
  .flatMap(d => Object.keys(d.keywords).map(k => ({ type: k, value: d.keywords[k] })))
  .reduce(distinctKeywords, [])
  .sort((a, b) => a.type === b.type ? (a.value > b.value ? 1 : -1) : (a.type > b.type ? 1 : -1))

const getSelectedKeywords = (selectedKeywords, definitions) => selectedKeywords
  .flatMap(k => definitions.flatMap(d => Object.keys(d.keywords).filter(dk => d.keywords[dk] === k).map(dk => ({ type: dk, value: k }))))
  .reduce(distinctKeywords, [])

const getSelectedValues = (req, section) => req.query[section] ? (Array.isArray(req.query[section]) ? req.query[section] : req.query[section].split(/,/)) : []

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  const selectedTags = getSelectedValues(req, 'tags')
  const selectedAuthors = getSelectedValues(req, 'authors')
  const selectedKeywords = getSelectedValues(req, 'keywords')
  const searchValue = !req.query.search ? req.query.prevSearch : req.query.search

  const filteredDefinitionRows = definitions
    .filter(d => (!searchValue || d.name.toLowerCase().includes(searchValue.toLowerCase())))
    .filter(d => (selectedTags.length === 0 || d.tags.find(t => selectedTags.includes(t))))
    .filter(d => (selectedAuthors.length === 0 || selectedAuthors.includes(d.author)))
    .filter(d => (selectedKeywords.length === 0 || Object.values(d.keywords).find(k => selectedKeywords.includes(k))))
    .sort((a, b) => a.name > b.name ? 1 : -1)
    .map(d => ([
      { text: d.name },
      { html: d.tags.map(t => '<strong class="govuk-tag">' + t + '</strong>').join('&nbsp;') }
    ]))

  res.render(
    `operational-reporting/${version}/home`,
    {
      ...req.renderOptions,
      searchValue,
      definitions,
      definitionRows: filteredDefinitionRows,
      tags: getTags(definitions),
      authors: getAuthors(definitions),
      keywords: getKeywords(definitions),
      selectedTags,
      selectedAuthors,
      selectedKeywords: getSelectedKeywords(selectedKeywords, definitions)
    }
  )
}])

module.exports = router
