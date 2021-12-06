const router = require('express').Router();
const AuthController = require('../Controllers/AuthController');
const verifyToken = require('../Middlewares/verifyToken');
const checkStatus = require('../Middlewares/checkStatus');
const checkRequestTime = require('../Middlewares/checkRequestTime');

router.delete('/:subId/deleteAccount',verifyToken , AuthController.destroy);
router.patch('/changeStatus' ,verifyToken , checkStatus, checkRequestTime, AuthController.changeStatus);
router.patch('/changePassword', verifyToken , AuthController.changePassword);
router.post('/login', AuthController.login);
router.get('/:id/getAllAccount',verifyToken ,AuthController.getAccount);
router.post('/register',verifyToken , AuthController.register);
router.post('/registerAdmin', AuthController.registerAdmin);
router.get('/', AuthController.homepage)


module.exports = router