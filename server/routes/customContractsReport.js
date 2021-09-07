const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Contracts = require('../models/contracts')

const customContractRouter = express.Router()

// customContractRouter.use(bodyParser.json())

customContractRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    let start = req.query.param1
    let end = req.query.param2   

    Contracts.find({ 
        "createdAt": 
        { 
            $gte: start, 
            $lte: end 
        } 
    })
    // .populate('property')
    // .populate('user')
    .then((contracts) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(contracts)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = customContractRouter