const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')
const definitions = require('../definitions')

const version = 'v2'

const distinct = (values, value) => values.includes(value) ? values : values.concat(value)
const stringSort = (a, b) => a > b ? 1 : -1

const getTags = (definitions) => definitions
  .flatMap(d => d.tags)
  .reduce(distinct, [])
  .sort(stringSort)

const getAuthors = (definitions) => definitions
  .map(d => d.author)
  .reduce(distinct, [])
  .sort(stringSort)

const getSelectedValues = (req, section) => req.query[section] ? (Array.isArray(req.query[section]) ? req.query[section] : req.query[section].split(/,/)) : []

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  const selectedTags = getSelectedValues(req, 'tags')
  const selectedAuthors = getSelectedValues(req, 'authors')
  const searchValue = !req.query.search ? req.query.prevSearch : req.query.search

  const filteredDefinitionRows = definitions
    .filter(d => (!searchValue || d.name.toLowerCase().includes(searchValue.toLowerCase())))
    .filter(d => (selectedTags.length === 0 || d.tags.find(t => selectedTags.includes(t))))
    .filter(d => (selectedAuthors.length === 0 || selectedAuthors.includes(d.author)))
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
      selectedTags,
      selectedAuthors
    }
  )
}])

module.exports = router
