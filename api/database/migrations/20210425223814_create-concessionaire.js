exports.up = (knex) => {
  return knex.schema.createTable('cars', (table) => {
    table.increments('id').unsigned().primary();

    table.text('code', 17).unique().notNullable();

    table.text('make', 128).notNullable();

    table.text('model', 128).notNullable();

    table.integer('mileage', 7).notNullable();

    table.text('transmission_type', 128).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('cars');
};
