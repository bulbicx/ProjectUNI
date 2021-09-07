const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Sales = require('../models/sales')

const profitLastMonthRouter = express.Router()

// profitLastMonthRouter.use(bodyParser.json())

profitLastMonthRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    let date = new Date()
    let start = new Date(date.getFullYear(), date.getMonth() - 1,  1)
    let end = new Date(date.getFullYear(), date.getMonth(), 0)

    Sales.find({ 
        "createdAt": 
        { 
            $gte: start.toISOString(), 
            $lte: end.toISOString() 
        } 
    })
    .populate('property')
    .populate('fee')
    .then((sales) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(sales)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = profitLastMonthRouter