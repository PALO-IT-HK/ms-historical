const config = require('../config');

function getLocation(req) {
  let neLatLng;
  let swLatLng;
  if (req.params.neLatLng && req.params.swLatLng) {
    neLatLng = req.params.neLatLng.split(',');
    swLatLng = req.params.swLatLng.split(',');
  }
  return { neLatLng, swLatLng };
}

function getTimeRange(req) {
  let startTime;
  let endTime;
  if (req.params.startTime && req.params.endTime) {
    startTime = `${req.params.startTime.substr(0, 2)}.${req.params.endTime.substr(2, 2)}`;
    endTime = `${req.params.endTime.substr(0, 2)}.${req.params.endTime.substr(2, 2)}`;
  }
  return { startTime, endTime };
}

function getDates(req) {
  let startDate;
  let endDate;
  if (req.params.startDate && req.params.endDate) {
    startDate = [
      req.params.startDate.slice(0, 4),
      req.params.startDate.slice(4, 6),
      req.params.startDate.slice(6, 8),
    ].join('-');
    endDate = [
      req.params.endDate.slice(0, 4),
      req.params.endDate.slice(4, 6),
      req.params.endDate.slice(6, 8),
    ].join('-');
  }
  return { startDate, endDate };
}

function build(req) {
  const queryArray = [];
  const whereClauses = [];
  let limitClause = '';

  // DatesRange: req.params.startDate / req.params.endDate
  // Build WHERE CLAUSE THAT FILTER daterange
  //   time BETWEEN from_iso8601_timestamp('2018-01-01T00:00:00') AND from_iso8601_timestamp('2018-01-14T23:59:59')
  const { startDate, endDate } = getDates(req);
  if (startDate && endDate) {
    whereClauses.push(`time >= from_iso8601_timestamp('${startDate}T00:00:00') AND time <= from_iso8601_timestamp('${endDate}T23:59:59')`);
  }

  // Time / Time Range
  // req.params.startTime / req.params.endTime
  // Build WHERE CLAUSE THAT FILTER START/END TIME
  //   cast(date_format(time, '%H.%i') AS double) BETWEEN 13.00 AND 14.59
  const { startTime, endTime } = getTimeRange(req);
  if (startTime && endTime) {
    whereClauses.push(`cast(date_format(time, '%H.%i') AS double) BETWEEN ${startTime} AND ${endTime}`);
  }

  // boundary - req.params.neLatLng, req.params.swLatLng
  // Build WHERE CLAUSE FOR LATLNG BOUNDARY
  //   lat between ${west} and ${east} AND lng between ${south} and ${north}
  const { neLatLng, swLatLng } = getLocation(req);
  if (neLatLng && swLatLng) {
    whereClauses.push(`lat BETWEEN ${swLatLng[0]} AND ${neLatLng[0]}`, `lng BETWEEN ${swLatLng[1]} AND ${neLatLng[1]}`);
  }

  // by-district - req.params.districts
  // Build WHERE CLAUSE FOR DISTRICT
  //   district IN (districts.map(d => `'${d}'`).join(','))
  if (req.params.districts) {
    const districtsInClauses = req.params.districts.split(',').map(d => `'${d.trim()}'`).join(',');
    whereClauses.push(`district IN (${districtsInClauses})`);
  }

  // bikepoints - req.params.bikepoints
  // Build WHERE CLAUSE FOR BIKEPOINTS
  //   id IN (ids.join(','))
  if (req.params.bikepoints && req.params.bikepoints !== '_all') { // Do not filter by bikepoints if the target is _all
    const idInClauses = req.params.bikepoints.split(',').map(id => id.trim()).join(',');
    whereClauses.push(`id IN (${idInClauses})`);
  }

  // top-usage - req.params.count
  // If type is Total
  // ORDER BY totalBikesIn + totalBikesOut
  // LIMIT X
  if (req.params.count) {
    limitClause = `LIMIT ${req.params.count}`;
  }

  const whereClause = whereClauses.join(' AND ');
  const fromClause = `FROM ${config.athenaDb}.${config.athenaTable}`;

  switch (req.params.aggType) {
    case 'total':
    // types: total
    // Do not breakdown
      queryArray.push(
        'SELECT id, location, district, lat, lng,',
        'SUM(start_count) as totalBikesOut, SUM(end_count) as totalBikesIn, SUM(start_count + end_count) as totalBikesCount',
        fromClause,
        `WHERE ${whereClause}`,
        'GROUP BY id, location, district, lat, lng',
        'ORDER BY totalBikesCount DESC',
        limitClause,
      );
      return queryArray.join(' ');

    case 'aggregated-by-day':
    // type: aggregated-by-day
    // Do not breakdown
      queryArray.push(
        'SELECT substr(to_iso8601(time), 1, 10) as date,',
        'SUM(start_count) as totalBikesOut, SUM(end_count) as totalBikesIn, SUM(start_count + end_count) as totalBikesCount',
        fromClause,
        `WHERE ${whereClause}`,
        'GROUP BY substr(to_iso8601(time), 1, 10)',
        'ORDER BY substr(to_iso8601(time), 1, 10) ASC',
        limitClause,
      );
      return queryArray.join(' ');

    case 'by-day':
    // types: by-day
    // Breakdown by days
      queryArray.push(
        'WITH _tmptable AS',
        '(SELECT id, district, location, lat, lng, time, start_count, end_count',
        fromClause,
        `WHERE ${whereClause})`,
        'SELECT id, district, location, lat, lng, substr(to_iso8601(time), 1, 10) AS ts,',
        'SUM(start_count) as bikesOut, SUM(end_count) as bikesIn, SUM(start_count + end_count) as bikesCount',
        'FROM _tmptable',
        `WHERE id in (SELECT id FROM _tmptable GROUP BY id, district, location, lat, lng ORDER BY SUM(start_count + end_count) DESC ${limitClause})`,
        'GROUP BY id, district, location, lat, lng, substr(to_iso8601(time), 1, 10)',
        'ORDER BY id, ts ASC',
      );
      return queryArray.join(' ');

    case 'by-hour':
    // types: by-hour
    // Breakdown by hours
      queryArray.push(
        'WITH _tmptable AS ',
        '(SELECT id, district, location, lat, lng, time, start_count, end_count',
        fromClause,
        `WHERE ${whereClause})`,
        'SELECT id, district, location, lat, lng, substr(to_iso8601(time), 1, 13) AS ts,',
        'SUM(start_count) as bikesOut, SUM(end_count) as bikesIn, SUM(start_count + end_count) as bikesCount',
        'FROM _tmptable',
        `WHERE id in (SELECT id FROM _tmptable GROUP BY id, district, location, lat, lng ORDER BY SUM(start_count + end_count) DESC ${limitClause})`,
        'GROUP BY id, district, location, lat, lng, substr(to_iso8601(time), 1, 13)',
        'ORDER BY id, ts ASC',
      );
      return queryArray.join(' ');

    default:
      return undefined;
  }
}


module.exports = { build };
