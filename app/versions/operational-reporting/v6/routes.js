const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')

const version = 'v6'
const baseBreadCrumbs = [
  { text: 'Digital Prison Services', href: 'https://dps-dev.prison.service.justice.gov.uk/' },
  { text: 'Prototype', href: '/' },
  { text: 'Operational Reporting', href: '/operational-reporting/' }
]

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`operational-reporting/${version}/views/home`,
    {
      ...req.renderOptions,
      breadcrumbs: [
        ...baseBreadCrumbs
      ]
    })
}])

router.get('/catalogue', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`operational-reporting/${version}/views/catalogue`,
    {
      ...req.renderOptions,
      breadcrumbs: [
        ...baseBreadCrumbs,
        { text: 'Home', href: '/operational-reporting/v6/' }
      ]
    })
}])

router.get('/catalogue/report', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`operational-reporting/${version}/views/report`,
    {
      ...req.renderOptions,
      breadcrumbs: [
        ...baseBreadCrumbs,
        { text: 'Home', href: '/operational-reporting/v6/' },
        { text: 'Catalogue', href: '/operational-reporting/v6/catalogue/' }
      ]
    })
}])

module.exports = router