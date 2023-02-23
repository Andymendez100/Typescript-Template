// Need to Stop Cannot redeclare block scoped variable Error
export {};
const express = require('express');

const router = express.Router();
const reportController = require('@controllers/reportController');

router.post('/verify-report', reportController.verifyUserReportAccess);

module.exports = router;
