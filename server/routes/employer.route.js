const router = require('express').Router();

const employerController = require('../controllers/employer.controller');
const customValidator = require('../helpers/custom.validator.helper');
const validationHandler = require('../helpers/validation.handler');

router.get('/', employerController.getSome);
router.get('/:id', employerController.getOne);
router.post('/', customValidator.employer(), validationHandler, employerController.create);
router.put('/:id', customValidator.employer(), validationHandler, employerController.update);
router.delete('/:id', employerController.delete);

module.exports = router;
