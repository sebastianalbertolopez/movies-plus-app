const movie = require('../models/movie');
const { catchAsync } = require('../helpers/catchAsync');
const { sendOK } = require('../helpers/sendOK');

const moviesController = {};

moviesController.getAll = catchAsync(async (req, res, next) => {
  const movies = await movie.getAll();
  sendOK(res, movies);
});

moviesController.get = catchAsync(async (req, res, next) => {
  const entity = await movie.getById(req.params.id);
  sendOK(res, entity);
});

moviesController.create = catchAsync(async (req, res, next) => {
  await movie.create(req.body);
  sendOK(res, { name: req.body.name });
});

moviesController.update = async (req, res, next) => {};

moviesController.remove = async (req, res, next) => {};

module.exports = moviesController;
