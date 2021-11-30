const router = require('express').Router();
const CitizenController =require('../Controllers/CitizenController');

router.put('/:id/changeInfoPerson', CitizenController.changeInfoPerson)
router.get('/:idArea/population', CitizenController.getAllPopulation)
router.delete('/:id/deletePerson', CitizenController.deletePerson)
router.post('/addPerson', CitizenController.addPerson)
router.get('/:id/infomation', CitizenController.infoPerson)
router.get('/searchPerson', CitizenController.searchPerson)
router.get('/', CitizenController.homepage)

module.exports = router