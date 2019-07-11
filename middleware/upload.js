const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const keys = require('../config/keys')

const s3 = new aws.S3({
  secretAccessKey: keys.secretKey,
  accessKeyId: keys.keyId,
  region: 'eu-north-1'
})


const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'choiser',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    fileFilter,
    key: function (req, file, cb) {
      const random = Math.random()
      const userId = req.user._id
      cb(null, `${userId}/${Date.now()}-${random}-${file.originalname}`)
    }
  })
})
function fileFilter(req, file, cb) {
  if (file.size >= 5242880) {
    cb(null, false)
  }
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } 
  cb(new Error('Тип файла должен быть jpeg или png, а размер меньше 5 мб'))
}

module.exports = upload
