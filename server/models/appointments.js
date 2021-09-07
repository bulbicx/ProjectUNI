var mongoose = require('mongoose')
var Schema = mongoose.Schema

var appointmentSchema = new Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  location: {
    type: String,
    default: 'Room 1'
  }
}, {
  timestamps: true
})


module.exports = mongoose.model('Appointment', appointmentSchema)