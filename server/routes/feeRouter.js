const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')
var ObjectId = require('mongodb').ObjectId;

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Fees = require('../models/fees')

const feeRouter = express.Router()

// feeRouter.use(bodyParser.json())

feeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, async (req, res, next) => {

    let result = new RegExp(req.query.q, 'i')
    let numberQuery = parseInt(req.query.q)

    const page = req.query.page ? parseInt(req.query.page) : 1
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    
    const results = {}  

    if (ObjectId.isValid(req.query.q)) {
        try {
          results.results = await Fees.find({ _id: req.query.q })
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
    }
    else {
        try {
            results.results = await Fees.find(
                {
                    $or: [
                        { percentage: numberQuery ? numberQuery : null },
                        { category: result }
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
    }
})
.post(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Fees.create({
        "percentage": req.body.percentage,
        "category": req.body.category
    })
    .then((fee) => {
        console.log('Fee created ', fee)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(fee)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Fees.remove({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

feeRouter.route('/:feeId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Fees.findById(req.params.feeId)
    .then((fee) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(fee)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported')
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Fees.findById(req.params.feeId)
    .then((fee) => {
        if (fee != null) {
            Fees.findByIdAndUpdate(req.params.feeId, {
                $set: req.body
            }, { new: true })
            .then((fee) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(fee)
            }, (err) => next(err))
        }
        else {
            err = new Error('Fee ' + req.params.feeId + ' not found')
            err.statusCode = 404
            return next(err)  
        }
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Fees.findById(req.params.feeId)
    .then((fee) => {
        if (fee != null) {   
            Fees.findByIdAndRemove(req.params.feeId)
            .then((resp) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => next(err))
        }
        else {
            err = new Error('Fee ' + req.params.feeId + ' not found')
            err.statusCode = 404
            return next(err)  
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = feeRouter