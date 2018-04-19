const _ = require('lodash');

function groupByBikepoints(results) {
  const groupedResults = _.groupBy(
    _.map(results, entry => ({
      ...entry,
      bikesIn: parseInt(entry.bikesIn, 10),
      bikesOut: parseInt(entry.bikesOut, 10),
      bikesCount: parseInt(entry.bikesCount, 10),
      ts: new Date(entry.ts.includes('T') ? `${entry.ts}:00:00Z` : `${entry.ts}T00:00:00Z`),
    })),
    'id',
  );

  return _.orderBy(_.map(groupedResults, (dataById) => {
    const sortedData = _.orderBy(dataById, 'ts', 'asc');

    return {
      id: Number(sortedData[0].id),
      location: sortedData[0].location,
      district: sortedData[0].district,
      lat: Number(sortedData[0].lat),
      lng: Number(sortedData[0].lng),
      totalBikesIn: _.reduce(sortedData, (accum, entry) => accum + entry.bikesIn, 0),
      totalBikesOut: _.reduce(sortedData, (accum, entry) => accum + entry.bikesOut, 0),
      totalBikesCount: _.reduce(sortedData, (accum, entry) => accum + entry.bikesCount, 0),
      breakdown: _.map(sortedData, entry => ({
        ts: entry.ts.toISOString(),
        bikesIn: entry.bikesIn,
        bikesOut: entry.bikesOut,
        bikesCount: entry.bikesCount,
      })),
    };
  }), 'totalBikesCount', 'desc');
}

module.exports = {
  groupByBikepoints,
};
