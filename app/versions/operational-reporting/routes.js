const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
const v2Routes = require('./v2/routes')
const v3Routes = require('./v3/routes')
const v4Routes = require('./v4/routes')
const v5Routes = require('./v5/routes')
const v6Routes = require('./v6/routes')
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
            { versionNumber: '6', status: 'In progress', changeLogPath: 'operational-reporting/v6/views/changelog.html' },
            { versionNumber: '5', status: 'In progress', changeLogPath: 'operational-reporting/v5/views/changelog.html' },
            { versionNumber: '4', status: 'In progress', changeLogPath: 'operational-reporting/v4/views/changelog.html' },
            { versionNumber: '3', status: 'In progress', changeLogPath: 'operational-reporting/v3/changelog.html' },
            { versionNumber: '2', status: 'Complete', changeLogPath: 'operational-reporting/v2/changelog.html' },
            { versionNumber: '1', status: 'Complete', changeLogPath: 'operational-reporting/v1/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Prototype', href: '/' }],
        navigationOptions: req.renderOptions.navigationOptions
      })
    }])

  app.use('/operational-reporting', router)
  app.use('/operational-reporting/v1', v1Routes)
  app.use('/operational-reporting/v2', v2Routes)
  app.use('/operational-reporting/v3', v3Routes)
  app.use('/operational-reporting/v4', v4Routes)
  app.use('/operational-reporting/v5', v5Routes)
  app.use('/operational-reporting/v6', v6Routes)
}

module.exports = addOperationalReportingRoutes
