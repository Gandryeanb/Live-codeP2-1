require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const db = mongoose.connection

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })

const userRoute = require('./routes/userRoute')
const eventRoute = require('./routes/eventRoute')

app
  .use(cors())
  .use(express.urlencoded({extended:false}))
  .use(express.json())

  .use('/users', userRoute)
  .use('/events', eventRoute)

  .get('/', (req, res) => {
    res.status(200).json({
      message: 'Server is On'
    })
  })

  .listen(port, () => {
    console.log(`\n> Server Listening to port ${port}`)
  })

db
  .on('error', console.error.bind(console, 'connection error:'))
  .once('open', function() {
    console.log('> DB Connected')
  })
