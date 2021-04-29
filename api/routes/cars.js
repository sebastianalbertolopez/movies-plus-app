const router = require('express').Router();
const { getAll } = require('../controllers/cars');

// api/cars
router.get('/', getAll);

module.exports = router;
