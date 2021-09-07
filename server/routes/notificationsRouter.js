const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Notifications = require('../models/notifications')

const notificationRouter = express.Router()

// notificationRouter.use(bodyParser.json())

notificationRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, async (req, res, next) => {
  Notifications.find({})
    .populate('user')
    .populate('property')
  .then((notifications) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(notifications)
  }, (err) => next(err))
  .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    
  Notifications.create(req.body)
  .then((notification) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(notification)
  }, (err) => next(err))
  .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Notifications.deleteMany({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})

notificationRouter.route('/:notificationId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
  Notifications.findById(req.params.notificationId)
  .populate('user')
  .populate('property')
    .then((notification) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(notification)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported')
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
  res.statusCode = 403
  res.end('PUT operation not supported')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Notifications.findByIdAndRemove(req.params.notificationId)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})


module.exports = notificationRouter