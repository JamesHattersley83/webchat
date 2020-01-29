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

TEST_URL = process.env.TEST_URL;

let settings;
settings = {
  reconnection: true,
  autoConnect: false,
  transports: ['websocket']
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

  beforeEach(async () => {
    // create socketio object
    chatSocket = SocketClient(TEST_URL, settings);
    chatSocket.on('connect', () => {
      console.log('socket connected');
    });
  });
  afterEach(() => {
    chatSocket.disconnect();
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
      chatSocket.emit(chatConstants.JOIN, testuserid, testusername);
      // setup event handlers listening for users message
      chatSocket.on('users', users => {
        console.log(users);
        done();
      });
    });
    chatSocket.connect();
  });
});
