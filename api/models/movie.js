const path = require('path');
const fs = require('fs').promises;
const uuid = require('uuid/v4');
const db = require('../database/config');
const ErrorHandler = require('../helpers/errorHandler');

const movieModel = {};

movieModel.getAll = async (filterModel) => {
  const movies = await db.raw(`
    select 
      mv.id, 
      mv.name, 
      f.uuid as file_uuid, 
      array(
        select g.name 
        from movie_genders mg
        inner join gender g
        on g.id = mg.gender_id
        where mg.movie_id = mv.id
      ) as genders
    from movie mv
    inner join file f
    on f.id = mv.file_id;
  `);

  return movies.rows;
};

movieModel.getById = async (id) => {
  // const movie = await db('movie').where({ id: Number(id) });
  const [movie] = (await db.raw(`
    select 
      mv.*, 
      f.uuid as file_uuid, 
      array(
        select g.name 
        from movie_genders mg
        inner join gender g
        on g.id = mg.gender_id
        where mg.movie_id = mv.id
      ) as genders
    from movie mv
    inner join file f
    on f.id = mv.file_id
    where mv.id = ${Number(id)};
  `)).rows;

  if (!movie) {
    throw new ErrorHandler('No movie found with that ID', 404);
  }

  return movie;
};

movieModel.create = async ({ code, name, originalName, duration, image, year, gendersIds, description }) => {
  const imageUuid = uuid();
  const extension = image.name.split('.').pop();
  const imageName = `${imageUuid}.${extension}`;

  await fs.writeFile(
    `public/uploads/${imageName}`,
    image.base64Content,
    'base64',
    err => Promise.reject(err)
  );

  const [fileId] = await db
    .insert({
      name: `${imageName}`,
      uuid: imageUuid,
      original_name: image.name,
      extension,
      destination: 'public/uploads',
      path: `public//uploads//${imageName}`,
      mime_type: image.type,
      size: image.size
    })
    .into('file')
    .returning('id');

  const [movieId] = await db
    .insert({
      code,
      name,
      original_name: originalName,
      year,
      description,
      duration,
      file_id: fileId
    })
    .into('movie')
    .returning('id');

  const movieGenders = gendersIds.map((genderId) => {
    return {
      movie_id: movieId,
      gender_id: genderId
    };
  });

  await db('movie_genders').insert(movieGenders);

  return { id: movieId, name };
};

movieModel.update = async (id, { name, code, year, description, duration, file, gendersIds }) => {};

movieModel.remove = async (id) => {
  await db('movie').where('id', Number(id)).del();
};

module.exports = movieModel;
