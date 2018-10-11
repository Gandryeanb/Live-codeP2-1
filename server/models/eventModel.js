const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  location: {
    type: String,
    require: [true, 'event required']
  },
  address: {
    type: String,
    required: [true, 'address required']
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event