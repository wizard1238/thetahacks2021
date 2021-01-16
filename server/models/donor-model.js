var mongoose = require('mongoose')

var donorSchema = new mongoose.Schema({
    name: String,
    city: String,
    stateProvince: String,
    country: String,
})

module.exports = new mongoose.Model('donorModel', donorSchema)