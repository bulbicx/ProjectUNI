const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Contracts = require('../models/contracts')

const contractLastMonthRouter = express.Router()

// contractLastMonthRouter.use(bodyParser.json())

contractLastMonthRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, requireSignin, verifyToken, verifyAdmin, async (req, res, next) => {
        let date = new Date()
        let start = new Date(date.getFullYear(), date.getMonth() - 1,  1)
        let end = new Date(date.getFullYear(), date.getMonth(), 0)
    
        await Contracts.find({ 
            "createdAt": 
            { 
                $gte: start.toISOString(), 
                $lte: end.toISOString() 
            } 
            })
        .then((contracts) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(contracts)//send back as a json response
        }, (err) => next(err))
        .catch((err) => next(err))
})

module.exports = contractLastMonthRouter