const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')

const version = 'v1'
const baseBreadCrumbs = [
  { text: 'Digital Prison Services', href: 'https://dps-dev.prison.service.justice.gov.uk/' },
  { text: 'Home', href: '/' }
]

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`icons/${version}/views/home`,
    {
      ...req.renderOptions,
      breadcrumbs: [
        ...baseBreadCrumbs
      ]
    })
}])

module.exports = router
