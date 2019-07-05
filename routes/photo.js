const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const controller = require('../controllers/photo')
const passport = require('passport')

router.get('/:id', 
  passport.authenticate('jwt', { session: false }),
  controller.getPhotoByUserId
)

router.post('/', 
  passport.authenticate('jwt', { session: false }),
  upload.array('photos', 10), 
  controller.uploadPhoto
)

router.delete('/:photoId', 
  passport.authenticate('jwt', { session: false }),
  controller.deletePhoto
)

module.exports = router
