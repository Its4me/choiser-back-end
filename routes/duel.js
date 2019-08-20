const express = require('express')
const router = express.Router()
const controller = require('../controllers/duel')
const passport = require('passport')

router.get('/pepare/:id', 
  passport.authenticate('jwt', { session: false }),
  controller.getPrepare
)
router.post('/pepare', 
  passport.authenticate('jwt', { session: false }),
  controller.createDuel
)

module.exports = router
