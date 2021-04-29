const Repository = require('../database/repository');

class Cars {
  constructor() {
    this.repository = new Repository('cars');
  }

  async getAll() {
    const items = await this.repository.getAll();
    return items;
  }
}

module.exports = Cars;
