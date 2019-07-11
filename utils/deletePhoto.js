const keys = require('../config/keys')
const aws = require('aws-sdk')

const s3 = new aws.S3({
  secretAccessKey: keys.secretKey,
  accessKeyId: keys.keyId,
  region: 'eu-north-1'
})
const deleteImageFromS3 = async function (filename, callback) {

  const params = {
    Bucket: 'choiser',
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

module.exports = deleteImageFromS3