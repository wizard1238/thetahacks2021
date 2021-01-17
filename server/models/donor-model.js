var mongoose = require('mongoose')

var donorSchema = new mongoose.Schema({
    name: String,
    city: String,
    stateProvince: String,
    country: String,
    vaccinesAvailable: Number,
    vaccinesToDonate: Number,
    surgicalMasksAvailable: Number, 
    surgicalMasksToDonate: Number,
    n95MasksAvailable: Number, 
    n95MasksToDonate: Number,
    faceShieldsAvailable: Number,
    faceShieldsToDonate: Number,
    suitsAvailable: Number,
    suitsToDonate: Number,
    lat: Number,
    lon: Number
})

module.exports = new mongoose.model('donorModel', donorSchema)