var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('./models/users')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

const expressJwt = require('express-jwt') // authorization check
var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
var FacebookTokenStrategy = require('passport-facebook-token')

// var config = require('./config')
require('dotenv').config()
const config = process.env

//exports.local = passport.use(new LocalStrategy(User.authenticate()))
//passport.serializeUser(User.serializeUser())
//passport.deserializeUser(User.deserializeUser())

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: '1d'})
}

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secretKey

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload)
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false)
            }
            else if (user) {
                return done(null, user)
            }
            else {
                return done(null, false)
            }
        })
    }))

// exports.verifyUser = passport.authenticate('jwt', {session: false})
// exports.verifyAdmin = (req, res, next) => {
//     if (req.user.admin) {
//         next(); 
//     } 
//     else{
//         var err = new Error('You are not authorized to perform this operation!')
//         err.status = 403
//         next(err)
//     }
// }

exports.requireSignin = expressJwt({
    secret: config.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
});

exports.verifyUser = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        })

    }
    
    next()
}

exports.verifyAdmin = (req, res, next) => {
    console.log(req.user)
    if (!req.user.admin) {
        return res.status(403).json({
            error: 'Admin resource! Access denied!'
        })
    }

    next()
}

exports.verifyToken = function (req, res, next) {
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // if (token == null) return res.sendStatus(401)
    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) {
            res.clearCookie('t')
            res.redirect('/login')
            // localStorage.removeItem('token')
            // localStorage.removeItem('user')
            // localStorage.removeItem('admin')
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    // clientID: config.facebook.clientId,
    // clientSecret: config.facebook.clientSecret
    clientID: config.fclientId,
    clientSecret: config.fclientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false)
        }
        if (!err && user !== null) {
            return done(null, user)
        }
        else {
            user = new User({ username: profile.displayName })
            user.facebookId = profile.id
            user.firstName = profile.name.givenName
            user.lastName = profile.name.familyName
            user.save((err, user) => {
                if (err)
                    return done(err, false)
                else
                    return done(null, user)
            })
        }
    })
}
))