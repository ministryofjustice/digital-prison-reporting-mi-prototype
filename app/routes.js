const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/reports', function (req, res) {
  res.render('reports')
})

module.exports = router
