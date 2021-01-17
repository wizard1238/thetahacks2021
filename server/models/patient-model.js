var mongoose = require('mongoose')

var patientSchema = new mongoose.Schema({
    name: String,
    city: String,
    stateProvince: String,
    country: String,
    foundClinic: Boolean,
    problems: {
        type: String,
        enum: ["anorexia", "bulimia", "rumination"]
    },
    lat: Number,
    lon: Number
})

module.exports = new mongoose.model('patientModel', patientSchema)