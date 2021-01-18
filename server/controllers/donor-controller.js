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
                if (body[0]) {
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
                } else {
                    res.status(400).send('There was an error')
                }
            });
        } else {
            res.status(400).send("Donor already registered")
        }
    })
    
}

exports.getDonor = function(req, res, next) {
    var donorName = req.body.name
    
    donorModel.findOne({name: donorName}, function(donorErr, returnedDonor) {
        if (donorErr) console.log(donorErr)

        var hospitalSendArray = []

        hospitalModel.find({}, function(hospitalErr, hospitals) {
            for (var hospital of hospitals) {
                
                if (returnedDonor) {
                    
                    for (var donor of hospital.donors) {
                        if (donor.donorName == donorName) {
                            hospitalSendArray.push({
                                hospitalName: hospital.name,
                                hospitalCity: hospital.city,
                                hospitalStateProvince: hospital.stateProvince,
                                hospitalStreetAddress: hospital.streetAddress,
                                donorName: donor.donorName,
                                vaccinesIncoming: donor.vaccinesIncoming,
                                surgicalMasksIncoming: donor.surgicalMasksIncoming,
                                n95MasksIncoming: donor.n95MasksIncoming,
                                faceShieldsIncoming: donor.faceShieldsIncoming,
                                suitsIncoming: donor.suitsIncoming,
                            })

                            break
                        }
                    }
                }                
            }
            
            res.send({
                donor: returnedDonor,
                hospitals: hospitalSendArray,
            })
        })
    })
}

exports.matchDonorWithHospital = function(req, res, next) {
    var donorName = req.body.name

    donorModel.findOne({name: donorName}, function(donorErr, donor) {
        if (donor) {
            hospitalModel.find({}, function(hospitalErr, hospitals) {
                var hospitalsArray = []    
                var hospitalIndexes = {}

                for (var i in hospitals) {
                    hospitalIndexes[hospitals[i].name] = i
                    hospitalsArray.push({
                        ...hospitals[i]._doc,
                        distance: calculateDistance(donor.lon, donor.lat, hospitals[i].lon, hospitals[i].lat)
                    })
                }
                
                hospitalsArray.sort(function(a, b) {
                    return a.distance - b.distance
                })
                
                var loopCounter = 0
                for (var hospital of hospitalsArray) {
                    var donorIndexes = {}

                    if (hospitals[hospitalIndexes[hospital.name]].donors.length != 0) {
                        for (var i in hospitals[hospitalIndexes[hospital.name]].donors) {
                            donorIndexes[hospitals[hospitalIndexes[hospital.name]].donors[i].donorName] = i
                        }
                        if (!donorIndexes[donorName]) {
                            var tempLength = hospital.donors.length

                            donorIndexes[donorName] = tempLength
                            hospital.donors.push({
                                donorName: donorName,
                                vaccinesIncoming: 0,
                                surgicalMasksIncoming: 0,
                                n95MasksIncoming: 0,
                                faceShieldsIncoming: 0,
                                suitsIncoming: 0,
                            })
                        }
                    } else {
                        donorIndexes[donorName] = 0
                        hospitals[hospitalIndexes[hospital.name]].donors.push({
                            donorName: donorName,
                            vaccinesIncoming: 0,
                            surgicalMasksIncoming: 0,
                            n95MasksIncoming: 0,
                            faceShieldsIncoming: 0,
                            suitsIncoming: 0,
                        })
                    }

                    //vaccine
                    if (hospitalsArray[loopCounter].vaccinesNeeded > 0 && donor.vaccinesAvailable > 0) {
                        while (donor.vaccinesAvailable > 0 && hospitalsArray[loopCounter].vaccinesNeeded > 0) {
                            donor.vaccinesAvailable--
                            hospitalsArray[loopCounter].vaccinesNeeded--
                            hospitals[hospitalIndexes[hospital.name]].donors[donorIndexes[donorName]].vaccinesIncoming++
                        }
                    }
                    //surgical masks
                    if (hospitalsArray[loopCounter].surgicalMasksNeeded > 0 && donor.surgicalMasksAvailable> 0) {
                        while (donor.surgicalMasksAvailable > 0 && hospitalsArray[loopCounter].surgicalMasksNeeded > 0){
                            donor.surgicalMasksAvailable--
                            hospitalsArray[loopCounter].surgicalMasksNeeded--
                            hospitals[hospitalIndexes[hospital.name]].donors[donorIndexes[donorName]].surgicalMasksIncoming++
                        }
                    }

                    //n95
                    if (hospitalsArray[loopCounter].n95MasksNeeded > 0 && donor.n95MasksAvailable > 0) {
                        while (donor.n95MasksAvailable > 0 && hospitalsArray[loopCounter].n95MasksNeeded > 0){
                            donor.n95MasksAvailable--
                            hospitalsArray[loopCounter].n95MasksNeeded--
                            hospitals[hospitalIndexes[hospital.name]].donors[donorIndexes[donorName]].n95MasksIncoming++
                        }
                    }
                    //face shield
                    if (hospitalsArray[loopCounter].faceShieldsNeeded > 0 && donor.faceShieldsAvailable > 0) {
                        while (donor.faceShieldsAvailable > 0 && hospitalsArray[loopCounter].faceShieldsNeeded > 0){
                            donor.faceShieldsAvailable--
                            hospitalsArray[loopCounter].faceShieldsNeeded--
                            hospitals[hospitalIndexes[hospital.name]].donors[donorIndexes[donorName]].faceShieldsIncoming++
                        }
                    }
                    //suits
                    if (hospitalsArray[loopCounter].suitsNeeded > 0 && donor.suitsAvailable > 0) {
                        while (donor.suitsAvailable > 0 && hospitalsArray[loopCounter].suitsNeeded > 0){
                            donor.suitsAvailable--
                            hospitalsArray[loopCounter].suitsNeeded--
                            hospitals[hospitalIndexes[hospital.name]].donors[donorIndexes[donorName]].suitsIncoming++
                        }
                    }

                    loopCounter++
                }

                for (hospital of hospitals) {
                    hospital.save()
                }
                donor.save()
                res.sendStatus(200)
            })
        } else {
            res.sendStatus(400)
        }
    })
}

exports.donated = function(req, res, next) { //Apply staging
    var donorName = req.body.name
    
    hospitalModel.find({}, function(err, hospitals) {
       for (var hospital of hospitals) {
            if (hospital.donors) {
                for (var donor of hospital.donors) {    
                    if (donor.donorName == donorName) {
                        hospital.vaccinesNeeded -= donor.vaccinesIncoming
                        donor.vaccinesIncoming = 0

                        hospital.surgicalMasksNeeded -= donor.surgicalMasksIncoming
                        donor.surgicalMasksIncoming = 0

                        hospital.n95MasksNeeded -= donor.n95MasksIncoming
                        donor.n95MasksIncoming = 0

                        hospital.faceShieldsNeeded -= donor.faceShieldsIncoming
                        donor.faceShieldsIncoming = 0

                        hospital.suitsNeeded -= donor.suitsIncoming
                        donor.suitsIncoming = 0
                    }
                }
            }   
            hospital.save()
        }
    })
    
    res.sendStatus(200)
}