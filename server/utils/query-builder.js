const format = require('string-format');
let selectMainQuery = `SELECT id, location, district, lat, lng, sum(start_count) as totalBikesOut, sum(end_count) as totalBikesIn`;
let selectQueryHour = ` ,substr(to_iso8601(time), 1, 13) as day`;
let selectQueryDay = ` ,substr(to_iso8601(time), 1, 10) as day`;
let fromQuery = ` FROM clp_bike_poc.journey_data`;
let whereMainQuery = ` WHERE time BETWEEN from_iso8601_timestamp('{0}T00:00:00') AND from_iso8601_timestamp('{1}T23:59:59')`;
let byDayQuery = ` AND id IN (SELECT id FROM clp_bike_poc.journey_data
  WHERE time >= from_iso8601_timestamp('{0}T00:00:00') AND time <= from_iso8601_timestamp('{1}T23:59:59')
    {2} {3}
  GROUP BY id, location, district, lat, lng
  ORDER by SUM(start_count + end_count) desc
  {4})`;
let byHourQuery = ` AND cast(date_format(time, '%H.%i') AS double) BETWEEN {0} AND {1}`;
let topQuery = ` LIMIT {0}`;
let byDistrictQuery = ` AND district='{0}'`;
let byBikePointsQuery = ` AND id in ({})`;
let groupByHourQuery = ` GROUP BY id, district, location, lat, lng, substr(to_iso8601(time), 1, 13)`;
let groupByDayQuery = ` GROUP BY id, district, location, lat, lng, substr(to_iso8601(time), 1, 10)`;
let groupByQuery = ` GROUP BY id, district, location, lat, lng`;
let latlonQuery = ` AND lat BETWEEN {0} AND {1}
AND lng BETWEEN {2} AND {3}`;

function build(req) {
  let queryString;
  if (
    req.params.neLatLng &&
    req.params.swLatLng &&
    req.params.startDate &&
    req.params.endDate &&
    req.params.aggType
  ) {
    //boundary
    if (req.params.aggType === 'total') {
      let { startDate, endDate } = getDates(req);
      let { neArray, swLatLng } = getLocation(req);
      queryString = `SELECT id, location, district, lat, lng, sum(start_count) as totalBikesOut, sum(end_count) as totalBikesIn FROM clp_bike_poc.journey_data
      WHERE time >= from_iso8601_timestamp('${startDate}T00:00:00') AND time <= from_iso8601_timestamp('${endDate}T23:59:59')
        AND lat BETWEEN ${swLatLng[0]} AND ${neArray[0]}
        AND lng BETWEEN ${swLatLng[1]} AND ${neArray[1]}
      GROUP BY id, location, district, lat, lng ORDER BY totalBikesOut desc`;
    } else {
      queryString = getAggTypeQuery(req, 'boundary');
    }
  } else if (req.params.count && req.params.aggType) {
    //by count
    if (req.params.aggType === 'total') {
      let { startDate, endDate } = getDates(req);
      queryString = `SELECT id, location, district, lat, lng, sum(start_count) as totalBikesOut, sum(end_count) as totalBikesIn, SUM(start_count + end_count) as totalBikesCount  FROM clp_bike_poc.journey_data
    WHERE time >= from_iso8601_timestamp('${startDate}T00:00:00') AND time <= from_iso8601_timestamp('${endDate}T23:59:59')
    GROUP BY id, location, district, lat, lng
    ORDER by totalBikesCount desc
limit ${req.params.count};`;
    } else {
      queryString = getAggTypeQuery(req, 'count');
    }
  } else if (req.params.district && req.params.aggType) {
    //by district
    if (req.params.aggType === 'total') {
      let { startDate, endDate } = getDates(req);
      queryString = `SELECT id, location, district, lat, lng, sum(start_count) as totalBikesOut, sum(end_count) as totalBikesIn, SUM(start_count + end_count) as totalBikesCount  FROM clp_bike_poc.journey_data
    WHERE time >= from_iso8601_timestamp('${startDate}T00:00:00') AND time <= from_iso8601_timestamp('${endDate}T23:59:59') AND district='${
        req.params.district
      }'
    GROUP BY id, location, district, lat, lng
    ORDER by totalBikesCount desc`;
    } else {
      queryString = getAggTypeQuery(req, 'district');
    }
  } else if (req.params.bikepoints && req.params.aggType) {
    //by bikepoints
    if (req.params.aggType === 'total') {
      let { startDate, endDate } = getDates(req);
      queryString = `SELECT id, location, district, lat, lng, sum(start_count) as totalBikesOut, sum(end_count) as totalBikesIn, SUM(start_count + end_count) as totalBikesCount  FROM clp_bike_poc.journey_data
    WHERE time >= from_iso8601_timestamp('${startDate}T00:00:00') AND time <= from_iso8601_timestamp('${endDate}T23:59:59') AND id in (${
        req.params.bikepoints
      })
    GROUP BY id, location, district, lat, lng
    ORDER by totalBikesCount desc`;
    } else {
      queryString = getAggTypeQuery(req, 'bikepoints');
    }
  }
  return queryString;
}

