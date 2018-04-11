/**
 * /timerange/:startHour/:endHour
 * startHour & endHour: hhmm
 */

const express = require('express');
const router = express.Router({ mergeParams: true });

const historyQuery = require('./query');

router.use('/:startHour/:endHour', historyQuery.router);

module.exports.router = router;
