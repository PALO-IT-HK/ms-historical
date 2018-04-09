/**
 * /top-usage/:count
 */

const express = require('express');
const router = express.Router({ mergeParams: true });

const typesRouter = require('./types');

router.use('/:count/type', typesRouter.router);

module.exports.router = router;