const errorHandler = require('../utils/errorHandler')
const User = require('../modeles/User')
const Photo = require('../modeles/Photo')

module.exports.getUser = async function (req, res) {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.editUser = async function (req, res) {
  try {

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.deleteUser = async function (req, res) {
  try {

  } catch (e) {
    errorHandler(res, e)
  }
}