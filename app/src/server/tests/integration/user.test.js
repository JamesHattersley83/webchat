const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

let app = require('../../main');

describe('POST /user', () => {
  it('It should return a status of 201', async () => {
    const res = await request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ username: 'test3', password: '123456' });
    expect(201);
    expect(res.body).to.contain.property('success');
    expect(res.body).to.contain.property('userid');
    expect(res.body).to.contain.property('username');
    expect(res.body).to.contain.property('token');
  });
});
