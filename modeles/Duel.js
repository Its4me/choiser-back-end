const mongoose = require('mongoose')
const Schema = mongoose.Schema

const duelSchema = new Schema({
  players: [{ 
    _id: Schema.Types.ObjectId,
    nickName: String,
    photos: [{
      _id: Schema.Types.ObjectId,
      photoSrc: String,
      voted: {
        type: String,
        default: 0
      }
    }]
  }],
  date: {
    start: {
      type: Date,
      default: Date.now
    },
    confirm: Date,
    end: Date
  },
  userCount: {
    type: Number,
    default: 0
  },
  winnerId: {
    type: Schema.Types.ObjectId
  },
  cost: {
    type: Number
  },
  totalCoins: {
    type: Number
  }
})

module.exports = mongoose.model('duel', duelSchema)