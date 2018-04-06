var app = require('../server/routes');
var chai = require('chai');
var request = require('supertest');
var api = request('http://localhost:3000');

var expect = chai.expect;

describe('Index / ', function() {
  it('should return OK', function(done) {
    api.get('/usages/healthcheck').end(function(err, res) {
      if (err) {
        console.log(err);
      }
      console.log('Success');
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
