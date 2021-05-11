const router = require('express').Router();

const {
  getGenders
} = require('../controllers/utils');

// api/movies
router.get('/genders', getGenders);

module.exports = router;
