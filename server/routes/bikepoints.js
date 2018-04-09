/**
 * /bikepoints/:bikepoints
 */

const express = require('express');
const router = express.Router({ mergeParams: true });

const typesRouter = require('./types');

router.use('/:bikepoints/type', typesRouter.router);

module.exports.router = router;