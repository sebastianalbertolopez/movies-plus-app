exports.up = (knex) => {
  return knex.schema
    .createTable('gender', (table) => {
      table.increments('id').unsigned().primary();
      table.text('code', 50).unique().notNullable();
      table.text('name', 50).unique().notNullable();
    })
    .createTable('file', (table) => {
      table.increments('id').unsigned().primary();
      table.text('name', 50).unique().notNullable();
      table.text('uuid', 50).unique().notNullable();
      table.text('original_name', 100).notNullable();
      table.text('extension', 50).notNullable();
      table.text('mime_type', 50).notNullable();
      table.text('destination', 50).notNullable();
      table.text('path', 100).notNullable();
      table.bigInteger('size').notNullable();
    })
    .createTable('movie', (table) => {
      table.increments('id').unsigned().primary();
      table.text('code', 50).unique().notNullable();
      table.text('name', 100).unique().notNullable();
      table.text('original_name', 100).unique().notNullable();
      table.integer('year', 10).notNullable();
      table.text('description', 1000);
      table.integer('duration', 5).notNullable();
      table.integer('file_id').references('id').inTable('file');
    })
    .createTable('movie_genders', (table) => {
      table.integer('movie_id').references('id').inTable('movie');
      table.integer('gender_id').references('id').inTable('gender');
      table.primary(['movie_id', 'gender_id']);
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('movie_genders')
    .dropTableIfExists('gender')
    .dropTableIfExists('movie')
    .dropTableIfExists('file');
};
