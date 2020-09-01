const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('../services/user.service');

async function requiredAuth(req, res, next) {
  try {
    const token = fromAuthHeaderAsBearerToken(req) || null;
    if (!token) {
      return res.status(401).json({result: 'failure', message: 'Token is missing'});
    }
    const decoded = await jwt.verify(token, config.secret);

    const user = await userService.findById(decoded.id);
    if (!user) {
      return res.status(401).json({result: 'failure', message: 'Token is wrong'});
    }
    req.userId = user.id;
    return next();
  } catch (err) {
    err.message = 'Token is missing';
    throw next(err);
  }
}

function fromAuthHeaderAsBearerToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

module.exports = requiredAuth;
