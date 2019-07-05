const errorHandler = require('../utils/errorHandler')
const User = require('../modeles/User')
const Photo = require('../modeles/Photo')

module.exports.getPhotos = async function (req, res) {

  try {

    const users = await User.find({ selectable: true }, '_id')
      .sort({ views: 1 })
      .limit(2)

    let photos = []

    for (let i = 0; i < users.length; i++) {
      const usersPhoto = await Photo.find({ userId: users[i]._id })
      const length = usersPhoto.length
      const random = Math.floor(Math.random() * length)
      photos[i] = usersPhoto[random]
    }

    res.status(200).json({
      photos
    })

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.vote = async function (req, res) {

  // {
  //   idWin: 111,
  //   idPhotoWin: 112,
  //   idLose: 211,
  //   idPhotoLose: 212
  // }

  try {

    const winner = await User.findByIdAndUpdate(
      req.body.idWin, 
      { $inc: { views: 1 } })
      .select('rating')
    const loser = await User.findByIdAndUpdate(
      req.body.idLose, 
      { $inc: { views: 1 } })
      .select('rating')
      
    const rating = Math.pow((2 - winner.rating / (winner.rating + loser.rating)),2).toFixed(4)

    await Photo.findByIdAndUpdate(
      req.body.idPhotoWin,
      { $inc: { views: 1, likes: 1 } }
    )
    await Photo.findByIdAndUpdate(
      req.body.idPhotoLose,
      { $inc: { views: 1 } }
    )

    await User.findByIdAndUpdate(
      req.body.idWin, 
      { $inc: { rating: +rating } }
    )

    res.sendStatus(200)
  } catch (e) {
    errorHandler(res, e)
  }
}