const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var authenticate = require('../authenticate')
const cors = require('./cors')
const jwt = require('jsonwebtoken')
// const jwtVerifyAsync = util.promisify(jwt.verify);

const protectedRouter = express.Router()
require('dotenv').config()

// protectedRouter.use(bodyParser.json())

protectedRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
        res.statusCode = 403
        res.end('Operation not supported')
    })
    .post(cors.corsWithOptions,  async (req, res, next) => {
        const token = req.body.token
        
        if (token) {
         try {
          return jwt.verify(token, process.env.secretKey);
         } catch (err) {
          return null;
         }
        }
        return null;
}) 


module.exports = protectedRouter