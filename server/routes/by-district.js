/**
 * /by-district/:district
 */

const express = require('express');
const router = express.Router();

const typesRouter = require('./types');

router.get('/:district/type', typesRouter.router);

module.exports.router = router;