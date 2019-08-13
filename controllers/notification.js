const errorHandler = require('../utils/errorHandler')
const User = require('../modeles/User')
const Notification = require('../modeles/Notification')

module.exports.getNotifications = async function (req, res) {

  try {
    const id = req.user._id
    await User.findByIdAndUpdate(
      id,
      { notificationCount: 0 }
    )
    const skip = req.query.skip
    const limit = req.query.limit
    
    const notifications = await Notification.find({userId: id})
      .sort({ date: 1 })
      .skip(+skip)
      .limit(+limit)
    

    res.status(200).json(notifications)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.deleteById = async function (req, res) {

  try {

    await Notification.findByIdAndDelete(req.params.id)
    res.status(200).json({success: true})

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.deleteAll = async function (req, res) {

  try {
    await Notification.remove({userId: req.user._id})
    res.status(200).json({success: true})
  } catch (e) {
    errorHandler(res, e)
  }
}