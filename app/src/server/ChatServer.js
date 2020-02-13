const chatConstants = require('../common/chatConstants');

module.exports = class ChatServer {
  constructor(io) {
    this.io = io;
  }

  init() {
    this.io.on('connection', socket => {
      console.log('New client connected to Chat Server..');
      socket.emit(chatConstants.CONNECTED, {});

      // join message event
      socket.on(chatConstants.JOIN, (userid, username) => {
        // send array of connected users back to client
        socket.emit(chatConstants.USERS, {
          users: [{ userid: userid, username: username }]
        });
        // send message to all connected users that new user has joined
        socket.broadcast.emit(chatConstants.JOINED, {
          userid: userid,
          username: username
        });
      });
    });
  }
};
