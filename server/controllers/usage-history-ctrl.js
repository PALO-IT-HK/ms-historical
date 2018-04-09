const Promise = require('bluebird');
const athena = require('../utils/athena-client');
const queryBuilder = require('../utils/query-builder');
/**
 * req.params
 *
 *
 */
function query(req, res, next) {
  // Dates / Date Range
  // Dates: req.params.dates
  // BUILD WHERE CLAUSE THAT FILTER dates
  //   every day in `dates` 00:00:00 to 23:59:59

  // DatesRange: req.params.startDate / req.params.endDate
  // Build WHERE CLAUSE THAT FILTER daterange
  //   time BETWEEN from_iso8601_timestamp('2018-01-01T00:00:00') AND from_iso8601_timestamp('2018-01-14T23:59:59'

  // Time / Time Range
  // req.params.startTime / req.params.endTime
  // Build WHERE CLAUSE THAT FILTER START/END TIME
  //   cast(date_format(time, '%H.%i') AS double) BETWEEN 13.00 AND 14.59

  // boundary - req.params.neLatLng, req.params.swLatLng
  // Build WHERE CLAUSE FOR LATLNG BOUNDARY
  //   lat between ${west} and ${east} AND lng between ${south} and ${north}

  // by-district - req.params.district
  // Build WHERE CLAUSE FOR DISTRICT
  //   district IN (districts.map(d => `'${d}'`).join(','))

  // bikepoints - req.params.bikepoints
  // Build WHERE CLAUSE FOR BIKEPOINTS
  //   id IN (ids.join(','))

  // top-usage - req.params.count
  // If type is Total
  // ORDER BY totalBikesIn + totalBikesOut
  // LIMIT X

  // types: total
  // Do no breakdown

  // types: by-day
  // Breakdown by days - Breakdown by Day

  // types: by-hour
  // Breakdown by days - Breakdown by Hour
  athena.getDataFromAthena(queryBuilder.build(req)).then(data => {
    res.status(200).send(data.records);
  });
}

module.exports.query = query;
