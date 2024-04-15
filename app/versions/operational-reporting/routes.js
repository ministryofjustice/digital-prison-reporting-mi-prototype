const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
const v2Routes = require('./v2/routes')
const handlers = require('../../utils/handlers')

const addOperationalReportingRoutes = (app) => {
  router.get('/', [
    handlers.configureCurrentUrl,
    handlers.configureNavigation,
    function (req, res) {
      res.render('versions', {
        title: 'Operational Reporting',
        versions: {
          path: '/operational-reporting',
          items: [
            { versionNumber: '2', status: 'In progress', changeLogPath: 'operational-reporting/v2/changelog.html' },
            { versionNumber: '1', status: 'In progress', changeLogPath: 'operational-reporting/v1/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Home', href: '/' }],
        navigationOptions: req.renderOptions.navigationOptions
      })
    }])

  app.use('/operational-reporting', router)
  app.use('/operational-reporting/v1', v1Routes)
  app.use('/operational-reporting/v2', v2Routes)
}

module.exports = addOperationalReportingRoutes
