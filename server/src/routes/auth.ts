// Need to Stop Cannot redeclare block scoped variable Error
export {};
const express = require('express');

const router = express.Router();
const authController = require('@controllers/AuthControllers/auth');

router.post('/', authController.handleLogin);

module.exports = router;
