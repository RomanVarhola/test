const employerService = require('../services/employer.service');
const departmentService = require('../services/department.service');

module.exports = {
  async getSome(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 3;
      const search = req.query.search || '';

      const employers = await employerService.findSome(page, limit, search);
      const total = await employerService.count();

      res.status(200).json({data: {employers, total: Number(total.count), page, limit}});
    } catch (err) {
      throw next(err);
    }
  },
  async getOne(req, res, next) {
    try {
      const employer = await employerService.findOne(req.params.id);
      if (employer) {
        return res.status(200).json({data: {employer}});
      }
      res.status(400).json({data: null, error: 'Employer doesn\'t found'});
    } catch (err) {
      throw next(err);
    }
  },
  async create(req, res, next) {
    try {
      const department = await departmentService.findOne(req.body.departmentId);
      if (department) {
        const employer = await employerService.create(req.body);
        if (employer) {
          return res.status(201).json({result: 'success', message: 'Employer was created!', data: {employer}});
        }
      }
      res.status(400).json({data: null, error: 'Department doesn\'t exist'});
    } catch (err) {
      throw next(err);
    }
  },
  async update(req, res, next) {
    try {
      const department = await  departmentService.findOne(req.body.departmentId);
      if (department) {
        const employer = await employerService.update(req.params.id, req.body);
        if (employer) {
          return res.status(201).json({result: 'success', message: 'Employer was updated!'});
        }
        res.status(400).json({data: null, error: 'Employer doesn\'t exist'});
      }
      res.status(400).json({data: null, error: 'Department doesn\'t exist'});
    } catch (err) {
      throw next(err);
    }
  },
  async delete(req, res, next) {
    try {
      await employerService.destroy(req.params.id);
      return res.status(201).json({result: 'success', message: 'Employer was destroyed!'});
    } catch (err) {
      throw next(err);
    }
  }
};
