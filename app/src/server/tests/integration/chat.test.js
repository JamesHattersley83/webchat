const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const SocketClient = require('socket.io-client');
require('dotenv').config();

TEST_URL = process.env.TEST_URL;

let settings;
settings = {
  reconnection: false,
  autoConnect: false,
  transports: ['websocket']
};

let chatSocket;

describe('sockets', () => {
  let app = require('../../main');

  before(() => {
    // create socketio connection
    chatSocket = SocketClient(TEST_URL, settings);
    chatSocket.on('connect', () => {
      console.log('connected');
    });
  });
  it('It should receive a message when connected', function(done) {
    // setup event handlers for listening for message
    chatSocket.on('test', data => {
      console.log('Data: ', data);
      done();
    });
    chatSocket.connect();
  });
});