function getLocation(req) {
  let neArray, swLatLng;
  if (req.params.neLatLng && req.params.swLatLng) {
    neArray = req.params.neLatLng.split(',');
    swLatLng = req.params.swLatLng.split(',');
  }
  return { neArray, swLatLng };
}

function getAggTypeQuery(req, endPointType) {
  let query;
  let { neArray, swLatLng } = getLocation(req);
  let { startDate, endDate } = getDates(req);
  let { startHour, endHour } = getTimeRange(req);

  let locationQuery = getLocationQuery(req, neArray, swLatLng);
  let topCountQuery = req.params.count
    ? format(topQuery, req.params.count)
    : '';
  let timeRangeData =
    startHour && endHour ? format(byHourQuery, startHour, endHour) : '';
  let byHourOrDay =
    req.params.aggType === 'by-day' ? selectQueryDay : selectQueryHour;
  let byHourOrDayGrouping =
    req.params.aggType === 'by-day' ? groupByDayQuery : groupByHourQuery;
  query =
    selectMainQuery +
    byHourOrDay +
    fromQuery +
    format(whereMainQuery, startDate, endDate) +
    timeRangeData +
    format(
      byDayQuery,
      startDate,
      endDate,
      timeRangeData,
      locationQuery,
      topCountQuery
    ) +
    byHourOrDayGrouping;

  return query;
}

function getLocationQuery(req, neArray, swLatLng) {
  let result;
  if (neArray && swLatLng) {
    result = format(
      latlonQuery,
      swLatLng[0],
      neArray[0],
      swLatLng[1],
      neArray[1]
    );
  } else if (req.params.bikepoints) {
    result = format(byBikePointsQuery, req.params.bikepoints);
  } else if (req.params.district) {
    result = format(byDistrictQuery, req.params.district);
  } else {
    result = '';
  }
  return result;
}

function getTimeRange(req) {
  let startHour, endHour;
  if (req.params.startHour && req.params.endHour) {
    startHour = `${req.params.startHour.substr(0, 2)}.00`;
    endHour = `${req.params.endHour.substr(0, 2)}.59`;
  }
  return { startHour, endHour };
}

function getDates(req) {
  let startDate = [
    req.params.startDate.slice(0, 4),
    '-',
    req.params.startDate.slice(4, 6),
    '-',
    req.params.startDate.slice(6, 8)
  ].join('');
  let endDate = [
    req.params.endDate.slice(0, 4),
    '-',
    req.params.endDate.slice(4, 6),
    '-',
    req.params.endDate.slice(6, 8)
  ].join('');
  return { startDate, endDate };
}

module.exports = { build };
