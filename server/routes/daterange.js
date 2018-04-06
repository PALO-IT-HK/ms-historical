/**
 * /daterange/:startDate/:endDate
 * startDate & endDate: yyyyMMdd
 */

const express = require('express');
const router = express.Router();

const historyQuery = require('./query');

router.get('/:startDate/:endDate', historyQuery.router);

module.exports.router = router;
