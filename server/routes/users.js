var express = require('express')
var User = require('../models/users')
const cors = require('./cors')
const ValidateData = require('./middelware/Validate');
var passport = require('passport')
var authenticate = require('../authenticate')
const bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectId;
const { errorHandler } = require('../helpers/dbErrorHandler')
var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
const _ = require('lodash')

const { requireSignin, verifyUser, verifyAdmin, verifyToken } = require('../authenticate')
var router = express.Router()


/* GET users listing. */
router.options('*', cors.corsWithOptions,  (req, res) => {res.sendStatus(200)})
router.get('/', cors.corsWithOptions, verifyToken, verifyAdmin, async (req, res, next) => {

  let result = new RegExp(req.query.q ,'i')

  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 10

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (ObjectId.isValid(req.query.q)) {
    try {
      results.results = await User.find({ _id: req.query.q })
        .limit(limit)
        .skip(startIndex)
        .exec()
      
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.paginatedResults = results
        res.json(res.paginatedResults.results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
  }
  else {
    try {
      results.results = await User.find({ "firstName": result })
        .limit(limit)
        .skip(startIndex)
        .exec()
      
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.paginatedResults = results
        res.json(res.paginatedResults.results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
  }

})

router.post('/', cors.corsWithOptions, verifyToken, verifyAdmin, ValidateData.SignUpValidate, (req, res, next) => {
  const user = new User(req.body)
  user.save((err, user) => {
      if (err) {
          return res.status(400).json({ err: errorHandler(err) })
      }
      user.salt = undefined
      user.hashed_password = undefined
      res.json({ user, status: 'Registration Successful!' })
  })

})

router.get('/:userId', cors.corsWithOptions, requireSignin, verifyToken, (req, res, next) => {

  User.findById(req.params.userId)
  .then((user) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  }, (err) => next(err))
  .catch((err) => next(err))
})

router.put('/:userId', cors.corsWithOptions, requireSignin, verifyToken, (req, res, next) => {
  if (req.body.documents) {
    User.findById(req.params.userId, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'Something went wrong. Try later',
          message: 'Something went wrong. Try later'
        })
      }
  
      const updatedUser = {
        documents: req.body.documents
      }
  
      user = _.extend(user, updatedUser)
  
      user.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: 'Error resetting user details',
            message: 'There has been an issue modifying the user. Retry'
          })
        }
    
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
      })
  
    })
  }
  else if (req.body.password === 'same') { // not changing password
    User.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, { new: true })// the new will return the updated in the reply
    .then((user) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    }, (err) => next(err))
    .catch((err) => next(err))
  }
  else {
    User.findById(req.params.userId, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'Something went wrong. Try later',
          message: 'Something went wrong. Try later'
        })
      }
  
      const updatedUser = {
        username: req.body.username,
        title: req.body.title,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        postcode: req.body.postcode,
        country: req.body.country,
        city: req.body.city,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        gender: req.body.gender,
        lookingFor: req.body.lookingFor,
        privacyPolicyAccepted: req.body.privacyPolicyAccepted,
        documents: req.body.documents
      }
  
      user = _.extend(user, updatedUser)
  
      user.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: 'Error resetting user details',
            message: 'There has been an issue modifying the user. Retry'
          })
        }
    
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
      })
  
    })
  }

})

router.delete('/:userId', cors.corsWithOptions, verifyToken, (req, res, next) => {

  User.findByIdAndRemove(req.params.userId)
  .then((resp) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(resp) // send response back to the client
  }, err => next(err))
  .catch(err => next(err))
})

// Note: Password is not part of the new User variable; you don't want to simply store sensitive information in the database.
router.post('/signup', cors.corsWithOptions, ValidateData.SignUpValidate, (req, res, next) => {
  const user = new User(req.body)
  user.save((err, user) => {
      if (err) {
          return res.status(400).json({ err: errorHandler(err) })
      }
      user.salt = undefined
      user.hashed_password = undefined
      res.json({ success: true, user, status: 'Registration Successful!' })
  })

})

router.post('/login', cors.corsWithOptions, (req, res) => {
  //find the user based on username
  const { username, password } = req.body
  User.findOne({ username }, (err, user) => {// find based on the username and then either we user or err
    if (err || !user) {
      //res.json({ status: 'Please check your details and try again' })
        return res.json({
          status: 'Please check your details and try again'
        })
    }

    //if user is found make sure username and password match
    // create authenticate method in user module
    if (!user.authenticate(password)) {
      //res.json({ status: 'Username and/or password don\'t match'})
        return res.json({
          status: 'Username and/or password don\'t match'
        })
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id, admin: user.admin }, process.env.JWT_SECRET)
    //persist the token as 't' in cookie with expire date
    res.cookie('t', token, { expire: new Date() + 9999 })
    //return response with user and token to frontend client
    const { _id, firstName, lastName, username, admin } = user
    
    if (admin) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({success: true, token, status: 'You are successfully logged in!', admin: true, user: { _id, firstName, lastName, username, admin }})
    }
    else {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({success: true, token, status: 'You are successfully logged in!', admin: false, user: { _id, firstName, lastName, username, admin }})
    }

  })
})

router.get('/logout', cors.corsWithOptions, (req, res, next) => {
  res.clearCookie('t')
  res.redirect('/login')
  res.json({ message: 'Signout success' })
  
  // req.logout()
  // res.redirect('/login')
})

// Overview Profile section
router.route('/account')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
    User.findOne({ _id: req.user._id })
    .populate('contracts')
    .then((user) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(user)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /account')
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
  res.statusCode = 403
  res.end('PUT operation not supported on /account')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
  res.statusCode = 403
  res.end('DELETE operation not supported on /account')
})

//My profile section
router.route('/account/my-profile')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
    User.findOne({ _id: req.user._id })
    .then((user) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(user)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /account/my-profile')
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    User.findByIdAndUpdate(req.user._id, {
        $set: req.body
    }, { new: true })// the new will return the updated in the reply
    .then((user) => {// populates again with new changes
      User.findById(user._id)
      .then((user) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(user)
      })
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    User.findByIdAndRemove(req.user._id)
    .then((resp) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp) // send response back to the client
    }, (err) => next(err))
    .catch((err) => next(err))
})

// my tenancy section
router.route('/account/my-tenancy')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
    User.findOne({ _id: req.user._id })
    .populate('contracts')
    .then((user) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(user)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /account/my-tenancy')
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
  res.statusCode = 403
  res.end('PUT operation not supported on /account/my-tenancy')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
  res.statusCode = 403
  res.end('DELETE operation not supported on /account/my-tenancy')
})

// contract section
router.route('/account/contract')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
    User.findOne({ _id: req.user._id })
    .populate('contracts')
    .then((user) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(user)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /account/contract')
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
  res.statusCode = 403
  res.end('PUT operation not supported on /account/contract')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken,  (req,res,next) => {
  res.statusCode = 403
  res.end('DELETE operation not supported on /account/contract')
})

//my agent section
router.route('/account/my-agent')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
    User.findOne({ _id: req.user._id })
    .populate('contracts')
    .then((user) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(user)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /account/my-agent')
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
  res.statusCode = 403
  res.end('PUT operation not supported on /account/my-agent')
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
  res.statusCode = 403
  res.end('DELETE operation not supported on /account/my-agent')
})

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id})
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({success: true, token: token, status: 'You are successfully logged in!'})
  }
})

module.exports = router
