const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
let server;

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
    it('should return a status of 200', async () => {
      await request(server)
        .post('/user/:username')
        .expect(200);
    });
  });
  describe('register', async () => {
    it('Given a username and password that matches criteria it should create the user account and return 201', async () => {
      await request(server)
        .post('/user/')
        .send({ username: 'James', password: '123456' })
        .expect(201)
        .expect((req, res) => {
          res.body.userid = '';
          res.body.username = req.body.username;
        });
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
