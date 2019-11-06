const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

let app = require('../../main');

describe('POST /user', () => {
  it('It should return a status of 201', done => {
    request(app)
      .post('/user')
      .send({ username: 'Barry', password: '456778' })
      .end((err, res) => {
        const body = res.body;
        expect(res.statusCode).to.equal(201);
        expect(body).to.be.an('object');
        expect(body).to.include({
          success: false,
          userid: '',
          username: '',
          token: ''
        });
        done();
      });
  });
});
