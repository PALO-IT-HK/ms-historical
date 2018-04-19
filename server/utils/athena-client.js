const Promise = require('bluebird');
const config = require('../config');

const athena = require('athena-client');

const clientConfig = {
  bucketUri: config.athenaResultsBucket,
};
const awsConfig = {
  region: config.awsRegion,
};
const client = athena.createClient(clientConfig, awsConfig);
function getDataFromAthena(query) {
  return new Promise((resolve, reject) =>
    client
      .execute(query)
      .toPromise()
      .then((data) => {
        // console.log(data);
        resolve(data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      }));
}

module.exports = {
  getDataFromAthena,
};
