const router = require('express').Router();
const CitizenController =require('../Controllers/CitizenController');


router.get('/population', CitizenController.getAllPopulation)
router.get('/:id', CitizenController.infoPerson)
router.get('/', CitizenController.homepage)

module.exports = router