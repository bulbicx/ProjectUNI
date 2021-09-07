const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Properties = require('../models/properties')

const buyPropertyRouter = express.Router()

// buyPropertyRouter.use(bodyParser.json())

buyPropertyRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, async (req,res,next) => {
    let cat
    let property
    let price 
    let schoolDistance 
    let trainDistance 
    let bedNo
    let crime
    let querySearch

    const page = req.query.page ? parseInt(req.query.page) : 1
    const limit = req.query.limit ? parseInt(req.query.limit) : 100

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}
    let total

    if (req.query.param1 || req.query.param2 || req.query.param3 || req.query.param4 || req.query.param5 || req.query.param6) {
        cat = 'buy', 
        property = new RegExp(req.query.param1 ,'i')
        price = parseInt(req.query.param2)
        schoolDistance = parseInt(req.query.param3)
        trainDistance = parseInt(req.query.param4)
        bedNo = parseInt(req.query.param5) > 5 ? { $lte: parseInt(req.query.param5) } : parseInt(req.query.param5)
        crime = parseInt(req.query.param6)


        querySearch = { $and: [
            { category: cat }, 
            {$or : [{ propertyName: property ? property : '' }, { locationArea: property ? property : '' } ]},  
            { salePrice: { $lte: price } }, 
            { school: { $lte: schoolDistance } },
            { train: { $lte: trainDistance } },
            { bedNum:  bedNo  },
            {  crimeRate : { $lte: crime } }
        ]
        }
    } 
    else {
        querySearch = { category: 'buy' }
    }

    
    try {
        total = await Properties.find(querySearch).then(prop => prop.length)

        results.results = await Properties.find(querySearch)
            .limit(limit)
            .skip(startIndex)
            .exec()
        
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.paginatedResults = results
            let all = {
                results: res.paginatedResults.results,
                count: total
            }
            let all2 = JSON.stringify(all)
            res.send(all2)
        
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
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /properties-to-buy')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Properties.deleteMany({ category: 'buy' })
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})

buyPropertyRouter.route('/:propertyId')
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
    res.end('POST operation not supported on /properties-to-buy/'
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
    Properties.findByIdAndRemove(req.params.propertyId)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = buyPropertyRouter