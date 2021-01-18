var donorModel = require('../models/donor-model')
var hospitalModel = require('../models/hospital-model')
var request = require('request')

var calculateDistance = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

exports.signInAsDonor = function(req, res, next) {
    var donorName = req.body.name

    req.session.donorName = donorName
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
            // request(`https://us1.locationiq.com/v1/search.php?key=pk.a0ecaa314667144bb2efff2a53442a36&q=san jose, california&format=json`, { json: true }, (err, notres, body) => {
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
    
    donorModel.findOne({name: donorName}, function(donorErr, donor) {
        if (err) console.log(err)

        var hospitalSendArray = []

        hospitalModel.find({}, function(hospitalErr, hospitals) {
            for (var hospital of hospitals) {
                if (donor) {
                    for (var donor in hospital.donor) {
                        if (donor.donorName == donorName) {
                            hospitalSendArray.push({
                                hospitalName: hospital.name,
                                hospitalCity: hospital.city,
                                hospitalStateProvince: hospital.stateProvince,
                                hospitalStreetAddress: hospital.streetAddress,
                                ...donor,
                            })

                            break
                        }
                    }
                }                
            }
        })

        res.send({
            donor: donor,
            hospitals: hospitalSendArray
        })
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
                
                var loopCounter = 0
                for (var hospital of hospitalsArray) {
                    //vaccine
                    if (hospital.vaccinesNeeded > 0 && donor.vaccinesAvailable > 0) {
                        var numberOfVaccinesToDonate = 0
                        while (donor.vaccinesAvailable > 0 && hospital.vaccinesNeeded > 0) {
                            donor.vaccinesAvailable--
                            donor.vaccinesToDonate++
                            hospitalArray[loopCounter].vaccinesNeeded--
                            hospitalArray[loopCounter].vaccinesIncoming++
                            hospital.vaccinesNeeded--
                            hospital.vaccinesIncoming++
                            numberOfVaccinesToDonate++
                        }

                        hospital.numberOfVaccinesToDonate = numberOfVaccinesToDonate
                    }

                    //surgical masks
                    if (hospital.surgicalMasksNeeded > 0 && donor.surgicalMasksAvailable> 0) {
                        var numberOfSurgicalMasksToDonate = 0
                        while (donor.surgicalMasksAvailable > 0 && hospital.surgicalMasksNeeded > 0){
                            donor.surgicalMasksAvailable--
                            donor.surgicalMasksToDonate++
                            hospitalArray[loopCounter].surgicalMasksNeeded--
                            hospitalArray[loopCounter].surgicalMasksIncoming++
                            hospital.surgicalMasksNeeded--
                            hospita.surgicalMasksIncoming++
                            numberOfSurgicalMasksToDonate++
                        }

                        hospital.numberOfSurgicalMasksToDonate = numberOfSurgicalMasksToDonate
                    }

                    //n95
                    if (hospital.n95MasksNeeded > 0 && donor.n95MasksAvailable > 0) {
                        var numberOfN95MasksToDonate = 0
                        while (donor.n95MasksAvailable > 0 && hospital.n95MasksNeeded > 0){
                            donor.n95MasksAvailable--
                            donor.n95MasksToDonate++
                            hospitalArray[loopCounter].n95MasksNeeded--
                            hospitalArray[loopCounter].n95MasksIncoming++
                            hospital.n95MasksNeeded--
                            hospital.n95MasksIncoming++
                            numberOfN95MasksToDonate++
                        }

                        hospital.numberOfN95MasksToDonate = numberOfN95MasksToDonate
                    }

                    //face shield
                    if (hospital.faceShieldsNeeded > 0 && donor.faceShieldsAvailable > 0) {
                        var numberOfFaceShieldsToDonate = 0
                        while (donor.faceShieldsAvailable > 0 && hospital.faceShieldsNeeded > 0){
                            donor.faceShieldsAvailable--
                            donor.faceShieldsToDonate++
                            hospitalArray[loopCounter].faceShieldsNeeded--
                            hospitalArray[loopCounter].faceShieldsIncoming++
                            hospital.faceShieldsNeeded--
                            hospital.faceShieldsIncoming++
                            numberOfFaceShieldsToDonate++
                        }

                        hospital.numberOfFaceShieldsToDonate = numberOfFaceShieldsToDonate
                    }

                    //suits
                    if (hospital.suitsNeeded > 0 && donor.suitsAvailable > 0) {
                        var numberOfSuitsToDonate = 0
                        while (donor.suitsAvailable > 0 && hospital.suitsNeeded > 0){
                            donor.suitsAvailable--
                            donor.suitsToDonate++
                            hospitalArray[loopCounter].suitsNeeded--
                            hospitalArray[loopCounter].suitsIncoming++
                            hospital.suitsNeeded--
                            hospital.suitsIncoming++
                            numberOfSuitsToDonate++
                        }

                        hospital.numberOfSuitsToDonate = numberOfSuitsToDonate
                    }

                    hospitalArray[loopCounter].save()
                    loopCounter++
                }
                
                donor.save()
                res.send(hospitalArray)
            })
        } else {
            res.sendStatus(400)
        }
    })
}

exports.donated = function(req, res, next) { //Apply staging
    //loop through hospital array, update hospital model

    /*
    hospitalModel.find({}, function(err, hospital) {
       hospital.vaccinesNeeded -= req.body.hospitalArray[]
    })*/
    for (var hospitals in req.body.hospitalArray){
        hospitalModel.find({name: hospitalArray[hospitals].name}, function(err, hospital){
            hospital.vaccinesNeeded -= hospitalArray[hospitals].vaccinesIncoming
        })
    }
    
    //vaccines


    res.sendStatus(200) //if success
    res.sendStatus(400) //if fail
    
    
}