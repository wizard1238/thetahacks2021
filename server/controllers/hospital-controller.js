var hospitalModel = require('../models/hospital-model')
var request = require('request')

exports.createHospital = function(req, res, next) {
    var hospitalName = req.body.name
    var hospitalCity = req.body.city
    var hospitalStateProvince = req.body.stateProvince
    var hospitalCountry = req.body.country
    var hospitalStreetAddress = req.body.streetAddress
    var hospitalVaccinesNeeded = req.body.vaccinesNeeded
    var hospitalSurgicalMasksNeeded = req.body.surgicalMasksNeeded
    var hospitalN95MasksNeeded = req.body.n95MasksNeeded
    var hospitalFaceShieldsNeeded = req.body.faceShieldsNeeded
    var hospitalSuitsNeeded = req.body.suitsNeeded

    var hospitalLat = req.body.hospitalLat
    var hospitalLon = req.body.hospitalLon
    hospitalModel.findOne({name: hospitalName}, function(err, hospital) {
        if (!hospital) { 
            request(`https://us1.locationiq.com/v1/search.php?key=pk.a0ecaa314667144bb2efff2a53442a36&q=${hospitalCity}, ${hospitalStateProvince}&format=json`, { json: true }, (err, notres, body) => {
                if (err) { return console.log(err); }
                hospitalLat = body[0].lat
                hospitalLon = body[0].lon
                
                var hospital = new hospitalModel({
                    name: hospitalName,
                    city: hospitalCity,
                    stateProvince: hospitalStateProvince,
                    country: hospitalCountry,
                    streetAddress: hospitalStreetAddress,
                    vaccinesNeeded: hospitalVaccinesNeeded,
                    surgicalMasksNeeded: hospitalSurgicalMasksNeeded,
                    n95MasksNeeded: hospitalN95MasksNeeded,
                    faceShieldsNeeded: hospitalFaceShieldsNeeded,
                    suitsNeeded: hospitalSuitsNeeded,
                    lat: hospitalLat,
                    lon: hospitalLon
                })

            hospital.save()
            res.sendStatus(200)

            });
        }
    })
}

exports.getHospital = function(req, res, next) {
    var hospitalName = req.body.name
    
    hospitalModel.findOne({name: hospitalName}, function(err, hospital) {
        if (err) console.log(err)

        res.send(hospital)
    })
}

exports.signInAsHospital = function(req, res, next) {
    var hospitalName = req.body.name

    req.session.hospitalName = hospitalName
}

