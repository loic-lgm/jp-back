const express = require('express');
const sentenceController = require('../controllers/sentence');
const verifyPermissions = require('../middlewares/verifyPermissions')
const router = express.Router();

router.get('/', sentenceController.findAll);
router.get('/:id', sentenceController.findOne);
router.post('/create', verifyPermissions, sentenceController.create);
// router.put('/:id/update', verifyPermissions, categoryController.update);
// router.delete('/:id/delete', verifyPermissions, categoryController.delete);

module.exports = router;