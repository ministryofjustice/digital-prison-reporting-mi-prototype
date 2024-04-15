const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')

const version = 'v1'


const filteredDefinitionRows = definitions.map(d => ([
  { text: d.name },
  { html: d.tags.map(t => '<strong class="govuk-tag">' + t + '</strong>').join('&nbsp;') },
]))

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`operational-reporting/${version}/home`,
    {
      ...req.renderOptions,
      definitions,
      definitionRows: filteredDefinitionRows,
    })
}])

module.exports = router
