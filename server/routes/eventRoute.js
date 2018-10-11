const route = require('express').Router()
const EventController = require('../controllers/eventController')
const isLogin = require('../middlewares/isLogin')

route
  .post('/', isLogin, EventController.createEvent)
  .get('/', EventController.getEvent)
  .delete('/:id', isLogin, EventController.deleteEvent )
  .get('/search/:keyword', isLogin, EventController.getEventByName)
  

module.exports = route