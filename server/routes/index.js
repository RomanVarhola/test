const router = require('express').Router();
const employerRouter = require('./employer.route');
const departmentRouter = require('./department.route');
const authRouter = require('./auth.route');
const requiredAuth = require('../helpers/required.auth.helper');
const errorHandler = require('../helpers/error.builder.helper');

router.use('/api/v1', authRouter);
router.use('/api/v1/employers', requiredAuth, employerRouter);
router.use('/api/v1/departments', requiredAuth, departmentRouter);

router.use(errorHandler);

router.use('*', (req, res, next) => {
  return res.status(404).json({message: 'Not found'});
});

module.exports = router;
