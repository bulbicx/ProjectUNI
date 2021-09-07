const express = require('express')
const mongoose = require('mongoose')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Viewings = require('../models/viewings')

const viewingRouter = express.Router()


viewingRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, async (req, res, next) => {
  Viewings.find({})
    .populate('user')
    .populate('property')
  .then((viewings) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(viewings)
  }, (err) => next(err))
  .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    
  Viewings.create(req.body)
  .then((viewing) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(viewing)
  }, (err) => next(err))
  .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
  Viewings.deleteMany({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})

viewingRouter.route('/:viewingId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
  Viewings.findById(req.params.viewingId)
  .populate('user')
  .populate('property')
    .then((viewing) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(viewing)
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
    Viewings.findByIdAndRemove(req.params.viewingId)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})


module.exports = viewingRouter