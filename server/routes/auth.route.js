const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const customValidator = require('../helpers/custom.validator.helper');
const requiredAuth = require('../helpers/required.auth.helper');
const validationHandler = require('../helpers/validation.handler');

router.get('/me', requiredAuth, authController.getMe);
router.get('/check_access', requiredAuth, authController.checkAccess);
router.post('/login', customValidator.login(), validationHandler, authController.login);
router.post('/register', customValidator.register(), validationHandler, authController.register);

module.exports = router;
