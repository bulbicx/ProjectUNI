var mongoose = require('mongoose')
var Schema = mongoose.Schema


var contractSchema = new Schema({
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    document: { 
        type: String
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Contract', contractSchema)
