/**
 * /by-district/:districts
 */

const express = require('express');

const router = express.Router({ mergeParams: true });

const typesRouter = require('./types');

router.use('/:districts/type', typesRouter.router);

module.exports.router = router;
