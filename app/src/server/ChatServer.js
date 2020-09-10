const chatConstants = require('../common/chatConstants');
const Chat = require('./models/chat');
const connect = require('./dbconnection');
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
      socket.on(chatConstants.JOIN, (userid, username) => {
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
        socket.broadcast.emit(chatConstants.LEFT, user.userid);
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

        // save message to database
        try {
          connect.then(() => {
            console.log('connected to mongodb...');

            let chatMessage = new Chat({
              userid: user.userid,
              message: message,
              time: message.msgTime,
            });
            chatMessage.save();
          });
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      });
    });
  }
};
