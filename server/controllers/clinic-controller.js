var clinicModel = require('../models/donor-model')
var donorModel = require('../models/donor-model')
var hospitalModel = require('../models/hospital-model')

exports.createClinic = function(req, res, next) {
    var clinicName = req.body.name
    var clinicCity = req.body.city
    var clinicStateProvince = req.body.stateProvince
    var clinicCountry = req.body.country
    var clinicStreetAddress = req.body.streetAddress
    var clinicVacancies = req.body.vacancies
    var clinicTreat = req.body.treat

    var clinicLat = req.body.lat
    var clinicLon = req.body.lon
    hospitalModel.findOne({name: hospitalName}, function(err, donor) {
        if (!hospital) { 
            request(`https://us1.locationiq.com/v1/search.php?key=pk.a0ecaa314667144bb2efff2a53442a36&q=${clinicCity}, ${clinicStateProvince}&format=json`, { json: true }, (err, notres, body) => {
                if (err) { return console.log(err); }
                clinicLat = body[0].lat
                clinicLon = body[0].lon

                var clinic = new clinicModel({
                    name: donorName,
                    city: donorCity,
                    stateProvince: donorStateProvince,
                    country: donorCountry,
                    streetAddress: clinicStreetAddress,
                    vacancies: clinicVacancies,
                    treat: clinicTreat,
                    lat: clinicLat,
                    lon: clinicLon
                })
            
                clinic.save()
                res.sendStatus(200)
            });
        }
    })
}


exports.getClinic = function(req, res, next) {
    var clinicName = req.body.name
    
    donorModel.findOne({name: clinicName}, function(err, clinic) {
        if (err) console.log(err)

        res.send(clinic)
    })
}

