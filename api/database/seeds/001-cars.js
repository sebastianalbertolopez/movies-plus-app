exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(() => {
      // Inserts seed entries
      return knex('cars').insert([
        {
          code: '3FA6PORU3ER169003',
          make: 'Volkswagen',
          model: 'Virtus',
          mileage: 10000,
          transmission_type: 'manual'
        },
        {
          code: '6GD8VJGD8IO765432',
          make: 'Volkswagen',
          model: 'Vento',
          mileage: 0,
          transmission_type: 'automatic'
        },
        {
          code: '0GH3FGHJ3ER098765',
          make: 'Volkswagen',
          model: 'Amarok',
          mileage: 60000,
          transmission_type: 'manual'
        }
      ]);
    });
};
