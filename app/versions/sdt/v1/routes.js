const express = require('express')
const router = express.Router()
const handlers = require('../../../utils/handlers')

const version = 'v1'

router.get('', [handlers.configureCurrentUrl, handlers.configureNavigation, function (req, res) {
  res.render(`sdt/${version}/home`, req.renderOptions)
}])

module.exports = router
