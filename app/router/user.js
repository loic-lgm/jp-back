const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);

module.exports = router;