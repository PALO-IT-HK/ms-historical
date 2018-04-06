/**
 * /boundary/:neLatLng/:swLatLng
 */

const express = require('express');
const router = express.Router();

const typesRouter = require('./types');

router.get('/:neLatLng/:swLatLng/type', typesRouter.router);

module.exports.router = router;