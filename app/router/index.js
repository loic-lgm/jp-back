const express = require('express');
const user = require('./user');
const auth = require('./auth');
const category = require('./category');
const sentence = require('./sentence');

const router = express.Router();

router.use('/users', user);
router.use('/', auth);
router.use('/categories', category);
router.use('/sentences', sentence);

module.exports = router;
