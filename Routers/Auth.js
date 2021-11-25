const router = require('express').Router();
const AuthController =require('../Controllers/AuthController')

router.delete('/logout', AuthController.logout);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/', AuthController.homepage);


module.exports = router