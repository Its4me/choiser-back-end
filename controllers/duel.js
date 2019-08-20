const errorHandler = require('../utils/errorHandler')
const User = require('../modeles/User')
const Duel = require('../modeles/Duel')

module.exports.getPrepare = async function (req, res) {
  try {
    const duel = await Duel.findById(req.params.id)

    if(duel.players[0]._id != req.user._id || duel.players[1]._id != req.user._id){
      res.status(403).json({
        success: false,
        message: "нет доступа"
      })
      return
    }
    res.status(200).json(duel)

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.createDuel = async function (req, res) {
  try {
    const params = req.body
    const user = await User.findById(req.user._id)

    if(user.coins < params.cost){
      res.status(402).json({
        success: false,
        message: "Не хватает coin-ов"
      })
      return
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { coins: -params.cost } },
      { new: true })

    const duel = new Duel(params)

    res.status(201).json({
      success: true,
      coins: req.user.coins
    })
  } catch (e) {
    errorHandler(res, e)
  }
}