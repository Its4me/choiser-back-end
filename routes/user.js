const express = require('express')
const router = express.Router()
const passport = require('passport')

const upload = require('../middleware/upload')
const controller = require('../controllers/user')

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getUser
)
router.patch('/',
  passport.authenticate('jwt', { session: false }),
  controller.editUser
)
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  controller.deleteUser
)
router.patch('/avatar',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'), 
  controller.editAvatar 
)
router.patch('/check-nickname',
  controller.checkNickname 
)
module.exports = router
 