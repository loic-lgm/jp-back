const express = require('express');
const user = require('./user');
const auth = require('./auth');

const router = express.Router();

router.use('/users', user);
router.use('/', auth);

module.exports = router;
