const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')

class UserController {

  static getUserData(req, res) {
    User.findOne({ _id: req.decoded.id })
      .then(data => {
        res.status(200).json({
          id: data._id
        })
      })
      .catch(err => {
        res.status(500).json({
          success: false
        })
      })
  }

  static register (req, res) {
    let newData = {
      name: req.body.name,
      email: req. body.email,
      password: req.body.password
    }

    let user = new User(newData)

    user.save()
      .then(data => {
        res.status(201).json({
          success: true,
          message: `Account ${data.name} registered`
        })
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
  }

  static login(req, res) {
    
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {
            let token = jwt.sign({
              id: data._id,
              email: data.email
            }, process.env.JWT_HASH)
            res.status(201).json({
              token: token
            })
          } else {
            res.status(500).json({
              success: false,
              message: 'wrong password or email'
            })
          }
        } else {
          res.status(404).json({
            success: false,
            message: 'user not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      }) 
  }

}

module.exports = UserController