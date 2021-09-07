//var uniqueValidator = require('mongoose-unique-validator')
var mongoose = require('mongoose')
var Schema = mongoose.Schema
const crypto = require('crypto')
//var passportLocalMongoose = require('passport-local-mongoose')
const uuid = require('uuid')

const documentSchema = new Schema({
    doc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }
})

var User = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    address: String,
    postcode: String,
    country: String,
    city: String,
    phoneNumber: String,
    // p_validate: String,
    hashed_password: {
        type: String,
        required: true  
    },
    salt: String,
    gender: String,
    lookingFor: String,
    privacyPolicyAccepted: Boolean,
    documents: [documentSchema],
    admin: {
        type: Boolean,
        default: false
    },
    resetPasswordLink: {
        data: String,
        default: ''
    },
    facebookId: String
}, {
    timestamps: true
})

User.virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = uuid.v1()
        this.hashed_password = this.encryptPassword( password )
    })
    .get(function () {
    return this._password
    })

User.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
            
        } catch (err) { return '' }

        }
}

module.exports = mongoose.model('User', User)