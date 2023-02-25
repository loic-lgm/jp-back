const express = require('express');
const userController = require('../controllers/user');
const verifyPermissions = require('../middlewares/verifyPermissions')
const router = express.Router();

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.post('/create', userController.create);
router.put('/:id/update', verifyPermissions, userController.update);
router.delete('/:id/delete', verifyPermissions, userController.delete);

module.exports = router;