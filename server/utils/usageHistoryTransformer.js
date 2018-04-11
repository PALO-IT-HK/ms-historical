const _ = require('lodash');

function getBoundaryByDay(results) {
  let response = [];
  let groupedResults = _.groupBy(results, 'id');
  _.map(groupedResults, groupData => {
    let data = {};
    data.location = groupData[0]['location'];
    data.district = groupData[0]['district'];
    data.id = groupData[0]['id'];
    data.lat = groupData[0]['lat'];
    data.lng = groupData[0]['lng'];
    data.breakdown = [];
    let sumTotalBikesIn = 0;
    let sumTotalBikesOut = 0;
    _.map(groupData, dayData => {
      let breakdownData = {};
      breakdownData.ts = dayData.day;
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
