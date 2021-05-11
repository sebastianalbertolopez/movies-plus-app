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
  const response = await movie.create(req.body);
  console.log('la respuesta es', response);
  sendOK(res, response);
});

moviesController.update = async (req, res, next) => {};

moviesController.remove = async (req, res, next) => {};

module.exports = moviesController;
