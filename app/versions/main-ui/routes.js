const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
const v2Routes = require('./v2/routes')
const v4Routes = require('./v4/routes')
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
            { versionNumber: '4', status: 'wip', changeLogPath: 'main-ui/v4/views/changelog.html' },
            { versionNumber: '2', status: 'Done', changeLogPath: 'main-ui/v2/views/changelog.html' },
            { versionNumber: '1', status: 'Done', changeLogPath: 'main-ui/v1/views/changelog.html' }
          ]
        },
        breadcrumbs: []
      })
    }])

  app.use('/main-ui', router)
  app.use('/main-ui/v1', v1Routes)
  app.use('/main-ui/v2', v2Routes)
  app.use('/main-ui/v4', v4Routes)
}

module.exports = addMainUiRoutes
