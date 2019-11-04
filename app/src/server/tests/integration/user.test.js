const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

let app = require('../../main');

describe('POST /user', () => {
  it('It should return a status of 201', async () => {
    await request(app)
      .post('/user')
      .send({ success: 'false', userid: '1', username: 'james', token: '1234' })
      .expect(201);
  });
});
