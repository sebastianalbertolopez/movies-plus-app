exports.seed = (knex) => {
  return knex('file').del()
    .then(() => knex('file').insert({
      name: '22bc0de6-5f1b-4fdc-a158-971b98d9836e.jpg',
      uuid: '22bc0de6-5f1b-4fdc-a158-971b98d9836e',
      original_name: '450_1000.jpg',
      extension: 'jpg',
      mime_type: 'image/jpeg',
      destination: process.env.FILE_STORAGE_PATH,
      path: 'public//uploads//22bc0de6-5f1b-4fdc-a158-971b98d9836e.jpg',
      size: 50793
    }));
};
