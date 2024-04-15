const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
<<<<<<< HEAD
=======
const v2Routes = require('./v2/routes')
>>>>>>> main
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
<<<<<<< HEAD
=======
            { versionNumber: '2', status: 'In progress', changeLogPath: 'operational-reporting/v2/changelog.html' },
>>>>>>> main
            { versionNumber: '1', status: 'In progress', changeLogPath: 'operational-reporting/v1/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Home', href: '/' }],
        navigationOptions: req.renderOptions.navigationOptions
      })
    }])

  app.use('/operational-reporting', router)
  app.use('/operational-reporting/v1', v1Routes)
<<<<<<< HEAD
=======
  app.use('/operational-reporting/v2', v2Routes)
>>>>>>> main
}

module.exports = addOperationalReportingRoutes
