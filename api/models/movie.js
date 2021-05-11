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
  const [movie] = (await db.raw(`
    SELECT 
      mv.*, 
      json_build_object('id',f.id,'uuid',f.uuid) AS file,
      (
        SELECT json_agg(json_build_object('id',g.id,'name',g.name)) 
        FROM movie_genders mg 
        INNER JOIN gender g
        ON g.id = mg.gender_id
        WHERE mg.movie_id = mv.id
      ) AS genders
    FROM movie mv
    INNER JOIN file f
    ON f.id = mv.file_id
    WHERE mv.id = ${id};
  `)).rows;

  if (!movie) {
    throw new ErrorHandler('No movie found with that ID', 404);
  }

  return movie;
};

movieModel.create = async ({ code, name, originalName, duration, file, year, gendersIds, description }) => {
  const fileUuid = uuid();
  const extension = file.name.split('.').pop();
  const fileName = `${fileUuid}.${extension}`;

  await fs.writeFile(
    `public/uploads/${fileName}`,
    file.base64Content,
    'base64',
    err => Promise.reject(err)
  );

  const [fileId] = await db
    .insert({
      name: `${fileName}`,
      uuid: fileUuid,
      original_name: file.name,
      extension,
      destination: 'public/uploads',
      path: `public//uploads//${fileName}`,
      mime_type: file.type,
      size: file.size
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

movieModel.update = async (movie) => {
  let previousFile = null;
  let fileId = null;

  const hasSameFile = movie.file.id && movie.file.uuid;

  // No se modificó la imagen
  if (hasSameFile) {
    fileId = movie.file.id;
  }
  // Se modificó la imagen
  else {
    const fileUuid = uuid();
    const extension = movie.file.name.split('.').pop();
    const fileName = `${fileUuid}.${extension}`;

    await fs.writeFile(
      `public/uploads/${fileName}`,
      movie.file.base64Content,
      'base64',
      err => Promise.reject(err)
    );

    [fileId] = await db
      .insert({
        name: `${fileName}`,
        uuid: fileUuid,
        original_name: movie.file.name,
        extension,
        destination: 'public/uploads',
        path: `public//uploads//${fileName}`,
        mime_type: movie.file.type,
        size: movie.file.size
      })
      .into('file')
      .returning('id');

    previousFile = await db('movie').select('file_id').where({ id: movie.id }).first();
  }

  // Se eliminan los géneros de la película y se vuelven a insertar los nuevos.
  await db('movie_genders').where('movie_id', movie.id).del();
  const movieGenders = movie.gendersIds.map((genderId) => {
    return {
      movie_id: movie.id,
      gender_id: genderId
    };
  });
  await db('movie_genders').insert(movieGenders);

  // Se actualiza la película
  await db('movie')
    .where({ id: movie.id })
    .update({
      code: movie.code,
      name: movie.name,
      original_name: movie.originalName,
      year: movie.year,
      description: movie.description,
      duration: movie.duration,
      file_id: fileId
    });

  // Si se modificó la imagen, se elimina la anterior
  if (!hasSameFile && previousFile) {
    console.log('aca entró');
    const { name } = await db('file').select('name').where({ id: previousFile.file_id }).first();

    await db('file').where('id', previousFile.file_id).del();
    await fs.unlink(`public/uploads/${name}`);
  }

  return { id: movie.id, name: movie.name };
};

movieModel.delete = async (id) => {
  const file = await db('movie').select('file_id').where({ id }).first();
  const { name } = await db('file').select('name').where({ id: file.file_id }).first();

  await db('movie_genders').where('movie_id', id).del();
  await db('movie').where('id', id).del();

  await db('file').where('id', file.file_id).del();
  await fs.unlink(`public/uploads/${name}`);
};

module.exports = movieModel;
