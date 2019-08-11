const express = require('express')
const router = express.Router()
const controller = require('../controllers/notification')
const passport = require('passport')

router.get('/', 
  passport.authenticate('jwt', { session: false }),
  controller.getNotifications
)
router.delete('/:id', 
  passport.authenticate('jwt', { session: false }),
  controller.deleteById
)
router.delete('/', 
  passport.authenticate('jwt', { session: false }),
  controller.deleteAll
)


module.exports = router
