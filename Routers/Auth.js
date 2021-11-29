const router = require('express').Router();
const AuthController = require('../Controllers/AuthController');
const verifyToken = require('../Middlewares/verifyToken');
const checkRoleUser = require('../Middlewares/checkRoleUser');

router.patch('/changeStatus' ,verifyToken , checkRoleUser, AuthController.changeStatus);
router.patch('/changePassword', verifyToken , AuthController.changePassword);
router.delete('/logout', AuthController.logout);
router.delete('/destroy',verifyToken , AuthController.destroy);
router.post('/login', AuthController.login);
router.get('/:id',verifyToken ,AuthController.getAccount);
router.post('/register',verifyToken , AuthController.register);
router.post('/registerAdmin', AuthController.registerAdmin);
router.get('/', AuthController.homepage)


module.exports = router