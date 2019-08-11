const errorHandler = require('../utils/errorHandler')
const User = require('../modeles/User')
const Photo = require('../modeles/Photo')
const Notification = require('../modeles/Notification')

module.exports.getPhotos = async function (req, res) {

  try {

    const user = await User.findById(req.user.id)
    const userSex = user.sex? (user.sex == 'male'? 'female' : 'male') : ''

    const users = await User.find({ 
      selectable: true,
      region: user.region? user.region : '',
      sex: userSex,
      _id: { $ne: req.user.id }
      }, 
      '_id'
    )
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

    res.status(200).json({success: true})
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.voteSuperLike = async function (req, res) {

  // {
  //   idWin: 111,
  //   idPhotoWin: 112,
  //   idLose: 211,
  //   idPhotoLose: 212
  // }

  try {

    const initiatorId = req.user._id
    const costSuperLike = 10

    let initiator = await User.findById(initiatorId)
    
    if(initiator.coins < costSuperLike){
      res.status(400).json({
        success: false,
        message: 'Упс, не хватает coin-ов'
      })
      return
    }

    const winner = await User.findByIdAndUpdate(
      req.body.idWin, 
      { $inc: { views: 1 } })
      .select('rating')
    const loser = await User.findByIdAndUpdate(
      req.body.idLose, 
      { $inc: { views: 1 } })
      .select('rating')

    const koef = 1.5
    const rating = (Math.pow((2 - winner.rating / (winner.rating + loser.rating)),2) * koef).toFixed(4)

    const photoWin = await Photo.findByIdAndUpdate(
      req.body.idPhotoWin,
      { $inc: { views: 1, likes: 1, superLikes: 1 } }
    )
    await Photo.findByIdAndUpdate(
      req.body.idPhotoLose,
      { $inc: { views: 1 } }
    )

    await User.findByIdAndUpdate(
      req.body.idWin, 
      { $inc: { rating: +rating, notificationCount: 1 } }
    )
    
    await new Notification({
      userId: req.body.idWin,
      type: 'superLike',
      initiatorId: initiatorId,
      superLikePhotoId: req.body.idPhotoWin,
      photoSrc: photoWin.photo
    }).save()

    initiator =  await User.findByIdAndUpdate(
      initiatorId,
      { $inc : {coins: -costSuperLike}},
      { new: true }
    )
      
    res.status(200).json({
      success: true,
      coins: initiator.coins
    })

  } catch (e) {
    errorHandler(res, e)
  }
}