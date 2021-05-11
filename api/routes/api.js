const router = require('express').Router();

router.use('/movies', require('./movies'));

router.use('/files', require('./files'));

router.use('/utils', require('./utils'));

module.exports = router;
