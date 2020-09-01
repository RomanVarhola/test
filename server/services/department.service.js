const db = require('../config/database');

module.exports = {
  async findSome() {
    try {
      return await db.manyOrNone(`select * from departments`);
    } catch (err) {
      throw err;
    }
  },
  async findOne(id) {
    try {
      return await db.oneOrNone(`select * from departments where id=$1`, [id]);
    } catch (err) {
      throw err;
    }
  }
};
