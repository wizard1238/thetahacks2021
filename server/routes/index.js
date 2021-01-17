var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello world")
});

var donorController = require('../controllers/donor-controller')
router.post('/createDonor', donorController.createDonor)
router.post('/getDonor', donorController.getDonor)
module.exports = router;
