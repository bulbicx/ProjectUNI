var mongoose = require('mongoose')
var Schema = mongoose.Schema

var feeSchema = new Schema({
    percentage: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Fee', feeSchema)