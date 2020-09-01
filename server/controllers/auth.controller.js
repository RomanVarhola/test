const passport = require('passport');
const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const sha256 = require('sha256');
const config = require('../config');

module.exports = {
  async getMe(req, res) {
    const user = await userService.findById(req.userId);

    res.status(200).json({result: 'success', data: {login: user.login, email: user.email}});
  },
  checkAccess(req, res, next) {
    res.status(200).json({result: 'success', data: {info: 'Valid token'}});
  },
  login(req, res, next) {
    passport.authenticate('local', {session: true}, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (user) {
        req.login(user, {session: false}, function (err) {
          if (err) return next(err);
          const token = jwt.sign(user, config.secret);
          return res.status(200)
            .json({
              result: 'success',
              message: 'You are signed in!',
              data: {token, user: {login: user.login, email: user.email}}
            });
        });
      } else {
        return res.status(422).json(info);
      }
    })
    (req, res, next);
  },
  async register(req, res, next) {
    try {
      const hashPassword = sha256(req.body.password);
      const data = {...req.body, password: hashPassword};
      const user = await userService.create(data);
      const token = jwt.sign(user, config.secret);
      return res.status(201).json({
        result: 'success',
        message: 'You are registered',
        data: {token, user: {login: user.login, email: user.email}}
      });
    } catch (err) {
      throw next(err);
    }
  }
};
