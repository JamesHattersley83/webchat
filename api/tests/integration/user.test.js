const request = require('supertest');
const chai = require('chai');
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
  describe('register', () => {
    it('should return a status of 201', async () => {
      await request(server)
        .post('/user/')
        .expect(201);
    });
  });
});
