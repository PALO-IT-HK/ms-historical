/**
 * /type/:aggType
 */

const express = require('express');
const router = express.Router({ mergeParams: true });

const dateRange = require('./daterange');
const dates = require('./dates');

router.use('/:aggType/daterange', dateRange.router);
router.use('/:aggType/dates', dates.router);

module.exports.router = router;