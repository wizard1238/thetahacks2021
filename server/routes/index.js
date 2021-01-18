var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.send("hello world")
});

var donorController = require('../controllers/donor-controller')
router.post('/api/signInAsDonor', donorController.signInAsDonor)
router.post('/api/createDonor', donorController.createDonor)
router.post('/api/getDonor', donorController.getDonor)
router.post('/api/matchDonorWithHospital', donorController.matchDonorWithHospital)
router.post('api/donated', donorController.donated)

var clinicController = require('../controllers/clinic-controller')
router.post('/api/createClinic', clinicController.createClinic)
router.post('/api/getClinic', clinicController.getClinic)

var hospitalController = require('../controllers/hospital-controller')
router.post('/api/createHospital', hospitalController.createHospital)
router.post('/api/getHospital', hospitalController.getHospital)
router.post('/api/signInAsHospital', hospitalController.signInAsHospital)

var patientController = require('../controllers/patient-controller')
router.post('/api/createPatient', patientController.createPatient)
router.post('/api/getPatient', patientController.getPatient)
router.post('/api/matchPatientWithClinic',patientController.matchPatientWithClinic)

var vaccineController = require('../controllers/vaccine-controller')
router.post('/api/createVaccinePatient', vaccineController.createVaccinePatient)
router.post('/api/getVaccinePatient', vaccineController.getVaccinePatient)
router.post('/api/updateSymptons', vaccineController.updateSymptons)
router.post('/api/getVaccinePatients', vaccineController.getVaccinePatients)

module.exports = router;
