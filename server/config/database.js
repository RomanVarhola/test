const promise = require('bluebird');
const postgresql = require('pg-promise');

const config = {
  host: '127.0.0.1',
  port: 5432,
  database: 'employer',
  user: 'crypto_user',
  password: 'WelL#well@DDj51$',
};

const pgp = postgresql({ promiseLib: promise });

module.exports = pgp(config);
