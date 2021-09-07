const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Sales = require('../models/sales')

const minus35SaleRouter = express.Router()

// minus35SaleRouter.use(bodyParser.json())

minus35SaleRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    let start = new Date()
    let end = new Date()
    start.setDate(start.getDate() - 42)
    end.setDate(end.getDate() - 35)

    Sales.find({ 
        "createdAt": 
        { 
            $gt: start.toISOString(), 
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

module.exports = minus35SaleRouter