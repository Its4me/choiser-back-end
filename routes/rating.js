const express = require('express')
const router = express.Router()
const controller = require('../controllers/rating')

router.get('/:region', controller.getRating)

module.exports = router
