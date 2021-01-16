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
})

module.exports = new mongoose.Model('hospitalModel', hospitalSchema)