var mongoose = require('mongoose')

var hospitalSchema = mongoose.Schema({
    name: String,
    city: String,
    stateProvince: String,
    country: String,
    streetAddress: String,
    vaccinesNeeded: Number,
    vaccinesIncoming: Number,
    surgicalMasksNeeded: Number,
    surgicalMasksIncoming: Number,
    n95MasksNeeded: Number,
    n95MasksIncoming: Number,
    faceShieldsNeeded: Number,
    faceShieldsIncoming: Number,
    suitsNeeded: Number,
    suitsIncoming: Number,
    lat: Number,
    lon: Number
})

module.exports = new mongoose.model('hospitalModel', hospitalSchema)