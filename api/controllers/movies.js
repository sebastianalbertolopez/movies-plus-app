const movie = require('../models/movie');
const { catchAsync } = require('../helpers/catchAsync');
const { sendOK } = require('../helpers/sendOK');

const moviesController = {};

moviesController.getAll = catchAsync(async (req, res, next) => {
  const movies = await movie.getAll();
  sendOK(res, movies);
});

moviesController.get = catchAsync(async (req, res, next) => {
  const data = await movie.getById(req.params.id);
  const entity = {
    id: data.id,
    code: data.code,
    name: data.name,
    originalName: data.original_name,
    year: data.year,
    description: data.description,
    duration: data.duration,
    file: data.file,
    genders: data.genders
  };

  sendOK(res, entity);
});

moviesController.create = catchAsync(async (req, res, next) => {
  const response = await movie.create(req.body);
  sendOK(res, response);
});

moviesController.update = async (req, res, next) => {
  const response = await movie.update(req.body);
  sendOK(res, response);
};

moviesController.remove = async (req, res, next) => {
  await movie.delete(req.params.id);
  sendOK(res, {});
};

module.exports = moviesController;
