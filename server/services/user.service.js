const db = require('../config/database');

module.exports = {
  async findByEmailAndPassword(email, password) {
    try {
      return await db.oneOrNone('select * from users where email=$1 and password=$2', [email, password]);
    } catch (err) {
      throw err;
    }
  },
  async findById(id) {
    try {
      return await db.oneOrNone('select * from users where id=$1', [id]);
    } catch (err) {
      throw err;
    }
  },
  async create(data) {
    try {
      const { login, email, firstName, lastName, password } = data;
      return await db.one('insert into users(login, email, first_name, last_name, password) values($1, $2, $3, $4, $5) RETURNING *',
        [login, email, firstName, lastName, password]);
    } catch (err) {
      throw err;
    }
  }
};
