/**
 * /boundary/:neLatLng/:swLatLng
 */

const express = require('express');

const router = express.Router({ mergeParams: true });

const typesRouter = require('./types');

router.use('/:neLatLng/:swLatLng/type', typesRouter.router);

module.exports.router = router;
