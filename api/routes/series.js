const router = require('express').Router();

const {
  getAll,
  get,
  create,
  update,
  remove
} = require('../controllers/series');

// api/series
router.get('/', getAll);
router.get('/:id', get);
router.post('/', create);
router.put('/', update);
router.delete('/:id', remove);

module.exports = router;
