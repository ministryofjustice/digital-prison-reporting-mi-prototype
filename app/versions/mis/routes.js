const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
const handlers = require('../../utils/handlers')

const addMisRoutes = (app) => {
  router.get('/', [
    handlers.configureCurrentUrl,
    handlers.configureNavigation,
    function (req, res) {
      res.render('versions', {
        title: 'Management Information System',
        versions: {
          path: '/mis',
          items: [
            { versionNumber: '1', status: 'In progress', changeLogPath: 'mis/v1/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Home', href: '/' }],
        navigationOptions: req.renderOptions.navigationOptions
      })
    }])

  app.use('/mis', router)
  app.use('/mis/v1', v1Routes)
}

module.exports = addMisRoutes
