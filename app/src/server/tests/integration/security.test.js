const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const SocketClient = require('socket.io-client');
require('dotenv').config();
const generator = require('generate-password');
const chatConstants = require('../../../common/chatConstants');

let password = generator.generate({
  length: 8,
  numbers: true,
});

let username = generator.generate({
  length: 6,
  numbers: false,
});

TEST_URL = process.env.TEST_URL;

let settings;
settings = {
  reconnection: true,
  autoConnect: false,
  transports: ['websocket'],
};

let chatSocket;
let testuserid;
let testusername;

describe('sockets', () => {
  let app = require('../../main');
  before(async () => {
    // register new user & store username and userid
    const res = await request(app)
      .post('/user/')
      .send({ username: username, password: password });
    testusername = res.body.username;
    testuserid = res.body.userid;
  });

  beforeEach((done) => {
    // create socketio object
    chatSocket = SocketClient(TEST_URL, settings);
    chatSocket.on('connect', () => {
      console.log('socket connected');
    });
    done();
  });
  afterEach((done) => {
    done();
  });
  it('Should receive USERS message containing a list of users after sending join message to server', () => {
    return new Promise((resolve) => {
      chatSocket.on(chatConstants.CONNECTED, (data) => {
        resolve(data);
      });
      chatSocket.connect();
    })
      .then((data) => {
        console.log(chatConstants.CONNECTED, data);
        chatSocket.emit(chatConstants.JOIN, testuserid, testusername);
      })
      .then(() => {
        return new Promise((resolve) => {
          chatSocket.on(chatConstants.USERS, (users) => {
            resolve(users);
          });
        });
      })
      .then((users) => {
        console.log(chatConstants.USERS, users);
        expect(user.userid).to.equal(testuserid);
        expect(user.username).to.equal(testusername);
        done();
      });
  });
});
