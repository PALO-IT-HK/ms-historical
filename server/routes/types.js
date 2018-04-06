/**
 * /type/:aggType
 */

const express = require('express');
const router = express.Router();

const dateRange = require('./daterange');
const dates = require('./dates');

router.get('/:aggType/daterange', dateRange.router);
router.get('/:aggType/dates', dates.router);

module.exports.router = router;