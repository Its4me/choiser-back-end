const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  initiatorId: {
    type: Schema.Types.ObjectId
  },
  superLikePhotoId: {
    type: Schema.Types.ObjectId
  },
  photoSrc: {
    type: String
  }
})

module.exports = mongoose.model('notifications', notificationSchema)