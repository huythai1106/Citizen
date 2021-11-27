const router = require('express').Router();
const AuthController =require('../Controllers/AuthController');
const verifyToken = require('../Middlewares/verifyToken');

router.delete('/logout', AuthController.logout);
router.delete('/destroy', AuthController.destroy);
router.post('/login', AuthController.login);
router.get('/:id', AuthController.getAccount);
router.post('/register',verifyToken , AuthController.register);


module.exports = router