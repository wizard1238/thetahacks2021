var mongoose = require('mongoose')

var hospitalSchema = mongoose.Schema({
    name: String,
    city: String,
    stateProvince: String,
    country: String,
    streetAddress: String,
    vaccinesNeeded: Number,
    surgicalMasksNeeded: Number,
    n95MasksNeeded: Number,
    faceShieldsNeeded: Number,
    suitsNeeded: Number,
    lat: Number,
    lon: Number
})

module.exports = new mongoose.model('hospitalModel', hospitalSchema)