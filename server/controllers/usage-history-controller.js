const Promise = require('bluebird');
const athena = require('../utils/athena-client');
const queryBuilder = require('../utils/query-builder');
const transformer = require('../utils/usage-history-transformer');

function query(req, res, next) {
  const query = queryBuilder.build(req);
  console.log({
    query,
    msg: 'performing query',
  });
  athena.getDataFromAthena(query).then(data => {
    console.log({
      params: req.params,
      queryExecution: data.queryExecution,
    });
    let results;
    switch(req.params.aggType) {
      case 'by-day':
      case 'by-hour':
        results = transformer.groupByBikepoints(data.records);
        break;
      case 'total':
        results = data.records.map((entry) => ({
          ...entry,
          id: Number(entry.id),
          lat: Number(entry.lat),
          lng: Number(entry.lng),
          totalBikesOut: Number(entry.totalBikesOut),
          totalBikesIn: Number(entry.totalBikesIn),
          totalBikesCount: Number(entry.totalBikesCount),
        }));
        break;
      case 'aggregated-by-day':
        results = data.records.map((entry) => ({
          ...entry,
          totalBikesOut: Number(entry.totalBikesOut),
          totalBikesIn: Number(entry.totalBikesIn),
          totalBikesCount: Number(entry.totalBikesCount),
        }));
        break;
      default:
        results = data.records;
    }
    res.status(200).send(results);
  });
}

module.exports.query = query;
