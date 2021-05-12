const serie = require('../models/serie');
const { catchAsync } = require('../helpers/catchAsync');
const { sendOK } = require('../helpers/sendOK');

const seriesController = {};

seriesController.getAll = catchAsync(async (req, res, next) => {
  const series = await serie.getAll();
  sendOK(res, series);
});

seriesController.get = catchAsync(async (req, res, next) => {
  const data = await serie.getById(req.params.id);
  const entity = {
    id: data.id,
    code: data.code,
    name: data.name,
    originalName: data.original_name,
    year: data.year,
    description: data.description,
    totalDuration: data.total_duration,
    seasons: data.seasons,
    file: data.file,
    genders: data.genders
  };

  sendOK(res, entity);
});

seriesController.create = catchAsync(async (req, res, next) => {
  const response = await serie.create(req.body);
  sendOK(res, response);
});

seriesController.update = catchAsync(async (req, res, next) => {
  const response = await serie.update(req.body);
  sendOK(res, response);
});

seriesController.remove = catchAsync(async (req, res, next) => {
  await serie.delete(req.params.id);
  sendOK(res, {});
});

module.exports = seriesController;
