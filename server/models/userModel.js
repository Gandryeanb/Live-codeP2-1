const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password required'],
    validate: {
      validator () {
        if (this.password.length < 6) {
          throw new Error('password length must be greater than 6')
        }
      }
    }
  },
  loginWeb: {
    type: Number,
    default: 1
  }
})

userSchema.post('validate', doc => {
  let hash = bcrypt.hashSync(doc.password, Number(process.env.HASH_PW))
  doc.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User