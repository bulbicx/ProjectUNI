const express = require('express')
const router = express.Router()

//import controllers
const { accountActivation, forgotPassword, resetPassword } = require('../controllers/auth')

const {
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../validators/auth')

const { runValidation } = require('../validators')

router.post('/account-activation', accountActivation)

// //forgot password
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);

module.exports = router