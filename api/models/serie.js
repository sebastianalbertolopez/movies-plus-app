const fs = require('fs').promises;
const uuid = require('uuid/v4');
const db = require('../database/config');
const ErrorHandler = require('../helpers/errorHandler');

const serieModel = {};

serieModel.getAll = async (filterModel) => {
  const series = await db.raw(`
    select 
      s.id, 
      s.name,
      s.sesions,
      f.uuid as file_uuid, 
      array(
        select g.name 
        from serie_genders sg
        inner join gender g
        on g.id = sg.gender_id
        where sg.serie_id = s.id
      ) as genders
    from serie s
    inner join file f
    on f.id = s.file_id;
  `);

  return series.rows;
};

serieModel.getById = async (id) => {
  const [serie] = (await db.raw(`
    SELECT 
      s.*, 
      json_build_object('id',f.id,'uuid',f.uuid) AS file,
      (
        SELECT json_agg(json_build_object('id',g.id,'name',g.name)) 
        FROM serie_genders sg 
        INNER JOIN gender g
        ON g.id = sg.gender_id
        WHERE sg.serie_id = s.id
      ) AS genders
    FROM serie s
    INNER JOIN file f
    ON f.id = s.file_id
    WHERE s.id = ${id};
  `)).rows;

  if (!serie) {
    throw new ErrorHandler('No serie found with that ID', 404);
  }

  return serie;
};

serieModel.create = async (serie) => {
  const {
    code,
    name,
    originalName,
    totalDuration,
    file,
    year,
    seasons,
    gendersIds,
    description
  } = serie;

  const fileUuid = uuid();
  const extension = file.name.split('.').pop();
  const fileName = `${fileUuid}.${extension}`;

  await fs.writeFile(
    `${process.env.FILE_STORAGE_PATH}/${fileName}`,
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
      destination: process.env.FILE_STORAGE_PATH,
      path: `public//uploads//${fileName}`,
      mime_type: file.type,
      size: file.size
    })
    .into('file')
    .returning('id');

  const [serieId] = await db
    .insert({
      code,
      name,
      original_name: originalName,
      year,
      description,
      total_duration: totalDuration,
      seasons,
      file_id: fileId
    })
    .into('serie')
    .returning('id');

  const serieGenders = gendersIds.map((genderId) => {
    return {
      serie_id: serieId,
      gender_id: genderId
    };
  });

  await db('serie_genders').insert(serieGenders);

  return { id: serieId, name };
};

serieModel.update = async (serie) => {
  const {
    id,
    code,
    name,
    originalName,
    totalDuration,
    file,
    year,
    seasons,
    gendersIds,
    description
  } = serie;

  let previousFile = null;
  let fileId = null;

  const hasSameFile = file.id && file.uuid;

  // No se modificó la imagen
  if (hasSameFile) {
    fileId = file.id;
  }
  // Se modificó la imagen
  else {
    const fileUuid = uuid();
    const extension = file.name.split('.').pop();
    const fileName = `${fileUuid}.${extension}`;

    await fs.writeFile(
      `${process.env.FILE_STORAGE_PATH}/${fileName}`,
      file.base64Content,
      'base64',
      err => Promise.reject(err)
    );

    [fileId] = await db
      .insert({
        name: `${fileName}`,
        uuid: fileUuid,
        original_name: file.name,
        extension,
        destination: process.env.FILE_STORAGE_PATH,
        path: `public//uploads//${fileName}`,
        mime_type: file.type,
        size: file.size
      })
      .into('file')
      .returning('id');

    previousFile = await db('serie as s')
      .select('f.id', 'f.name')
      .join('file as f', 'f.id', 's.file_id')
      .where('s.id', id)
      .first();
  }

  // Se eliminan los géneros de la serie y se vuelven a insertar los nuevos.
  await db('serie_genders').where('serie_id', id).del();
  const serieGenders = gendersIds.map((genderId) => {
    return {
      serie_id: id,
      gender_id: genderId
    };
  });
  await db('serie_genders').insert(serieGenders);

  // Se actualiza la serie
  await db('serie')
    .where({ id })
    .update({
      code,
      name,
      original_name: originalName,
      year,
      description,
      seasons,
      total_duration: totalDuration,
      file_id: fileId
    });

  // Si se modificó la imagen, se elimina la anterior
  if (!hasSameFile && previousFile) {
    await db('file').where('id', previousFile.id).del();
    await fs.unlink(`${process.env.FILE_STORAGE_PATH}/${previousFile.name}`);
  }

  return { id, name };
};

serieModel.delete = async (id) => {
  const file = await db('serie as s')
    .select('f.id', 'f.name')
    .join('file as f', 'f.id', 's.file_id')
    .where('s.id', id)
    .first();

  await db('serie_genders').where('serie_id', id).del();
  await db('serie').where({ id }).del();

  await db('file').where('id', file.file_id).del();
  await fs.unlink(`${process.env.FILE_STORAGE_PATH}/${file.name}`);
};

module.exports = serieModel;
