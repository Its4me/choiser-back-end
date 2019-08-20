const mongoose = require('mongoose')
const Schema = mongoose.Schema
const root = ''


const photoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  superLikes: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('photos', photoSchema)