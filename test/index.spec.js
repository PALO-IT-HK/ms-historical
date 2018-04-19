const { expect } = require('chai');
const request = require('supertest');

const api = request('http://localhost:3000');

describe('Index / ', () => {
  it('should return OK', (done) => {
    api.get('/usages/healthcheck').end((err, res) => {
      if (err) {
        console.log(err);
      }
      console.log('Success');
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
