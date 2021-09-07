var mongoose = require('mongoose')
var Schema = mongoose.Schema

var favouriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }]
}, {
    timestamps: true
})


module.exports = mongoose.model('Favourite', favouriteSchema)