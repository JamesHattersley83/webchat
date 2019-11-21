const request = require('supertest');
const chai = require('chai');
const generator = require('generate-password');
const expect = chai.expect;

let password = generator.generate({
  length: 8,
  numbers: true
});

let username = generator.generate({
  length: 6,
  numbers: false
});

let app = require('../../main');

describe('Register, POST /user', () => {
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

describe('login, POST /user/:username', () => {
  before(async () => {
    await request(app)
      .post('/user/')
      .send({ username: username, password: password });
  });
  it('It should return a status of 200 with successful login', async () => {
    const res = await request(app)
      .post('/user/' + username)
      .send({ username: username, password: password });
    expect(200);
    expect(res.body).to.contain.property('success');
    expect(res.body).to.contain.property('userid');
    expect(res.body).to.contain.property('username');
    expect(res.body).to.contain.property('token');
  });
});
