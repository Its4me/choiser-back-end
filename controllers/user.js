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
    
    //Проверка ника на уникальность
    const checkNickname = await User.find({ nickname: req.body.nickname })

    if (checkNickname.length != 0 && `${checkNickname[0]._id}` != `${req.user._id}`) {

      res.status(409).json({
        success: false,
        message: 'Ник уже занят'
      })
      return
    }

    //Проверка мыла на уникальность
    const checkEmail = await User.find({ email: req.body.email })
    
    if (checkEmail.length != 0 && `${checkEmail[0]._id}` != `${req.user._id}`) {
      res.status(409).json({
        success: false,
        message: 'Email уже используется'
      })
      return
    }

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

    if (! await chechAccess(user._id, req, res)) {
      res.status(423).json({
        message: 'Нет прав'
      })
      return
    }

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
module.exports.checkNickname = async function (req, res) {
  try {
    const user = await User.find({ nickname: req.body.nickname })
    if (user) {
      res.status(409).json({
        success: false,
        message: 'Ник уже занят'
      })
      return
    }
    res.status(200).json({
      success: true,
      message: 'Ник свободен'
    })
  }
  catch (e) {
    errorHandler(res, e)
  }
}

async function chechAccess(_id, req, res) {
  const check = `${_id}` == `${req.user._id}`
  let checkAdmin = false

  if (!check) {
    const user = await User.findById(req.user._id)
    if (user) {
      checkAdmin = user.admin == true ? true : false
    }
  }

  return (checkAdmin || check)

}