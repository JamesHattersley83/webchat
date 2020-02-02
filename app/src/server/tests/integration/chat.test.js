const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const SocketClient = require('socket.io-client');
require('dotenv').config();
const generator = require('generate-password');
const chatConstants = require('../../../common/chatConstants');

let password = generator.generate({
  length: 8,
  numbers: true
});

let username = generator.generate({
  length: 6,
  numbers: false
});

let password2 = generator.generate({
  length: 8,
  numbers: true
});

let username2 = generator.generate({
  length: 6,
  numbers: false
});

TEST_URL = process.env.TEST_URL;

let settings;
settings = {
  reconnection: true,
  autoConnect: false,
  transports: ['websocket']
};

let chatSocket;
let chatSocket2;
let testuserid1;
let testusername1;
let testuserid2;
let testusername2;

describe('sockets', () => {
  let app = require('../../main');
  before(async () => {
    // register new user & store username and userid
    const res = await request(app)
      .post('/user/')
      .send({ username: username, password: password });
    testusername1 = res.body.username;
    testuserid1 = res.body.userid;
    const res2 = await request(app)
      .post('/user/')
      .send({ username: username2, password: password2 });
    testusername2 = res2.body.username;
    testuserid2 = res2.body.userid;
  });

  beforeEach(done => {
    // create socketio object
    chatSocket = SocketClient(TEST_URL, settings);
    chatSocket.on('connect', () => {
      console.log('socket connected');
    });
    chatSocket2 = SocketClient(TEST_URL, settings);
    chatSocket2.on('connect', () => {
      console.log('socket 2 connected');
    });
    done();
  });
  afterEach(done => {
    chatSocket.disconnect();
    chatSocket2.disconnect();
    done();
  });
  it('It should receive connected message when socket connects', function(done) {
    // setup event handlers listening for connected message
    chatSocket.on(chatConstants.CONNECTED, data => {
      console.log(chatConstants.CONNECTED, data);
      done();
    });
    chatSocket.connect();
  });
  it('It should send the join message to server when connected', function(done) {
    // setup event handlers listening for connected message
    chatSocket.on(chatConstants.CONNECTED, () => {
      // send join message when connected is received
      chatSocket.emit(chatConstants.JOIN, testuserid1, testusername1);
      // setup event handlers listening for users message
      chatSocket.on('users', users => {
        console.log(users);
        done();
      });
    });
    chatSocket.connect();
  });
  it('Should broadcast new user to all connected users', function(done) {
    // connect socket and receive connected message
    chatSocket.on(chatConstants.CONNECTED, () => {
      // send join message when connected is received
      chatSocket.emit(chatConstants.JOIN, testuserid1, testusername1);
      // connect socket2 and receive connected message
      chatSocket2.on(chatConstants.CONNECTED, () => {
        // send join message when connected is received
        chatSocket2.emit(chatConstants.JOIN, testuserid2, testusername2);
        // setup event handlers listening for users message
        chatSocket.on(chatConstants.USERS, users => {
          console.log(users);
          done();
        });
      });
      // socket to receive joined message with socket2 data
      chatSocket.on(chatConstants.JOINED, user => {
        console.log(chatConstants.JOINED, user);
      });
    });

    chatSocket.connect();
    chatSocket2.connect();
  });
});
