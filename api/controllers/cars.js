const Cars = require('../models/cars');

const cars = new Cars();
const carsController = {};

carsController.getAll = async (req, res) => {
  try {
    const data = await cars.getAll();
    return res.json(data);
  } 
  catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ocurrió un error', error: e });
  }
};

module.exports = carsController;
