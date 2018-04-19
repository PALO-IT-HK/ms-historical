module.exports = {
  awsRegion: process.env.AWS_REGION || 'ap-southeast-1',
  athenaDb: process.env.ATHENA_DB || 'clp_bike_poc',
  athenaTable: process.env.ATHENA_TABLE || 'journey_data',
  endpointBaseUrl: process.env.ENDPOINT_BASEINTERFACE || 'localhost:3000',
  athenaResultsBucket:
    process.env.ATHENA_RESULT_BUCKET ||
    's3://aws-athena-query-usages-results-781857564217-ap-southeast-1',
  is_mock_data: false,
};
