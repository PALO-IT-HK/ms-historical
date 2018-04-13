const express = require('express');
const router = express.Router({ mergeParams: true });

// Docs Endpoint
const swagger = require('./swagger');

// Functional Endpoint
const boundary = require('./boundary');
const topUsage = require('./top-usage');
const byDistrict = require('./by-district');
const bikepoints = require('./bikepoints');

// ECS Healthcheck
router.get('/healthcheck', function(req, res, next) {
  return res.status(200).send({ status: 'OK', version: '1.0' });
});
router.use('/docs', swagger.router);

// Functional Endpoints
router.use('/boundary', boundary.router);
router.use('/top-usage', topUsage.router);
router.use('/by-district', byDistrict.router);
router.use('/bikepoints', bikepoints.router);

module.exports = router;
