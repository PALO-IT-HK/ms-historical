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
const router = express.Router({ mergeParams: true });

const usageHistory = require('../controllers/usageHistoryController');

router.route('*').get(usageHistory.query);

module.exports.router = router;
