const errorHandler = require('../utils/errorHandler')
const Photo = require('../modeles/Photo')
const aws = require('aws-sdk')
const keys = require('../config/keys')
const User = require('../modeles/User')
const deleteImageFromS3 = require('../utils/deletePhoto')

const s3 = new aws.S3({
  secretAccessKey: keys.secretKey,
  accessKeyId: keys.keyId,
  region: 'eu-north-1'
})


module.exports.uploadPhoto = async function (req, res) {
  let photo = null
  try {
    if (req.files) {
      photo = []
      for (let i = 0; i < req.files.length; i++) {
        photo[i] = await new Photo({
          userId: req.user._id,
          key: req.files[i].key,
          photo: req.files[i].location
        }).save()
      }
    } else if (req.file) {
      photo = await new Photo({
        userId: req.user._id,
        key: req.file.key,
        photo: file.location
      }).save()
    }


    await User.findByIdAndUpdate(req.user._id, { selectable: true })


    res.status(201).json(photo)

  } catch (e) {
    errorHandler(res, e)
  }
}
module.exports.deletePhoto = async function (req, res) {
  try {
    
    const photo = await Photo.findById(req.params.photoId)
    
    const check = `${photo.userId}` == `${req.user._id}`
    let checkAdmin = false
    
    if(!check){
      const user = await User.findById(req.user._id)
      if(user){
        checkAdmin = user.admin == true? true : false
      }
    }
    
    if(checkAdmin && !check){
      res.status(423).json({
        message: 'Нет прав'
      })
      return;
    }

    await Photo.findByIdAndDelete(req.params.photoId)

    if (photo) {
      deleteImageFromS3(photo.key, async (err) => {
        if (err == null) {
          const photos = await Photo.find({ userId: photo.userId })
          
          if (photos.length == 0) {
            await User.findByIdAndUpdate(photo.userId, { selectable: false })
          }
          
          res.status(200).json({success: true})
        } else {
          res.status(400).json({
            message: 'Ошибка: Фото не удалено с S3'
          })
        }

      })


    }else {
      res.status(404).json({message: 'Фото не найдено'})
    }


  } catch (e) {
    res.status(404).json({
      message: 'Ошибка: Фото не найдено'
    })
  }
}
module.exports.getPhotoByUserId = async function (req, res) {
  try {
    const photos = await Photo.find({ userId: req.params.id })
    res.status(200).json(photos)
  } catch (e) {
    errorHandler(res, e)
  }
}



