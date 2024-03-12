const express = require('express')
const router = express.Router()

const handlers = require('./utils/handlers')
const listEndpoints = require('express-list-endpoints')

router.get('/', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render('cards', {
    ...req.renderOptions,
    title: 'Home',
    cards: req.renderOptions.navigationOptions
  })
}])

router.get('/routes', (req, res) => {
  res.status(200).send(listEndpoints(router))
})

module.exports = router
