const errorHandler = require('../utils/errorHandler')
const User = require('../modeles/User')
const Photo = require('../modeles/Photo')
const deleteImageFromS3 = require('../utils/deletePhoto')

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
    const updateData = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    )
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.deleteUser = async function (req, res) {
  try {
    const user = await User.findById(req.params.id)
    const photos = await Photo.find({ userId: req.params.id }).select('key')

    for (let i = 0; i < photos.length; i++) {
      await deleteImageFromS3(photos[i].key, (err) => {
        if (err) {
          res.status(503).json({
            message: err
          })
        }
      })
    }

    if (user.avatarKey) {
      await deleteImageFromS3(user.avatarKey, (err) => {
        if (err) {
          res.status(503).json({
            message: err
          })
        }
      })
    }

    await Photo.remove({ userId: req.params.id })
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: "Аккаунт удален"
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.editAvatar = async function (req, res) {
  try {

    let user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: req.file.location,
        avatarKey: req.file.key,
      }
    )
    if (user.avatar) {
      await deleteImageFromS3(user.avatarKey, (err) => {
        if (err) {
          res.status(503).json({
            message: err
          })
        }
      })
    }

    user.avatar = req.file.location
    user.avatarKey = req.file.key

    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}