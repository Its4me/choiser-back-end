const errorHandler = require('../utils/errorHandler')
const Photo = require('../modeles/Photo')
const aws = require('aws-sdk')
const keys = require('../config/keys')

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
      console.log(req.file)
      photo = await new Photo({
        userId: req.user._id,
        key: req.files.key,
        photo: file.location
      }).save()
    }
    res.status(201).json(photo)

  } catch (e) {
    errorHandler(res, e)
  }
}
module.exports.deletePhoto = async function (req, res) {
  try {

    const photo = await Photo.findByIdAndDelete(req.params.photoId)
    if (photo) {
      deleteImageFromS3(photo.key, (err) => {
        if (err == null) {
          res.sendStatus(200)
        } else {
          res.status(400).json({
            message: 'Ошибка: Фото не удалено с S3'
          })
        }

      })
    }

  } catch (e) {
    res.status(404).json({
      message: 'Ошибка: Фото не найдено'
    })
  }
}

async function deleteImageFromS3(filename, callback) {

  const params = {
    Bucket: keys.bucket,
    Key: filename
  }

  await s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      callback(null)
    }
  })
}
