const db = require('./config');

class Repository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  getAll() {
    return db(this.tableName);
  }

  getById(id) {
    return db(this.tableName).where({ id: Number(id) });
  }

  insert(data) {
    return db(this.tableName).insert(data);
  }

  update(id, data) {
    return db(this.tableName)
      .where({ id: Number(id) })
      .update(data);
  }

  delete(id) {
    return db(this.tableName)
      .where({ id: Number(id) })
      .del();
  }
}

module.exports = Repository;
