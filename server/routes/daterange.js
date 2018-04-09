/**
 * /daterange/:startDate/:endDate
 * startDate & endDate: yyyyMMdd
 */

const express = require('express');
const router = express.Router({ mergeParams: true });

const historyQuery = require('./query');

router.use('/:startDate/:endDate', historyQuery.router);

module.exports.router = router;
