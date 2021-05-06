const movieData = {
  code: 'run_all_night',
  name: 'Una noche para sobrevivir',
  year: '2015',
  description: 'Al veterano mercenario Jimmy Conlon, conocido como El Cavatumbas, lo persiguen los crímenes del pasado, pero tambien el policía que le ha seguido la pista durante 30 años. Cuando se entera de que su hijo Mike corre peligro, Jimmy tiene que elegir entre el clan criminal al que ha pertenecido siempre y su familia, a la que había abandonado hace mucho tiempo. Sólo dispone de una noche para averiguar a quién debe su lealtad.',
  duration: 114,
  file_id: 1
};

const gendersCodes = [
  'suspenso',
  'drama',
  'accion'
];

const createMovieGender = (knex, movieId, gender) => {
  return knex('gender').where('code', gender).first().then((genderRecord) => {
    return knex('movie_genders').insert({
      movie_id: Number(movieId),
      gender_id: Number(genderRecord.id)
    });
  });
};

exports.seed = (knex) => {
  return knex('movie_genders').del()
    .then(() => knex('movie').del())
    .then(() => knex('movie').insert(movieData, 'id'))
    .then((movieId) => {
      const genderPromises = [];
      gendersCodes.forEach((gender) => {
        genderPromises.push(createMovieGender(knex, movieId, gender));
      });

      return Promise.all(genderPromises);
    });
};
