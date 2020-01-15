const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const SocketClient = require('socket.io-client');

let settings;
settings = {
  reconnection: false,
  autoConnect: false,
  transports: ['websocket']
};

let chatSocket = SocketClient('/', settings);

describe('sockets', () => {
  let app = require('../../main');

  before(() => {
    // create socketio connection
    chatSocket.on('connect', () => {
      console.log('connected');
    });
  });
  it('It should send and receive and message', () => {
    // setup event handlers for listening for message
    chatSocket.on('test', data => {
      console.log('Data: ', data);
      done();
    });
    chatSocket.connect();
  });
});
