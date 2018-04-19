/**
 * /dates/:dates
 * dates: yyyyMMdd,yyyyMMdd...
 */

const express = require('express');

const router = express.Router({ mergeParams: true });

const historyQuery = require('./query');

router.use('/:dates', historyQuery.router);

module.exports.router = router;
