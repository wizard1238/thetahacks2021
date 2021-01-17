var donorModel = require('../models/donor-model')
var hospitalModel = require('../models/hospital-model')
var request = require('request')

var calculateDistance = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

exports.createDonor = function(req, res, next) {
    var donorName = req.body.name
    var donorCity = req.body.city
    var donorStateProvince = req.body.stateProvince
    var donorCountry = req.body.country
    var donorVaccinesAvailable = req.body.vaccinesAvailable
    var donorSurgicalMasksAvailable = req.body.surgicalMasksAvailable
    var donorN95MasksAvailable = req.body.n95MasksAvailable
    var donorFaceShieldsAvailable = req.body.faceShieldsAvailable
    var donorSuitsAvailable = req.body.suitsAvailable
    
    var donorLat
    var donorLon

    donorModel.findOne({name: donorName}, function(err, donor) {
        if (!donor) { //if no donor is founnd
            request(`https://us1.locationiq.com/v1/search.php?key=pk.a0ecaa314667144bb2efff2a53442a36&q=${donorCity}, ${donorStateProvince}&format=json`, { json: true }, (err, notres, body) => {
                if (err) { return console.log(err); }
                donorLat = body[0].lat
                donorLon = body[0].lon
        
                var donor = new donorModel({
                    name: donorName,
                    city: donorCity,
                    stateProvince: donorStateProvince,
                    country: donorCountry,
                    vaccinesAvailable: donorVaccinesAvailable,
                    surgicalMasksAvailable: donorSurgicalMasksAvailable,
                    n95MasksAvailable: donorN95MasksAvailable,
                    faceShieldsAvailable: donorFaceShieldsAvailable,
                    suitsAvailable: donorSuitsAvailable,
                    lat: donorLat,
                    lon: donorLon,
                })
            
                donor.save()
                res.sendStatus(200)
            });
        } else {
            res.status(400).send("Donor already registered")
        }
    })
    
}

exports.getDonor = function(req, res, next) {
    var donorName = req.body.name
    
    donorModel.findOne({name: donorName}, function(err, donor) {
        if (err) console.log(err)

        res.send(donor)
    })
}

exports.matchDonorWithHospital = function(req, res, next) {
    var donorName = req.body.name

    donorModel.findOne({name: donorName}, function(donorErr, donor) {
        if (!donor) {
            hospitalModel.find({}, function(hospitalErr, hospitals) {
                var hospitalArray = []
    
                for (var hospital of hospitals) {
                    hospitalArray.push({
                        ...hospital,
                        distance: calculateDistance(donor.lon, donor.lat, hospital.lon, hospital.lat)
                    })
                }
    
                hospitalArray.sort(function(a, b) {
                    return a.distance - b.distance
                })
    
                res.send(hospitalArray)
            })
        } else {
            res.sendStatus(400)
        }
    })
}