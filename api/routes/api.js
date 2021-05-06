const router = require('express').Router();

router.use('/movies', require('./movies'));

router.use('/files', require('./files'));

module.exports = router;
