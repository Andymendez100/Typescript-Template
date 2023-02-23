// Need to Stop Cannot redeclare block scoped variable Error
export {};
const express = require('express');

const router = express.Router();
const registerController = require('@controllers/AuthControllers/register');

router.post('/', registerController.handleNewUser);

module.exports = router;
