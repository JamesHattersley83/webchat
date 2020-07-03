const chatConstants = require('../common/chatConstants');

module.exports = class ChatServer {
  constructor(io) {
    this.io = io;
  }

  init() {
    this.io.on('connection', (socket) => {
      console.log('New client connected to Chat Server..');
      socket.emit(chatConstants.CONNECTED, {});

      // join message event
      socket.on(chatConstants.JOIN, (userid, username) => {
        // send array of connected users back to client
        socket.emit(chatConstants.USERS, {
          users: [{ userid: userid, username: username }],
        });
        // send message to all connected users that new user has joined
        socket.broadcast.emit(chatConstants.JOINED, {
          userid: userid,
          username: username,
        });
        // send message to all connected users that a user has left
        socket.on('disconnect', () => {
          console.log('client disconnected from Chat Server..');
          socket.broadcast.emit(chatConstants.LEFT, {
            userid: userid,
          });
        });
        // send chat message to all connected users
        socket.on(chatConstants.MSG, (msg) => {
          socket.emit('chat', {
            userid: userid,
            msg: msg,
            msgTime: new Date().getHours() + ':' + new Date().getMinutes(),
          });
        });
      });
    });
  }
};
