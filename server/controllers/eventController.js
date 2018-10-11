const Event = require('../models/eventModel')

class EventController {

  static deleteEvent(req, res) {

    Event.deleteOne({ _id:req.params.id })
      .then(data => {
        
        if (data.n == 1) {
          res.status(201).json({
            success: true,
            message: `Event with Id ${req.params.id}`
          })
        } else {
          res.status(304).json({})
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
  }

  static getEventByName(req, res) {
    
    Event.find({ 'name' : { '$regex' : req.params.keyword, '$options' : 'i' } })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
  }

  static getEvent(req, res) {
    Event.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
  }

  static createEvent(req, res) {
    
    let data = {
      name: req.body.name,
      location: req.body.location,
      address: req.body.address,
      user: req.decoded.id
    }

    let event = new Event(data)

    event.save()
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
  }

}

module.exports = EventController