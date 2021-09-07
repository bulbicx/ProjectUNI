const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const Properties = require('../models/properties')

const allPropertyRouter = express.Router()


allPropertyRouter.route('/')
.options(cors.corsWithOptions,  (req, res) => { res.sendStatus(200) })
.get(cors.cors, async (req,res,next) => {

    try {
      Properties.find({})
      .then((properties) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(properties)
      }, (err) => next(err))
      .catch((err) => next(err))
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

module.exports = allPropertyRouter