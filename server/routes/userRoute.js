const route = require('express').Router()
const UserController = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

route
  .get('/', isLogin, UserController.getUserData)
  .post('/register', UserController.register)
  .post('/login', UserController.login)

module.exports = route