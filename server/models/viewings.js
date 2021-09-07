var mongoose = require('mongoose')
var Schema = mongoose.Schema

var viewingSchema = new Schema({
    date: Date,
    time:  String,
    user: {
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


module.exports = mongoose.model('Viewing', viewingSchema)