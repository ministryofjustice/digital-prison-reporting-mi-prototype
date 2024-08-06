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
const v9Routes = require('./v9/routes')
const v10Routes = require('./v10/routes')
const v11Routes = require('./v11/routes')
const v12Routes = require('./v12/routes')
const v13Routes = require('./v13/routes')
const v14Routes = require('./v14/routes')
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
            { versionNumber: '14', status: 'In Review', changeLogPath: 'main-ui/v14/views/changelog.html' },
            { versionNumber: '13', status: 'In Review', changeLogPath: 'main-ui/v13/views/changelog.html' },
            { versionNumber: '12', status: 'In Review', changeLogPath: 'main-ui/v12/views/changelog.html' },
            { versionNumber: '11', status: 'Done', changeLogPath: 'main-ui/v11/views/changelog.html' },
            { versionNumber: '10', status: 'Done', changeLogPath: 'main-ui/v10/views/changelog.html' },
            { versionNumber: '9', status: 'Done', changeLogPath: 'main-ui/v9/views/changelog.html' },
            { versionNumber: '8', status: 'Done', changeLogPath: 'main-ui/v8/views/changelog.html' },
            { versionNumber: '7', status: 'Done', changeLogPath: 'main-ui/v7/views/changelog.html' },
            { versionNumber: '6', status: 'Done', changeLogPath: 'main-ui/v6/views/changelog.html' },
            { versionNumber: '5', status: 'Done', changeLogPath: 'main-ui/v5/views/changelog.html' },
            { versionNumber: '4', status: 'Done', changeLogPath: 'main-ui/v4/views/changelog.html' },
            { versionNumber: '3', status: 'Done', changeLogPath: 'main-ui/v3/views/changelog.html' },
            { versionNumber: '2', status: 'Done', changeLogPath: 'main-ui/v2/views/changelog.html' },
            { versionNumber: '1', status: 'Done', changeLogPath: 'main-ui/v1/views/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Home', href: '/' }],
        navigationOptions: req.renderOptions.navigationOptions
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
  app.use('/main-ui/v9', v9Routes)
  app.use('/main-ui/v10', v10Routes)
  app.use('/main-ui/v11', v11Routes)
  app.use('/main-ui/v12', v12Routes)
  app.use('/main-ui/v13', v13Routes)
  app.use('/main-ui/v14', v14Routes)
}

module.exports = addMainUiRoutes
