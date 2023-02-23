// Need to Stop Cannot redeclare block scoped variable Error
export {};
const express = require('express');

const router = express.Router();
const fileControllers = require('@controllers/FileControllers/file');

router.post('/upload', fileControllers.upload);
router.get('/files', fileControllers.getListFiles);
router.get('/files/:name', fileControllers.download);
router.delete('/files/:name', fileControllers.remove);

module.exports = router;
