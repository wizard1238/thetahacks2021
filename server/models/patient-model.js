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
    }
})

module.exports = new mongoose.Model('patientModel', patientSchema)