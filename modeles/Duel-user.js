const mongoose = require('mongoose')
const Schema = mongoose.Schema

const duelUserSchema = new Schema({
  duelId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('duelUser', duelUserSchema)