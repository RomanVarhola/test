const router = require('express').Router();

const departmentController = require('../controllers/department.controller');

router.get('/', departmentController.getSome);

module.exports = router;
