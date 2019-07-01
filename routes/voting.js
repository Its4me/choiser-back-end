const express = require('express')
const router = express.Router()
const controller = require('../controllers/voting')

router.get('/', controller.getPhotos)
router.post('/', controller.vote)

module.exports = router
