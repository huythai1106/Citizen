const router = require('express').Router();
const CitizenController =require('../Controllers/CitizenController');

router.delete('/deletePerson', CitizenController.deletePerson)
router.post('/addPerson', CitizenController.addPerson)
router.put('/:id/changeInfoPerson', CitizenController.changeInfoPerson)
router.get('/:idArea/population', CitizenController.getAllPopulation)
router.get('/:id', CitizenController.infoPerson)
router.get('/', CitizenController.homepage)

module.exports = router