const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParcer = require('body-parser')
const keys = require('./config/keys')

const authRoutes = require('./routes/auth')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err))


app.use(bodyParcer.urlencoded(({ extended: true })));
app.use(bodyParcer.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes);

module.exports = app