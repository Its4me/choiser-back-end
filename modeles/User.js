const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  password: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  rating: {
    type: Number,
    default: 1
  },
  ratingPos: {
    type: Number
  },
  views: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String
  },
  avatarKey: {
    type: String
  },
  city: {
    type: String
  },
  region: {
    type: String,
    enum: [
      "Винницкая область",
      "Волынская область",
      "Днепропетровская область",
      "Донецкая область",
      "Житомирская область",
      "Закарпатская область",
      "Запорожская область",
      "Ивано-Франковская область",
      "Киевская область",
      "Кировоградская область",
      "Луганская область",
      "Львовская область",
      "Николаевская область",
      "Одесская область",
      "Полтавская область",
      "Ровненская область",
      "Сумская область",
      "Тернопольская область",
      "Харьковская область",
      "Херсонская область",
      "Хмельницкая область",
      "Черкасская область",
      "Черниговская область",
      "Черновицкая область"
    ]
  },
  sex: {
    type: String,
    enum: [
      "male",
      "female"
    ]
  },
  selectable: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('users', userSchema)