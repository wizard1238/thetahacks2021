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
    }
})

module.exports = new mongoose.Model('clinicModel', clinicSchema)