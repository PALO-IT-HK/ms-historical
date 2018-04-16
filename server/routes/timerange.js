/**
 * /timerange/:startTime/:endTime
 * startTime & endTime: hhmm
 */

const express = require('express');
const router = express.Router({ mergeParams: true });

const historyQuery = require('./query');

router.use('/:startTime/:endTime', historyQuery.router);

module.exports.router = router;
