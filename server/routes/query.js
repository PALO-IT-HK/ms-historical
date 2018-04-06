/**
 * / - All timerange
 * /timerange/:startTime/:endTime - Specific timerange
 * startTime & endTime: HHmm (24-hr format)
 *
 * ****** Low priority for day of week ******
 * /timerange/:startTime/:endTime/dayofweek/:dows
 * /dayofweek/:dows
 */

const express = require('express');
const router = express.Router();

const usageHistory = require('../controllers/usage-history-ctrl');

router.get('*', usageHistory.query);

module.exports.router = router;outer;