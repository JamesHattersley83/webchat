const request = require('supertest');
const chai = require('chai');
const generator = require('generate-password');
const expect = chai.expect;
let server;

let password = generator.generate({
  length: 8,
  numbers: true
});

let username = generator.generate({
  length: 6,
  numbers: false
});

describe('user.js', () => {
  server = require('../../main');
  beforeEach(() => {
    server.on('app_started', () => {
      done();
    });
  });
  afterEach(done => {
    done();
  });
  describe('login', () => {
    before(async () => {
      await request(server)
        .post('/user/')
        .send({ username: username, password: password });
    });
    it('should return a status of 200 when username and password match existing user in db', async () => {
      const res = await request(server)
        .post('/user/' + username)
        .send({ username: username, password: password })
        .expect(200);
      expect((username = username), res.body.userid);
    });
  });
  describe('register', () => {
    it('Given a username and password that matches criteria it should create the user account and return the userid and username', async () => {
      const res = await request(server)
        .post('/user/')
        .send({ username: 'James', password: '123456' });
      expect((res.body.userid, (res.body.username = 'James')));
    });
    it('Should pass a status of 400 if the username already exists', async () => {
      await request(server)
        .post('/user/')
        .send({ username: 'James', password: '123456' })
        .expect(400);
    });
    it('Should pass a status of 400 when username and password does not match criteria', async () => {
      await request(server)
        .post('/user/')
        .send({})
        .expect(400);
    });
    it('Should pass a status of 400 when username does not match criteria', async () => {
      await request(server)
        .post('/user/')
        .send({ username: 'jam', password: '123456' })
        .expect(400);
    });
    it('Should pass a status of 400 when password does not match criteria', async () => {
      await request(server)
        .post('/user/')
        .send({ username: 'james', password: '123' })
        .expect(400);
    });
  });
});
