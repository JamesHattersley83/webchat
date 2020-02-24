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
let message = 'Hello World';

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
    // chatSocket.disconnect();
    // chatSocket2.disconnect();
    done();
  });
  it('Should receive the CONNECTED message when socket connects', () => {
    return new Promise(resolve => {
      chatSocket.on(chatConstants.CONNECTED, data => {
        resolve(data);
      });
      chatSocket.connect();
    }).then(data => {
      console.log(chatConstants.CONNECTED, data);
    });
  });

  it('Should receive USERS message containing a list of users after sending join message to server', () => {
    return new Promise(resolve => {
      chatSocket.on(chatConstants.CONNECTED, data => {
        resolve(data);
      });
      chatSocket.connect();
    })
      .then(data => {
        console.log(chatConstants.CONNECTED, data);
        chatSocket.emit(chatConstants.JOIN, testuserid1, testusername1);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket.on(chatConstants.USERS, users => {
            resolve(users);
          });
        });
      })
      .then(users => {
        console.log(chatConstants.USERS, users);
      });
  });

  it('Should receive a JOINED message containing the userid of new user joined', done => {
    new Promise(resolve => {
      chatSocket.on(chatConstants.CONNECTED, data => {
        resolve(data);
      });
      chatSocket.connect();
    })
      .then(data => {
        console.log(chatConstants.CONNECTED, data);
        chatSocket.emit(chatConstants.JOIN, testuserid1, testusername1);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket.on(chatConstants.USERS, users => {
            resolve(users);
          });
        });
      })
      .then(users => {
        console.log(chatConstants.USERS, users);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket2.on(chatConstants.CONNECTED, data => {
            resolve(data);
          });
          chatSocket2.connect();
        });
      })
      .then(data => {
        console.log(chatConstants.CONNECTED, data);
        chatSocket2.emit(chatConstants.JOIN, testuserid2, testusername2);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket.on(chatConstants.JOINED, user => {
            resolve(user);
          });
        });
      })
      .then(user => {
        console.log(chatConstants.JOINED, user);
        expect(user.userid).to.equal(testuserid2);
        expect(user.username).to.equal(testusername2);
        done();
      });
  });
  it('Should receive a LEFT message containing the userid of the user disconnected', done => {
    new Promise(resolve => {
      chatSocket.on(chatConstants.CONNECTED, data => {
        resolve(data);
      });
      chatSocket.connect();
    })
      .then(data => {
        console.log(chatConstants.CONNECTED, data);
        chatSocket.emit(chatConstants.JOIN, testuserid1, testusername1);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket.on(chatConstants.USERS, users => {
            resolve(users);
          });
        });
      })
      .then(users => {
        console.log(chatConstants.USERS, users);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket2.on(chatConstants.CONNECTED, data => {
            resolve(data);
          });
          chatSocket2.connect();
        });
      })
      .then(data => {
        console.log(chatConstants.CONNECTED, data);
        chatSocket2.emit(chatConstants.JOIN, testuserid2, testusername2);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket.on(chatConstants.JOINED, user => {
            resolve(user);
          });
        });
      })
      .then(user => {
        console.log(chatConstants.JOINED, user);
        expect(user.userid).to.equal(testuserid2);
        expect(user.username).to.equal(testusername2);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket.on(chatConstants.LEFT, user => {
            resolve(user);
          });
          chatSocket2.disconnect();
        });
      })
      .then(user => {
        console.log(chatConstants.LEFT, user);
        expect(user.userid).to.equal(testuserid2);
        done();
      });
  });
  it('Should receive a MSG message containing the userid, msg and msgTime', done => {
    new Promise(resolve => {
      chatSocket.on(chatConstants.CONNECTED, data => {
        resolve(data);
      });
      chatSocket.connect();
    })
      .then(data => {
        console.log(chatConstants.CONNECTED, data);
        chatSocket.emit(chatConstants.JOIN, testuserid1, testusername1);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket.on(chatConstants.USERS, users => {
            resolve(users);
          });
        });
      })
      .then(users => {
        console.log(chatConstants.USERS, users);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket2.on(chatConstants.CONNECTED, data => {
            resolve(data);
          });
          chatSocket2.connect();
        });
      })
      .then(data => {
        console.log(chatConstants.CONNECTED, data);
        chatSocket2.emit(chatConstants.JOIN, testuserid2, testusername2);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket.on(chatConstants.JOINED, user => {
            resolve(user);
          });
        });
      })
      .then(user => {
        console.log(chatConstants.JOINED, user);
        expect(user.userid).to.equal(testuserid2);
        expect(user.username).to.equal(testusername2);
      })
      .then(() => {
        chatSocket.emit(chatConstants.MSG, message);
      })
      .then(() => {
        return new Promise(resolve => {
          chatSocket.on('chat', data => {
            resolve(data);
            console.log('inside client', data);
          });
        });
      })
      .then(data => {
        expect(data.userid).to.equal(testuserid1);
        expect(data.msg).to.equal(message);
        expect(data.msgTime).to.equal(
          new Date().getHours() + ':' + new Date().getMinutes()
        );
        done();
      });
  });
});
