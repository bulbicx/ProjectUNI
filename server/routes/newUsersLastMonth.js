const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

var User = require('../models/users')

const newUsersLastMonthRouter = express.Router()

// newUsersLastMonthRouter.use(bodyParser.json())

newUsersLastMonthRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    let date = new Date()
    let start = new Date(date.getFullYear(), date.getMonth() - 1,  1)
    let end = new Date(date.getFullYear(), date.getMonth(), 0)

    User.find({ 
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

module.exports = newUsersLastMonthRouter