const mongoose = require('mongoose')
const Schema = mongoose.Schema


const reviewSchema = new Schema({
    landlordRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    propertyRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    reviewBody: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }
}, {
    timestamps: true
})

var Reviews = mongoose.model('Review', reviewSchema)

module.exports = Reviews