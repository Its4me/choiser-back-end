const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const passport = require('passport')

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getUser
)
router.patch('/',
  passport.authenticate('jwt', { session: false }),
  controller.editUser
)
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  controller.deleteUser
)

module.exports = router
