const _ = require('lodash');
const moment = require('moment');

function getBoundaryByDay(results) {
  let response = [];
  let groupedResults = _.groupBy(results, 'id');
  _.map(groupedResults, groupData => {
    sortedArray = _.orderBy(groupData, 'day', 'asc');
    let data = {};
    data.location = sortedArray[0]['location'];
    data.district = sortedArray[0]['district'];
    data.id = sortedArray[0]['id'];
    data.lat = sortedArray[0]['lat'];
    data.lng = sortedArray[0]['lng'];
    data.breakdown = [];
    let sumTotalBikesIn = 0;
    let sumTotalBikesOut = 0;
    _.map(sortedArray, dayData => {
      let breakdownData = {};
      let formattedDate = dayData.day.includes('T')
        ? `${dayData.day}:00Z`
        : `${dayData.day}T00:00Z`;
      breakdownData.ts = moment(formattedDate).toISOString();
      breakdownData.bikesIn = dayData.totalBikesIn;
      breakdownData.bikesOut = dayData.totalBikesOut;
      sumTotalBikesIn += parseInt(dayData.totalBikesIn);
      sumTotalBikesOut += parseInt(dayData.totalBikesOut);
      data.breakdown.push(breakdownData);
    });
    data.totalBikesIn = sumTotalBikesIn;
    data.totalBikesOut = sumTotalBikesOut;
    response.push(data);
  });
  return response;
}
module.exports = {
  getBoundaryByDay
};
