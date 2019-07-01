const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')

router.get('/:id', controller.getUser)
router.patch('/:id', controller.editUser)
router.delete('/:id', controller.deleteUser)

module.exports = router
