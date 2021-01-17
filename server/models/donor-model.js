var mongoose = require('mongoose')

var donorSchema = new mongoose.Schema({
    name: String,
    city: String,
    stateProvince: String,
    country: String,
    vaccinesAvailable: Number,
    surgicalMasksAvailable: Number,
    n95MasksAvailable: Number,
    faceShieldsAvailable: Number,
    suitsAvailable: Number,
})

module.exports = new mongoose.Model('donorModel', donorSchema)