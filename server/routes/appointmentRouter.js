const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Appointments = require('../models/appointments')

const appointmentRouter = express.Router()

// appointmentRouter.use(bodyParser.json())

appointmentRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, async (req, res, next) => {
  Appointments.find({})
  .then((appointments) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(appointments)
  }, (err) => next(err))
  .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
  Appointments.create(req.body)
  .then((appointment) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(appointment)
  }, (err) => next(err))
  .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
  Appointments.deleteMany({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})

appointmentRouter.route('/:appointmentId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
  Appointments.findById(req.params.appointmentId)
    .then((appointment) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(appointment)
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
    Appointments.findByIdAndRemove(req.params.appointmentId)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})


module.exports = appointmentRouter