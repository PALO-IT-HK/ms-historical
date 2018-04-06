var express = require('express');
var router = express.Router();
var athena = require('athena-client');

var clientConfig = {
  bucketUri: 's3://clp-hist-data/bike-journey/processed/data/'
};
var awsConfig = {
  region: 'ap-southeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

var client = athena.createClient(clientConfig, awsConfig);

/**
 * @swagger
 * /usages/:
 *  get:
 *     description: Retrieve usage data for given parameters
 *     tags:
 *       - bike
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: results
 *         schema:
 *           $ref: '#/definitions/results'
 */
router.get('/', function(req, res, next) {
  client
    .execute(
      `WITH _daterange AS (SELECT * FROM clp_bike_poc.journey_data WHERE (year = 2017 AND MONTH = 1 AND DAY >= 15) OR (year = 2017 AND MONTH >= 2 AND MONTH <= 5) OR (year = 2017 AND MONTH = 6 AND DAY <= 14))
      SELECT id, district, location, lat, lng, sum(start_count), sum(end_count) FROM _daterange
      WHERE cast(date_format(time, '%H.%i') AS double) BETWEEN 15.00 AND 18.59
        AND lat BETWEEN 51.519265 AND 51.530535
        AND lng BETWEEN -0.030556 AND -0.013258
      GROUP BY id, district, location, lat, lng`
    )
    .toPromise()
    .then(function(data) {
      console.log(data);
      return res.status(200).send({ result: data });
    })
    .catch(function(err) {
      console.error(err);
      return res.status(404).send({ error: err });
    });
});

module.exports = router;
