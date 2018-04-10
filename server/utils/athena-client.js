const Promise = require('bluebird');
const config = require('../config');

let athena = require('athena-client');
let clientConfig = {
  bucketUri: config.athenaResultsBucket
};
let awsConfig = {
  region: config.awsRegion
};
let client = athena.createClient(clientConfig, awsConfig);
function getDataFromAthena(query) {
  return new Promise((resolve, reject) =>
    client
      .execute(query)
      .toPromise()
      .then(function(data) {
        console.log(data);
        resolve(data);
      })
      .catch(function(err) {
        console.error(err);
        reject(err);
      })
  );
}

module.exports = {
  getDataFromAthena
};
