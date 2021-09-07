const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { errorHandler } = require('../helpers/dbErrorHandler')
const Properties = require('../models/properties')
const Reviews = require('../models/reviews')
const fs = require('fs')
const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const propertyRouter = express.Router()

// propertyRouter.use(bodyParser.json())

propertyRouter.route('/')
.options(cors.corsWithOptions,  (req, res) => { res.sendStatus(200) })
.get(cors.cors, async (req,res,next) => {
    let result = new RegExp(req.query.q ,'i')
    let numberQuery = parseInt(req.query.q)

    const page = req.query.page ? parseInt(req.query.page) : 1
    const limit = req.query.limit ? parseInt(req.query.limit) : 200

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    try {
        results.results = await Properties.find(
            {
                $or: [
                    { propertyName: result }, 
                    { category: result }, 
                    { bedNum: numberQuery ? numberQuery : null },
                    { status: result}
                ]
            }
        )
            .limit(limit)
            .skip(startIndex)
            .exec()
        
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.paginatedResults = results
            res.json(res.paginatedResults.results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})
.post(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Properties.create(req.body)
    .then((property) => {
        console.log('Property created ', property)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(property)
    }, (err) => res.json({
        error: errorHandler(err)
    }))
    .catch((err) => res.json({
        error: errorHandler(err)
    }))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /properties')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Properties.find({})
    .then(properties => {
        properties.forEach(property => {
            property.pictures.forEach(pic => { 
                try {
                    fs.unlinkSync(pic.picture)
                    //file removed
                    console.log('file pic removed' , pic.picture) 
                } catch(err) {
                    console.error(err)
                    next(err)
                }
            })
            property.floorplan.forEach(file => {
                try {
                    fs.unlinkSync(file.floorImg)
                    //file removed
                    
                    console.log('file floorplan removed' , file.floorImg) 
                } catch(err) {
                    console.error(err)
                    next(err)
                }
            })
        })
        Properties.deleteMany({})
        .then((resp) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(resp) // send response back to the client
        }, (err) => next(err))
        .catch((err) => next(err))
    })
})

propertyRouter.route('/:propertyId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, (req,res,next) => {
    Properties.findById(req.params.propertyId)
    .then((property) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(property)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /properties/'
        + req.params.propertyId)
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Properties.findByIdAndUpdate(req.params.propertyId, {
        $set: req.body
    }, { new: true })// the new will return the updated in the reply
    .then((property) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(property)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Properties.findById(req.params.propertyId)
    .then(property => {
        property.pictures.forEach(pic => { 
            try {
                fs.unlinkSync(pic.picture)
                //file removed
                console.log('file pic removed' , pic.picture) 
            } catch(err) {
                console.error(err)
            }
        })
        property.floorplan.forEach(file => {
            try {
                fs.unlinkSync(file.floorImg)
                //file removed
                
                console.log('file floorplan removed' , file.floorImg) 
            } catch(err) {
                console.error(err)
            }
        })
        Properties.findByIdAndRemove(req.params.propertyId)
        .then((resp) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(resp) // send response back to the client
        }, (err) => next(err))
        .catch((err) => next(err))
    })
})


propertyRouter.route('/:propertyId/reviews')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, (req,res,next) => {
    Reviews.findById(req.params.propertyId)
    .populate('author')
    .populate('property')
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
        req.body.property = req.params.propertyId
        Reviews.create(req.body)
        .then(review => {
            Reviews.findById(review._id)
            .populate('author')
            .populate('property')
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
.delete(cors.corsWithOptions, requireSignin, verifyAdmin, (req,res,next) => {
    Reviews.remove({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

propertyRouter.route('/:propertyId/reviews/:reviewId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, (req,res,next) => {
    Reviews.findById(req.params.reviewId)
    .populate('author')
    .populate('property')
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
                .populate('property')
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

module.exports = propertyRouter