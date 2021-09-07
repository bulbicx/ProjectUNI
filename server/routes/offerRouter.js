const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Offers = require('../models/offers')

const offerRouter = express.Router()

// offerRouter.use(bodyParser.json())

offerRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, async (req, res, next) => {
  Offers.find({})
    .populate('user')
    .populate('property')
  .then((offers) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(offers)
  }, (err) => next(err))
  .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
  Offers.create(req.body)
  .then((offer) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(offer)
  }, (err) => next(err))
  .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Offers.deleteMany({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})

offerRouter.route('/:offerId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
  Offers.findById(req.params.offerId)
  .populate('user')
  .populate('property')
    .then((offer) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(offer)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported')
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
  Offers.findByIdAndUpdate(req.params.offerId, {
      $set: req.body
  }, { new: true })
  .then((offer) => {
      Offers.findById(offer._id)
      .populate('user')
      .populate('property')
      .then((offer) => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(offer)
      })
  }, (err) => next(err))
  .catch((err) => next(err))
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Offers.findByIdAndRemove(req.params.offerId)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})


module.exports = offerRouter