const express = require('express');
const sentenceController = require('../controllers/sentence');
const verifyPermissions = require('../middlewares/verifyPermissions')
const router = express.Router();

router.get('/', sentenceController.findAll);
router.get('/:id', sentenceController.findOne);
router.get('/getSentences/:id1/:id2/:id3', sentenceController.findR3ByIds);
router.post('/create', verifyPermissions, sentenceController.create);
router.put('/:id/update', verifyPermissions, sentenceController.update);
router.delete('/:id/delete', verifyPermissions, sentenceController.delete);

module.exports = router;