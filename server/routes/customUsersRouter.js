const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const User = require('../models/users')

const customUsersRouter = express.Router()

// customUsersRouter.use(bodyParser.json())

customUsersRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, verifyToken, requireSignin, verifyAdmin, (req,res,next) => {
    let start = req.query.param1
    let end = req.query.param2   

    User.find({ 
        "createdAt": 
        { 
            $gte: start, 
            $lte: end 
        } 
    })
    .then((users) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(users)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = customUsersRouter