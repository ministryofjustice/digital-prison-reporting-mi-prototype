const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index', { currentUrl: req.originalUrl })
})

router.get('/reports', function (req, res) {
  res.render('reports', { currentUrl: req.originalUrl })
})

module.exports = router
