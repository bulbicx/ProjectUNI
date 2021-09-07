var mongoose = require('mongoose')
var Schema = mongoose.Schema

var notificationSchema = new Schema({
  type: String,
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


module.exports = mongoose.model('Notifications', notificationSchema)