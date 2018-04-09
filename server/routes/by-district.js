/**
 * /by-district/:district
 */

const express = require('express');
const router = express.Router({ mergeParams: true });

const typesRouter = require('./types');

router.use('/:district/type', typesRouter.router);

module.exports.router = router;