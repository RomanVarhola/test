const { check } = require('express-validator/check');

module.exports = {
  login() {
    return [
      check('email').isEmail().withMessage('Email is missing'),
      check('password').isLength({min: 4}).withMessage('Password is missing or it is too short')
    ];
  },
  register() {
    return [
      check('email').isEmail().withMessage('Email is missing'),
      check('login').withMessage('Login is missing'),
      check('password').isLength({min: 4}).withMessage('Password is missing or it is too short'),
      check('firstName').not().isEmpty().withMessage('First name is missing'),
      check('lastName').not().isEmpty().withMessage('Last name is missing')
    ];
  },
  employer() {
    return [
      check('name').not().isEmpty().withMessage('Name is missing'),
      check('active').not().isEmpty().withMessage('Active is missing'),
      check('departmentId').not().isEmpty().withMessage('Department Id is missing'),
    ];
  }
};
