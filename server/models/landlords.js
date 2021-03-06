var mongoose = require('mongoose')
var Schema = mongoose.Schema

var landlordSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Landlord', landlordSchema)