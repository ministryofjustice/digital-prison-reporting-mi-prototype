const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
const v2Routes = require('./v2/routes')
const v3Routes = require('./v3/routes')
const v4Routes = require('./v4/routes')
const v5Routes = require('./v5/routes')
const v6Routes = require('./v6/routes')
const v7Routes = require('./v7/routes')
const v8Routes = require('./v8/routes')
const handlers = require('../../utils/handlers')

const addMainUiRoutes = (app) => {
  router.get('/', [
    handlers.configureCurrentUrl,
    handlers.configureNavigation,
    function (req, res) {
      res.render('versions', {
        title: 'Main UI',
        versions: {
          path: '/main-ui',
          items: [
            { versionNumber: '8', status: 'In Review', changeLogPath: 'main-ui/v8/views/changelog.html' },
            { versionNumber: '7', status: 'In Review', changeLogPath: 'main-ui/v7/views/changelog.html' },
            { versionNumber: '6', status: 'Done', changeLogPath: 'main-ui/v6/views/changelog.html' },
            { versionNumber: '5', status: 'Done', changeLogPath: 'main-ui/v5/views/changelog.html' },
            { versionNumber: '4', status: 'Done', changeLogPath: 'main-ui/v4/views/changelog.html' },
            { versionNumber: '3', status: 'Done', changeLogPath: 'main-ui/v3/views/changelog.html' },
            { versionNumber: '2', status: 'Done', changeLogPath: 'main-ui/v2/views/changelog.html' },
            { versionNumber: '1', status: 'Done', changeLogPath: 'main-ui/v1/views/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Home', href: '/' }]
      })
    }])

  app.use('/main-ui', router)
  app.use('/main-ui/v1', v1Routes)
  app.use('/main-ui/v2', v2Routes)
  app.use('/main-ui/v3', v3Routes)
  app.use('/main-ui/v4', v4Routes)
  app.use('/main-ui/v5', v5Routes)
  app.use('/main-ui/v6', v6Routes)
  app.use('/main-ui/v7', v7Routes)
  app.use('/main-ui/v8', v8Routes)
}

module.exports = addMainUiRoutes
