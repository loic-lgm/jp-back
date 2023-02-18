const express = require('express');
const authController = require('../controllers/auth');
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router();

router.post('/login', authController.login);
router.post('/authorization', verifyToken, authController.authorization)

module.exports = router;