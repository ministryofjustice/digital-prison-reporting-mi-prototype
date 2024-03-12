const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
const handlers = require('../../utils/handlers')

const addChartsRoutes = (app) => {
  router.get('/', [
    handlers.configureCurrentUrl,
    handlers.configureNavigation,
    function (req, res) {
      res.render('versions', {
        title: 'Charts',
        versions: {
          path: '/charts',
          items: [
            { versionNumber: '1', status: 'Done', changeLogPath: 'charts/v1/changelog.html' },
          ]
        },
        breadcrumbs: [{ text: 'Digital Prison Services', href: 'https://dps-dev.prison.service.justice.gov.uk/' }, { text: 'Home', href: '/' }]
      })
    }])

  app.use('/charts', router)
  app.use('/charts/v1', v1Routes)
}

module.exports = addChartsRoutes
