// Need to Stop Cannot redeclare block scoped variable Error
export {};
const express = require('express');

const router = express.Router();
const logoutController = require('@controllers/AuthControllers/logout');

router.get('/', logoutController.handleLogout);

module.exports = router;
