const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const Reviews = require('../models/reviews')

const reviewRouter = express.Router()
const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

// reviewRouter.use(bodyParser.json())

reviewRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, (req,res,next) => {
    Reviews.find(req.query)
    .populate('author')
    .then((reviews) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(reviews)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    if (req.body != null) {
        req.body.author = req.user._id
        Reviews.create(req.body)
        .then(review => {
            Reviews.findById(review._id)
            .populate('author')
            .then(review => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(review)
            })
        }, (err) => next(err))
        .catch(err => next(err))
    }
    else {
        err = new Error('Review not found in request body')
        err.status = 404
        return next(err)
    }
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Reviews.remove({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

reviewRouter.route('/:reviewId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, (req,res,next) => {
    Reviews.findById(req.params.reviewId)
    .populate('author')
    .then((review) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(review)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /reviews/' + req.params.reviewId)
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    Reviews.findById(req.params.reviewId)
    .then((review) => {
        if (review != null) {
            if (!review.author.equals(req.user._id)) {
                err = new Error('You are not authorized to edit this review');
                err.status = 403;
                return next(err);
            }
            req.body.author = req.user._id
            Reviews.findByIdAndUpdate(req.params.reviewId, {
                $set: req.body
            }, { new: true })
            .then((review) => {
                Reviews.findById(review._id)
                .populate('author')
                .then((review) => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json(review)
                })
            }, (err) => next(err))
        }
        else {
            err = new Error('Review ' + req.params.reviewId + ' not found')
            err.statusCode = 404
            return next(err)  
        }
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    Reviews.findById(req.params.reviewId)
    .then((review) => {
        if (review != null) {
            //make sure the user deleting the review is the one who posted it originally
            if (!review.author.equals(req.user._id)) { 
                var err = new Error('You are not authorized to delete this review');
                err.status = 403;
                return next(err);
            }    
            Reviews.findByIdAndRemove(req.params.reviewId)
            .then((resp) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => next(err))
        }
        else {
            err = new Error('Review ' + req.params.reviewId + ' not found')
            err.statusCode = 404
            return next(err)  
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = reviewRouter