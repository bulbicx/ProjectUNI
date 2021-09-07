const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')
var ObjectId = require('mongodb').ObjectId;

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Contracts = require('../models/contracts')

const contractRouter = express.Router()
const fs = require('fs')

// contractRouter.use(bodyParser.json())

contractRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, requireSignin, verifyToken, async (req, res, next) => {
        if (req.user.admin) {

            let result = new RegExp(req.query.q ,'i')

            const page = req.query.page ? parseInt(req.query.page) : 1
            const limit = req.query.limit ? parseInt(req.query.limit) : 10
        
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
        
            const results = {}

            if (ObjectId.isValid(req.query.q)) { //if objectId is valid

                try {
                    results.results = await Contracts.find({
                        $or: [
                            { property: req.query.q },
                            { user: req.query.q }
                        ]
                    })
                        .populate('property')
                        .populate('user')
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
            else { //else show all
                
                try {
                    results.results = await Contracts.find({})
                        .populate('property')
                        .populate('user')
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
        } 
        else {
            let result = new RegExp(req.query.q, 'i')

            const page = req.query.page ? parseInt(req.query.page) : 1
            const limit = req.query.limit ? parseInt(req.query.limit) : 10
        
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
        
            const results = {}
            try {
                results.results = await Contracts.find({user: req.user._id})
                    .populate('property')
                    .populate('user')
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
    Contracts.create({
        "start": req.body.start, 
        "end": req.body.end, 
        "property": req.body.property, 
        "user": req.body.user,
        "document": req.body.document
    })
    .then((contract) => {
        console.log('Contract created ', contract)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(contract)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /contracts')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Contracts.find({ user: req.user._id })
    .then((contract) => {
        if (contract !== null) {
            contract.remove((err, contract) => {
                if (!err) {
                    res.statusCode = 200
                    res.setHeader("Content-Type", "application/json")
                    res.json(contract)
                } else {
                    return next(err)
                }
            })
        }
        else {
            var err = new Error("You do not have any contracts")
            err.staus = 403
            return next(err)
        }
    })
    .catch((err) => next(err))
})

contractRouter.route('/:contractId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
    Contracts.findById(req.params.contractId)
    .populate('property')
    .populate('user')
    .then((contract) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(contract)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /contract/'
        + req.params.contractId)
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Contracts.findByIdAndUpdate(req.params.contractId, {
        $set: req.body
    }, { new: true })// the new will return the updated in the reply
    .then((contract) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(contract)
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    Contracts.findById(req.params.contractId)
    .then(contract => {
        try {
            fs.unlinkSync(contract.document)
            //file removed
            console.log('file doc removed' , contract.document) 
        } catch(err) {
            console.error(err)
        }
        Contracts.findByIdAndRemove(req.params.contractId)
        .then((resp) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(resp) // send response back to the client
        }, (err) => next(err))
        .catch((err) => next(err))
    })
})

module.exports = contractRouter