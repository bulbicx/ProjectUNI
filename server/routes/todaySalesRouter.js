const express = require('express')
const mongoose = require('mongoose')
const cors = require('./cors')

const Sales = require('../models/sales')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const todaySaleRouter = express.Router()


todaySaleRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    let start = new Date()
    start.setDate(start.getDate() - 7)
    let end = new Date()

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

module.exports = todaySaleRouter