var mongoose = require('mongoose')
var Schema = mongoose.Schema

var offerSchema = new Schema({
  offerSum: Number,
  moveInDate: Date,
  moveOutDate: Date,
  accepted: {
    type: Boolean,
    default: false
  },
  onHold: {
    type: Boolean,
    default: false
  },
  declined: {
    type: Boolean,
    default: false
  },
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


module.exports = mongoose.model('Offer', offerSchema)