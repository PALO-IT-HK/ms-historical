const express = require('express');
const router = express.Router();

// Docs Endpoint
const swagger = require('./swagger');

// Functional Endpoint
const boundary = require('./boundary');
const topUsage = require('./top-usage');
const byDistrict = require('./by-district');
const bikepoints = require('./bikepoints');

// ECS Healthcheck
router.get('/healthcheck', function (req, res, next) {
    return res.status(200).send({ status: 'OK', version: '1.0' });
});
router.get('/docs', swagger.router);

// Functional Endpoints
router.get('/boundary', boundary.router);
router.get('/top-usage', topUsage.router);
router.get('/by-district', byDistrict.router);
router.get('/bikepoints', bikepoints.router);

// SPIKE
const usagesTest = require('./usages-test');
router.get('/test', usagesTest);

module.exports = router;
