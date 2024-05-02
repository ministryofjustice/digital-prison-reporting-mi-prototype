const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')
const definitions = require('../../../data/listDefinitions')

const version = 'v1'

const bookmarkToggle = (id) => {
  return `<div class='bookmark'>
  <input class="bookmark-input" type='checkbox' id='${id}' />
  <label for='${id}'></label>
</div>`
}

const filteredDefinitionRows = definitions.map((d, index) => ([
  { text: d.name },
  { html: d.tags.map(t => '<strong class="govuk-tag">' + t + '</strong>').join('&nbsp;') },
  { html: bookmarkToggle(index) }
]))

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`operational-reporting/${version}/home`,
    {
      ...req.renderOptions,
      definitions,
      definitionRows: filteredDefinitionRows
    })
}])

module.exports = router
