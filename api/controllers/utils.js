const db = require('../database/config');
const { catchAsync } = require('../helpers/catchAsync');
const { sendOK } = require('../helpers/sendOK');

const utilsController = {};

utilsController.getGenders = catchAsync(async (req, res, next) => {
  const genders = await db('gender')
    .select('id', 'name')
    .orderBy('name', 'asc');

  sendOK(res, genders);
});

module.exports = utilsController;
