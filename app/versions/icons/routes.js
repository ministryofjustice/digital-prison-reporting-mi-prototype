const express = require('express')
const router = express.Router()
const v1Routes = require('./v1/routes')
const handlers = require('../../utils/handlers')

const addIconsRoutes = (app) => {
  router.get('/', [
    handlers.configureCurrentUrl,
    handlers.configureNavigation,
    function (req, res) {
      res.render('versions', {
        title: 'Operational Reporting',
        versions: {
          path: '/icons',
          items: [
            { versionNumber: '1', status: 'Complete', changeLogPath: 'icons/v1/views/changelog.html' }
          ]
        },
        breadcrumbs: [{ text: 'Prototype', href: '/' }],
        navigationOptions: req.renderOptions.navigationOptions
      })
    }])

  app.use('/icons', router)
  app.use('/icons/v1', v1Routes)
}

module.exports = addIconsRoutes
