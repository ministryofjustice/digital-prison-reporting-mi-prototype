const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
const v2Routes = require('./v2/routes')
const handlers = require('../../utils/handlers')

const addSdtRoutes = (app) => {
  router.get('/', [
    handlers.configureCurrentUrl,
    handlers.configureNavigation,
    function (req, res) {
      res.render('versions', {
        title: 'Safety Diagnostic Tool',
        versions: {
          path: '/safety-diagnostic-tool',
          items: [
            { versionNumber: '2', status: 'Done', changeLogPath: 'sdt/v2/changelog.html' },
            { versionNumber: '1', status: 'Done', changeLogPath: 'sdt/v1/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Home', href: '/' }],
        navigationOptions: req.renderOptions.navigationOptions
      })
    }])

  app.use('/safety-diagnostic-tool', router)
  app.use('/safety-diagnostic-tool/v1', v1Routes)
  app.use('/safety-diagnostic-tool/v2', v2Routes)
}

module.exports = addSdtRoutes
