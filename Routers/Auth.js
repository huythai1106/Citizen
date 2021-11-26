const router = require('express').Router();
const AuthController =require('../Controllers/AuthController')

router.delete('/logout', AuthController.logout);
router.delete('/destroy', AuthController.destroy);
router.post('/login', AuthController.login);
router.get('/:id', AuthController.getAccount);
router.post('/register', AuthController.register);


module.exports = router