exports.seed = (knex) => {
  return knex('gender').del()
    .then(() => knex('gender').insert([
      {
        name: 'Suspenso',
        code: 'suspenso'
      },
      {
        name: 'Terror',
        code: 'terror'
      },
      {
        name: 'Drama',
        code: 'drama'
      },
      {
        name: 'Ciencia Ficción',
        code: 'ciencia_ficcion'
      },
      {
        name: 'Acción',
        code: 'accion'
      },
      {
        name: 'Romance',
        code: 'romance'
      },
      {
        name: 'Comedia',
        code: 'comedia'
      },
      {
        name: 'Horror',
        code: 'horror'
      },
      {
        name: 'Documental',
        code: 'documental'
      },
      {
        name: 'Animación',
        code: 'animacion'
      },
      {
        name: 'Misterio',
        code: 'misterio'
      },
      {
        name: 'Música',
        code: 'musica'
      },
      {
        name: 'Aventura',
        code: 'aventura'
      },
      {
        name: 'Fantasía',
        code: 'fantasia'
      },
      {
        name: 'Crimen',
        code: 'crimen'
      }
    ]));
};
