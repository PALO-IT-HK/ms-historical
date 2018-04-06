/**
 * /top-usage/:count
 */

const express = require('express');
const router = express.Router();

const typesRouter = require('./types');

router.get('/:count/type', typesRouter.router);

module.exports.router = router;