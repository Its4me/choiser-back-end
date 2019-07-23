const errorHandler = require('../utils/errorHandler')
const User = require('../modeles/User')

module.exports.getRating = async function (req, res) {

  try {
    const users = await User
      .find({ region: req.query.region, sex: req.query.sex })
      .sort({ rating: -1, views: 1 })
      .skip(+req.query.skip)
      .limit(+req.query.limit)
    res.status(200).json(users)
  } catch (e) {
    errorHandler(res, e)
  }
}