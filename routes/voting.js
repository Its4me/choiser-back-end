const express = require('express')
const router = express.Router()
const controller = require('../controllers/voting')
const passport = require('passport')

router.get('/', 

  passport.authenticate('jwt', { session: false }),
  controller.getPhotos
)
router.post('/', 
  passport.authenticate('jwt', { session: false }),
  controller.vote
)
router.post('/superLike', 
  passport.authenticate('jwt', { session: false }),
  controller.voteSuperLike
)


module.exports = router
