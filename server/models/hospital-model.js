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
    donors: [{
        donorName: String,
        vaccinesIncoming: Number,
        surgicalMasksIncoming: Number,
        n95MasksIncoming: Number,
        faceShieldsIncoming: Number,
        suitsIncoming: Number,
    }],
    lat: Number,
    lon: Number
})

module.exports = new mongoose.model('hospitalModel', hospitalSchema)