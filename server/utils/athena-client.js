const Promise = require('bluebird');

let athena = require('athena-client');
let clientConfig = {
  bucketUri: 's3://clp-hist-data/bike-journey/processed/data/'
};
let awsConfig = {
  region: 'ap-southeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
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
