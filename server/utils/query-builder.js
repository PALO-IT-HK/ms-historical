function build(req) {
  let queryString;

  if (
    req.params.neLatLng &&
    req.params.swLatLng &&
    req.params.startDate &&
    req.params.endDate &&
    req.params.aggType &&
    req.params.aggType === 'total'
  ) {
    //boundary
    let { neArray, swLatLng } = getLocation();
    let { startDate, endDate } = getDates(req);
    queryString = `
    SELECT id, location, district, lat, lng, sum(start_count) as totalBikesOut, sum(end_count) as totalBikesIn FROM clp_bike_poc.journey_data
    WHERE time >= from_iso8601_timestamp('${startDate}T00:00:00') AND time <= from_iso8601_timestamp('${endDate}T23:59:59')
      AND lat BETWEEN ${neArray[0]} AND ${swLatLng[0]}
      AND lng BETWEEN ${neArray[1]} AND ${swLatLng[1]}
    GROUP BY id, location, district, lat, lng ORDER BY totalBikesOut desc`;
  } else if (
    req.params.count &&
    req.params.aggType &&
    req.params.aggType === 'total'
  ) {
    //by count
    let { startDate, endDate } = getDates(req);
    queryString = `SELECT id, location, district, lat, lng, sum(start_count) as totalBikesOut, sum(end_count) as totalBikesIn, SUM(start_count + end_count) as totalBikesCount  FROM clp_bike_poc.journey_data
    WHERE time >= from_iso8601_timestamp('${startDate}T00:00:00') AND time <= from_iso8601_timestamp('${endDate}T23:59:59')
    GROUP BY id, location, district, lat, lng
    ORDER by totalBikesCount desc
limit ${req.params.count};`;
  } else if (
    req.params.district &&
    req.params.aggType &&
    req.params.aggType === 'total'
  ) {
    //by district
    let { startDate, endDate } = getDates(req);
    queryString = `SELECT id, location, district, lat, lng, sum(start_count) as totalBikesOut, sum(end_count) as totalBikesIn, SUM(start_count + end_count) as totalBikesCount  FROM clp_bike_poc.journey_data
    WHERE time >= from_iso8601_timestamp('${startDate}T00:00:00') AND time <= from_iso8601_timestamp('${endDate}T23:59:59') AND district='${
      req.params.district
    }'
    GROUP BY id, location, district, lat, lng
    ORDER by totalBikesCount desc`;
  } else if (
    req.params.bikepoints &&
    req.params.aggType &&
    req.params.aggType === 'total'
  ) {
    let { startDate, endDate } = getDates(req);
    queryString = `SELECT id, location, district, lat, lng, sum(start_count) as totalBikesOut, sum(end_count) as totalBikesIn, SUM(start_count + end_count) as totalBikesCount  FROM clp_bike_poc.journey_data
    WHERE time >= from_iso8601_timestamp('${startDate}T00:00:00') AND time <= from_iso8601_timestamp('${endDate}T23:59:59') AND id in (${
      req.params.bikepoints
    })
    GROUP BY id, location, district, lat, lng
    ORDER by totalBikesCount desc`;
  }
  return queryString;
}

function getLocation() {
  let neArray = req.params.neLatLng.split(',');
  let swLatLng = req.params.swLatLng.split(',');
  return { neArray, swLatLng };
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
