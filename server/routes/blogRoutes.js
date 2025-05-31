const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogController');

router.post('/save-draft', controller.saveDraft);
router.post('/publish', controller.publishBlog);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;
