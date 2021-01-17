var mongoose = require('mongoose')

var clinicSchema = new mongoose.Schema({
    name: String,
    description: String,
    city: String,
    stateProvince: String,
    country: String,
    streetAddress: String,
    vacancies: Number,
    treat: {
        type: String,
        enum: ["anorexia", "bulimia", "rumination"]
    },
    lat: Number,
    lon: Number
})

module.exports = new mongoose.model('clinicModel', clinicSchema)