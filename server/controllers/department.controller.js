const departmentService = require('../services/department.service');

module.exports = {
  async getSome(req, res, next) {
    try {
      const departments = await departmentService.findSome();

      res.status(200).json({data: {departments}});
    } catch (err) {
      throw next(err);
    }
  }
};
