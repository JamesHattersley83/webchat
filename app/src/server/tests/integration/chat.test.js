const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const io = require('socket.io-client');

describe('sockets', () => {
  let app = require('../../main');
  before(() => {
    // create socketio connection
    let socketUrl = 'http://localhost:4000';

    let options = {
      transports: ['websocket'],
      'force new connection': true
    };

    client = io.connect(socketUrl, options);
  });
  it('It should send and receive and message', done => {
    // setup event handlers for listening for message
    client.on('test', data => {
      console.log('Data: ', data);
      done();
    });
    client.connect();
  });
});
