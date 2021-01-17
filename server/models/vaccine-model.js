var mongoose = require('mongoose')

var vaccineSchema = new mongoose.Schema({
    name: String,
    city: String,
    stateProvince: String,
    country: String,
    vaccineFirstDoseTaken: Boolean,
    vaccineSecondDoseTaken: Boolean,
    noSymptoms: Boolean,
    symptoms: String,
})

module.exports = new mongoose.model('vaccineModel', vaccineSchema)