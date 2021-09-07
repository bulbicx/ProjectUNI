const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const Properties = require('../models/properties')

const customPropertyRouter = express.Router()

// customPropertyRouter.use(bodyParser.json())

customPropertyRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req,res,next) => {
    let start = req.query.param1
    let end = req.query.param2   

    Properties.find({ 
        "createdAt": 
        { 
            $gte: start, 
            $lte: end 
        } 
    })
    .then((properties) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(properties)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = customPropertyRouter