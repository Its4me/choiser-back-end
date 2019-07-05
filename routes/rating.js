const express = require('express')
const router = express.Router()
const controller = require('../controllers/rating')
const passport = require('passport')

router.get('/',
 passport.authenticate('jwt', { session: false }),
 controller.getRating
)

module.exports = router
