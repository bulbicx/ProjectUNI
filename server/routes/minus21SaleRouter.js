const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Sales = require('../models/sales')

const minus21SaleRouter = express.Router()

// minus21SaleRouter.use(bodyParser.json())

minus21SaleRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    let start = new Date()
    let end = new Date()
    start.setDate(start.getDate() - 28)
    end.setDate(end.getDate() - 21)

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

module.exports = minus21SaleRouter