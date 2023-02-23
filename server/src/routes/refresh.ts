// Need to Stop Cannot redeclare block scoped variable Error
export {};
const express = require('express');

const router = express.Router();
const refreshTokenController = require('@controllers/AuthControllers/refreshToken');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;
