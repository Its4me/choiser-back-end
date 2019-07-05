const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParcer = require('body-parser')
const keys = require('./config/keys')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const photoRoutes = require('./routes/photo')
const ratingRoutes = require('./routes/rating')
const votingRoutes = require('./routes/voting')
const userRoutes = require('./routes/user')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err))

mongoose.set('useFindAndModify', false)

app.use(bodyParcer.urlencoded(({ extended: true })));
app.use(bodyParcer.json())
app.use(require('cors')())
app.use(passport.initialize())
require('./middleware/passport')(passport)


app.use('/api/auth', authRoutes)
app.use('/api/photo', photoRoutes)
app.use('/api/rating', ratingRoutes)
app.use('/api/voting', votingRoutes)
app.use('/api/user', userRoutes)

module.exports = app