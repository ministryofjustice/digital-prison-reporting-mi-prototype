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
            { versionNumber: '1', status: 'Done', changeLogPath: 'charts/v1/views/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Home', href: '/' }],
        navigationOptions: req.renderOptions.navigationOptions
      })
    }])

  app.use('/charts', router)
  app.use('/charts/v1', v1Routes)
}

module.exports = addChartsRoutes
