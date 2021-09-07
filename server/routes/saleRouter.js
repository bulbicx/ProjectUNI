const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')
var ObjectId = require('mongodb').ObjectId;
const Sales = require('../models/sales')

const saleRouter = express.Router()

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

// saleRouter.use(bodyParser.json())

saleRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, async (req,res,next) => {

    if (ObjectId.isValid(req.query.q)) {

        const page = req.query.page ? parseInt(req.query.page) : 1
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
    
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const results = {}
        
        try {
            results.results = await Sales.find({
                $or: [
                    { _id: req.query.q },
                    { property: req.query.q }
                ]
            })
                .populate('property')
                .populate('fee')
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

    } else {
        const page = req.query.page ? parseInt(req.query.page) : 1
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
    
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const results = {}
        
        try {
            results.results = await Sales.find({ })
                .populate('property')
                .populate('fee')
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
    Sales.create(req.body)
    .then((sale) => {
        Sales.findById(sale._id)
        .populate('property')
        .populate('fee')
        .then(sale => {
            console.log('Sale created ', sale)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(sale)
        })
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Sales.remove({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
})

saleRouter.route('/:saleId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Sales.findById(req.params.saleId)
    .populate('property')
    .populate('fee')
    .then((sale) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(sale)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported')
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Sales.findById(req.params.saleId)
    .then((sale) => {
        if (sale != null) {
            Sales.findByIdAndUpdate(req.params.saleId, {
                $set: req.body
            }, { new: true })
            .then((sale) => {
                Sales.findById(sale._id)
                .populate('property')
                .populate('fee')
                .then(sale => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json(sale)
                })
            }, (err) => next(err))
        }
        else {
            err = new Error('Sale ' + req.params.saleId + ' not found')
            err.statusCode = 404
            return next(err)  
        }
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Sales.findById(req.params.saleId)
    .then((sale) => {
        if (sale != null) {   
            Sales.findByIdAndRemove(req.params.saleId)
            .then((resp) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => next(err))
        }
        else {
            err = new Error('Sale ' + req.params.saleId + ' not found')
            err.statusCode = 404
            return next(err)  
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = saleRouter