var vaccineModel = require('../models/vaccine-model')

exports.createVaccinePatient = function(req, res, next) {
    var patientName = req.body.name
    var patientCity = req.body.city
    var patientStateProvince = req.body.stateProvince
    var patientCountry = req.body.country
    var patientVaccineFirstDoseTaken = req.body.vaccineFirstDoseTaken
    var patientVaccineSecondDoseTaken = req.body.vaccineSecondDoseTaken
    var patientNoSymptoms = req.body.noSymptoms
    var patientSymptoms = req.body.symptoms

    var patient = new vaccineModel({
        name: patientName,
        city: patientCity,
        stateProvince: patientStateProvince,
        country: patientCountry,
        vaccineFirstDoseTaken: patientVaccineFirstDoseTaken,
        vaccineSecondDoseTaken: patientVaccineSecondDoseTaken,
        noSymptoms: patientNoSymptoms,
        symptoms: patientSymptoms,
    })

    patient.save()
    res.sendStatus(200)
}

exports.getVaccinePatient = function(req, res, next) {
    var patientName = req.body.name

    vaccineModel.find({name: patientName}, function(err, patient) {
        if (err) console.log(err)
        res.send(patient)
    })
}

exports.updateSymptons = function(req, res, next) {
    patient.symptons = req.body.symptons
}

exports.getVaccinePatients = function(req, res, next) {
    vaccineModel.find({}, function(err, patients) {
        if (err) console.log(err)
        res.send(patients)
    })
}