const express = require('express');
const router = express.Router();

//controllers
const userCtrl = require('../controllers/user');

//middlewares
const multer = require('../middleware/multer-config');
const { signupRules, validate } = require('../middleware/validator');
const { passwordRules, validatePassword } = require('../middleware/validatorPassword');
const auth = require('../middleware/auth');
const adminUser = require('../middleware/adminUser')

//routes
router.post('/signup', multer, signupRules(), validate, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/me/:id', auth, multer, adminUser, userCtrl.modifyUser);
router.put('/me/:id/password', auth, multer, adminUser, passwordRules(), validatePassword, userCtrl.modifyPassword);
router.delete('/me/:id', auth, adminUser, userCtrl.deleteUser);


module.exports = router;