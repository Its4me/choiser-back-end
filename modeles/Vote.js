const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
  rating: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('votes', voteSchema)