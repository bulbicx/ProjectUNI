const mongoose = require('mongoose')
const Schema = mongoose.Schema


const saleSchema = new Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    fee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fee'
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

var Sales = mongoose.model('Sale', saleSchema)

module.exports = Sales