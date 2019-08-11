const keys = require('../config/keys')
const aws = require('aws-sdk')

const s3 = new aws.S3({
  secretAccessKey: keys.secretKey,
  accessKeyId: keys.keyId,
  region: 'eu-north-1'
})
const deleteImageFromS3 = async function (filename: string, callback: Function) {

  const params = {
    Bucket: 'choiser',
    Key: filename
  }

  await s3.deleteObject(params, function (err:Error, data: any) {
    if (err) {
      console.log(err) 
      callback(err)
    } else {
      callback(null)
    }
  })
}

module.exports = deleteImageFromS3