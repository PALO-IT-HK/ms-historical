/**
 * /bikepoints/:bikepoints
 */

const express = require('express');
const router = express.Router();

const typesRouter = require('./types');

router.get('/:bikepoints/type', typesRouter.router);

module.exports.router = router;