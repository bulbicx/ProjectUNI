const express = require('express')
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// var authenticate = require('../authenticate')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

var Favourites = require('../models/favourites')

const favouriteRouter = express.Router()

// favouriteRouter.use(bodyParser.json())

favouriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, requireSignin, verifyToken, (req, res, next) => {
        if (req.user.admin) {
            Favourites.find({ })
            .populate('user')
            .populate('properties')
            .then((favourites) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(favourites)
            }, (err) => next(err))
            .catch((err) => next(err))
        }
        else {
            Favourites.findOne({ user: req.user._id })
            .populate('user')
            .populate('properties')
            .then((favourites) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(favourites)
            }, (err) => next(err))
            .catch((err) => next(err))
        }
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    Favourites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite) {
            for (var i=0; i<req.body.length; i++) {
                if (favorite.properties.indexOf(req.body[i]._id) === -1) {
                    favorite.properties.push(req.body[i]._id)
                }
            }
            favorite.save()
            .then((favorite) => {
                Favourites.findById(favorite._id)
                .populate('user')
                .populate('properties')
                .then((favorite) => {
                    res.statusCode = 200
                    res.setHeader("Content-Type", "application/json")
                    res.json(favorite)
                })
            }, (err) => next(err))
        }
        else {
            Favourites.create({"user": req.user._id, "properties": req.body})
            .then((favorite) => {
                Favourites.findById(favorite._id)
                .populate('user')
                .populate('properties')
                .then((favorite) => {
                    res.statusCode = 200
                    res.setHeader("Content-Type", "application/json")
                    res.json(favorite)
                })
            }, (err) => next(err))
        }
    }, (err) => next(err))
    .catch((err) => next(err))
}) 
.put(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /my-favourites")
}) 
.delete(cors.corsWithOptions, requireSignin, verifyToken, (req,res,next) => {
    Favourites.findOne({ user: req.user._id })
    .then((favorite) => {
    if (favorite !== null) {
        favorite.remove((err, favorite) => {
        if (!err) {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.json(favorite)
        } else {
            return next(err)
        }
        })
    } 
    else {
        var err = new Error("You do not have any favorites")
        err.staus = 403
        return next(err)
    }
    })
    .catch((err) => next(err))
})

favouriteRouter.route("/:propertyId")
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, (req,res,next) => {
    Favourites.findOne({user: req.user._id})
    .then((favourites) => {
        if(!favourites) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            return res.json({"exists": false, "favourites": favourites})
        }
        else { //if that particular property does not exist
            if(favourites.properties.indexOf(req.params.propertyId) < 0) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                return res.json({"exists": false, "favourites": favourites})
            }
            else { //if it exists
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                return res.json({"exists": true, "favourites": favourites})
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, requireSignin, verifyToken, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then(favourite => {
        //check if favourite list already exists
        if (favourite !== null) {
            //check if property does already exists
            if (favourite.properties.indexOf(req.params.propertyId) < 0) {
                favourite.properties.push(req.params.propertyId)
                favourite.save((err, favourite) => {
                    if (!err) {
                        Favourites.findById(favourite._id)
                        .populate('user')
                        .populate('properties')
                        .then(favourite => {
                            res.statusCode = 200
                            res.setHeader("Content-Type", "application/json")
                            res.json(favourite)
                        })
                    } else {
                        return next(err)
                    }
                })
            }
            else {
                var err = new Error("Property already exists in your favourite list");
                err.status = 403;
                return next(err);
            }
        }
        else {
            //since favourite does not exist create one
            const properties = [req.params.propertyId]
            Favourites.create({ user: req.user._id, properties: properties})
            .then(
                (favourite) => {
                    Favourites.findById(favourite._id)
                    .populate('user')
                    .populate('properties')
                    .then(favourite => {
                        res.statusCode = 200
                        res.setHeader("Content-Type", "application/json")
                        res.json(favourite)
                    })
                },
                (err) => next(err)
            )
            .catch(err => next(err))
        }
    })
    .catch(err => next(err))
})
.delete(cors.corsWithOptions, requireSignin, verifyToken, (req, res, next) => {
    Favourites.findOne({ user: req.user._id })
        .then((favorite) => {
        if (favorite !== null) {
            //Check if the property exists in the favorite list 
            if (favorite.properties.indexOf(req.params.propertyId) < 0) {
                var err = new Error("Property doesnt exist in your favorites list")
                err.staus = 403
                return next(err)
            } 
            else {
                // Removing property from the favorite list using Array.splice() method
                var index = favorite.properties.indexOf(req.params.propertyId)
                favorite.properties.splice(index, 1)

                favorite.save((err, favorite) => {
                    if (!err) {
                    Favourites.findById(favorite._id)
                        .then((favorite) => {
                            res.statusCode = 200
                            res.setHeader("Content-Type", "application/json")
                            res.json(favorite)
                        })
                    } 
                    else {
                        return next(err)
                    }
                })
            }
        } 
        else {
            var err = new Error("You do not have any favorites")
            err.status = 403
            return next(err)
        }
    })
    .catch((err) => next(err))
})

module.exports = favouriteRouter