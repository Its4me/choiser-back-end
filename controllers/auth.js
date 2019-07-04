const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')
const User = require('../modeles/User')
const keys = require('../config/keys')

module.exports.login = async function (req, res) {
  try {
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
      const comparePasswords = bcrypt.compareSync(req.body.password, candidate.password)
      if (comparePasswords) {
        const token = jwt.sign({ email: candidate.email, _id: candidate._id }, keys.jwt, { expiresIn: '31d' })
        res.status(200).json({
          userId: candidate._id,
          token: `Bearer ${token}`
        })
        return
      }
    }
    res.status(401).json({
      message: "Комбинация email и пароля неправильная"
    })

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.register = async function (req, res) {
  try {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
      //вывод ошибки
      res.status(401).json({ message: "Пользователь с таким email уже зарегестрирован" })
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt)

      const user = await new User({
        email: req.body.email,
        password: hash,
        nickname: req.body.nickname, // uniqe
        name: req.body.name,
        lastname: req.body.lastname,
        city: req.body.city,
        region: req.body.region
      }).save()
      // вход
      const token = jwt.sign({ email: req.body.email, _id: user._id }, keys.jwt, { expiresIn: '31d' })


      res.status(201).json({
        userId: user._id,
        token: `Bearer ${token}`
      })
    }

  } catch (e) {
    errorHandler(res, e)
  }
}
