const db = require('../config/database');

module.exports = {
  async findSome(page, limit, search) {
    try {
      return await db.manyOrNone(`select employers.id, employers.name, active, departments.name as "departmentName"
        from employers inner join departments on departments.id=employers.department_id
        WHERE employers.name LIKE $3
        order by employers.id desc offset $1 rows fetch next $2 rows only`, [limit * (page - 1), limit, `${search}%`]);
    } catch (err) {
      throw err;
    }
  },
  async findOne(id) {
    try {
      return await db.oneOrNone(`select employers.id, employers.name, active,
        departments.name as "departmentName", departments.id as "departmentId"
        from employers inner join departments on departments.id=employers.department_id where employers.id=$1`, [id]);
    } catch (err) {
      throw err;
    }
  },
  async create(data) {
    try {
      const { name, active, departmentId } = data;
      return await db.one('insert into employers(name, active, department_id) values($1, $2, $3) RETURNING *',
        [name, active, departmentId]);
    } catch (err) {
      throw err;
    }
  },
  async update(id, data) {
    try {
      const { name, active, departmentId } = data;
      return await db.one('update employers set name=$2, active=$3, department_id=$4 where id=$1 RETURNING *', [id, name, active, departmentId]);
    } catch (err) {
      throw err;
    }
  },
  async destroy(id) {
    try {
      return await db.none('delete from employers where id=$1', [id]);
    } catch (err) {
      throw err;
    }
  },
  async count() {
    try {
      return await db.oneOrNone('select count(*) from employers');
    } catch (err) {
      throw err;
    }
  }
};
