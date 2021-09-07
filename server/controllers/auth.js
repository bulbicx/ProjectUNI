const User = require('../models/users')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const _ = require('lodash')
const bcrypt = require('bcrypt');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.accountActivation = (req, res) => {
  const { token } = req.body
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          error: 'Expired link. Signup again'
        })
      }

      const { firstName, email, p_validate } = jwt.decode(token)

      const user = new User({ firstName, email, p_validate })

      user.save((err, user) => {
        if (err) {
          console.log('SAVE USER IN ACCOUNT ACTIVATION ERR', err)
          return res.status(401).json({
            error: 'Error saving user in Database. Try signup again'
          })
        }
        return res.json({
          message: 'Signup success. Please sign in'
        })
      })
    })
  }
  else {
    return res.json({
      message: 'Something went wrong signup again'
    })
  }
}


exports.requireSignin = expressJwt({
  secret: process.env.secretKey,
  algorithms: ["HS256"],
})


exports.forgotPassword = (req, res) => {
  const { email } = req.body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exists'
      })
    }

    const token = jwt.sign({ _id: user._id, name: user.firstName}, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' })
    
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password reset link`,
      html: `
        <h1>Please use the following link to reset your password</h1>
        <p>http://localhost:3006/auth/password/reset/${token}</p>
        <hr/>
        <p>This email may contain sensitive information</p>
        <p>http://localhost:3006</p>
      `
    }

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: 'Database connection error on user password'
        })
      }
      else {
        sgMail.send(emailData).then(sent => {
          return res.json({
            message: `Email has been sent to ${email}. Follow the instruction to reset your password`
          })
        })
          .catch(err => {
            return res.json({
            message: err.message
            })
        })
      }
    })
    
  })
}

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body
  
  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (err, user) {
      if (err) {
        return res.status(400).json({
          error: 'Expired link. Try again'
        })
      }

      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'Something went wrong. Try later'
          })
        }

        const updatedFields = {
          password: newPassword,
          resetPasswordLink: ''
        }

        user = _.extend(user, updatedFields)

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: 'Error resetting user password'
            })
          }

          res.json({
            message: `Great! Now you can login with your new password`
          })
        })
      })
    })
  }

}