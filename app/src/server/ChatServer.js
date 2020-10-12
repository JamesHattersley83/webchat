const jwt = require('jsonwebtoken');
const chatConstants = require('../common/chatConstants');
const {
  addNewUser,
  removeUserByUserID,
  getUserById,
  getUsers,
} = require('../utils/users');

module.exports = class ChatServer {
  constructor(io) {
    this.io = io;
  }

  init() {
    // run when client connects
    this.io.on('connection', (socket) => {
      console.log('New client connected to Chat Server..');
      socket.emit(chatConstants.CONNECTED, {});

      // join message event
      socket.on(chatConstants.JOIN, (userid, username, token) => {
        console.log(token);
        // Verify token
        if (token) {
          console.log('token', token);
          jwt.verify(token, process.env.JWTSECRET, (err) => {
            if (err) {
              console.log(err.message);
            }
          });
        } else {
          socket.disconnect();
        }

        // send array of connected users back to client
        addNewUser(userid, username, socket.id);

        socket.emit(chatConstants.USERS, {
          users: getUsers(),
        });
        // send message to all connected users that new user has joined
        socket.broadcast.emit(chatConstants.JOINED, { userid, username });
      });

      // send message to all connected users that a user has left
      socket.on('disconnect', () => {
        console.log('client disconnected from Chat Server..');
        const user = removeUserByUserID(socket.id);

        if (user !== undefined || user !== null) {
          socket.broadcast.emit(chatConstants.LEFT, user.userid);
        }
      });

      // send chat message to all connected users
      socket.on(chatConstants.MSG, (msg) => {
        const user = getUserById(socket.id);
        const message = msg.content;
        this.io.emit('chat', {
          userid: user.userid,
          content: message,
          msgTime: new Date().getHours() + ':' + new Date().getMinutes(),
        });
      });
    });
  }
};
