const router = require('express').Router();
const CitizenController =require('../Controllers/CitizenController');


router.get('/', CitizenController.homepage)

module.exports = router