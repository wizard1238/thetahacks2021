var clinicModel = require('../models/donor-model')
var donorModel = require('../models/donor-model')
var hospitalModel = require('../models/hospital-model')
var patientModel = require('../models/patient-model')

var calculateDistance = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

exports.createPatient = function(req, res, next) {
    var patientName = req.body.name
    var patientCity = req.body.city
    var patientStateProvince = req.body.stateProvince
    var patientCountry = req.body.country
    var paitentFoundClinic = req.body.foundClinic
    var patientProblems = req.body.problems

    var patientLat = req.body.lat
    var patientLon = req.body.lon
    
    hospitalModel.findOne({name: hospitalName}, function(err, donor) {
        if (!hospital) { 
            request(`https://us1.locationiq.com/v1/search.php?key=pk.a0ecaa314667144bb2efff2a53442a36&q=${patientCity}, ${patientStateProvince}&format=json`, { json: true }, (err, notres, body) => {
                if (err) { return console.log(err); }
                patientLat = body[0].lat
                patientLon = body[0].lon

                var patient = new patientModel({
                    name: patientName,
                    city: patientCity,
                    stateProvince: patientStateProvince,
                    country: patientCountry,
                    foundClinic: paitentFoundClinic,
                    problems: patientProblems,
                    lat: patientLat,
                    lon: patientLon
                })
            
                clinic.save()
                res.sendStatus(200)
            });
        }
    })
}


exports.getPatient = function(req, res, next) {
    var patientName = req.body.name
    
    patientModel.findOne({name: patientName}, function(err, clinic) {
        if (err) console.log(err)

        res.send(patient)
    })
}

exports.matchPatientWithClinic = function(req, res, next) {
    var patientName = req.body.name

    patientModel.findOne({name: patientName}, function(patientrErr, patient) {
        if(!patient) {
            hospitalModel.find({treat: patient.problems}, function(clinicErr, clinic) {
                var clinicArray = []
    
                for (var clinic of clinics) {
                    clinicArray.push({
                        ...clinic,
                        distance: calculateDistance(patient.lon, patient.lat, clinic.lon, clinic.lat)
                    })
                }
    
                clinicArray.sort(function(a, b) {
                    return a.distance - b.distance
                })
    
                res.send(clinicArray)
            })
        } else {
            res.sendStatus(400)
        }
    })
}