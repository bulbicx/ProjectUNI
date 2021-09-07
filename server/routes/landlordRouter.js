const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Landlords = require('../models/landlords')

const landlordRouter = express.Router()

// landlordRouter.use(bodyParser.json())

landlordRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, verifyToken, requireSignin, async (req, res, next) => {
    if (req.user.admin) {
        let result = new RegExp(req.query.q ,'i')
    
        const page = req.query.page ? parseInt(req.query.page) : 1
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
    
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const results = {}
    
        try {
            results.results = await Landlords.find({firstName: result})
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
.post(cors.corsWithOptions, verifyToken, requireSignin, verifyAdmin, (req,res,next) => {
    
    Landlords.create(req.body)
    .then((landlord) => {
        console.log('Landlord created ', landlord)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(landlord)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, verifyToken, requireSignin, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported')
}) 
.delete(cors.corsWithOptions, verifyToken, requireSignin, verifyAdmin,  (req,res,next) => {
    Landlords.deleteMany({})
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})

landlordRouter.route('/:landlordId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, verifyToken, requireSignin, (req,res,next) => {
    Landlords.findById(req.params.landlordId)
    .then((landlord) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(landlord)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, verifyToken, requireSignin, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported')
}) 
.put(cors.corsWithOptions, verifyToken, requireSignin, verifyAdmin, (req,res,next) => {
    Landlords.findByIdAndUpdate(req.params.landlordId, {
        $set: req.body
    }, { new: true })// the new will return the updated in the reply
    .then((landlord) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(landlord)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete(cors.corsWithOptions, verifyToken, requireSignin, verifyAdmin, (req,res,next) => {
    Landlords.findByIdAndRemove(req.params.landlordId)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})


module.exports = landlordRouter