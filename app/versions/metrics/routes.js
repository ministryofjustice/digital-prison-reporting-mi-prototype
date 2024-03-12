const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
const handlers = require('../../utils/handlers')

const addMetricsRoutes = (app) => {
  router.get('/', [
    handlers.configureCurrentUrl,
    handlers.configureNavigation,
    function (req, res) {
      res.render('versions', {
        title: 'Metrics',
        versions: {
          path: '/metrics',
          items: [
            { versionNumber: '1', status: 'Done', changeLogPath: 'metrics/v1/views/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Home', href: '/' }],
        navigationOptions: req.renderOptions.navigationOptions
      })
    }])

  app.use('/metrics', router)
  app.use('/metrics/v1', v1Routes)
}

module.exports = addMetricsRoutes
