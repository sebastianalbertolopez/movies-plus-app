// Update with your config settings.
module.exports = {
  development: {
    // our DBMS driver
    client: 'sqlite3',
    // the location of our db & will create the database
    connection: {
      filename: './database/concessionaire.db3',
    },
    // necessary when using sqlite3
    useNullAsDefault: true,
    migrations: {
      // will create your migrations in the data folder automatically
      directory: './database/migrations',
    },
    // will create your seeds in the data folder automatically
    seeds: {
      directory: './database/seeds',
    },
  },
};
