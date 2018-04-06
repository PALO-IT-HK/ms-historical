/**
 * /dates/:dates
 * dates: yyyyMMdd,yyyyMMdd...
 */

const express = require('express');
const router = express.Router();

const historyQuery = require('./query');

router.get('/:dates', historyQuery.router);

module.exports.router = router;