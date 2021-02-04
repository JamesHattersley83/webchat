const jwt = require('jsonwebtoken');
const chatConstants = require('../common/chatConstants');
const Chat = require('./models/chat');
const connect = require('./dbconnection');
const {
  addNewUser,
  removeUserByUserID,
  getUserById,
  getUsers,
  getUserbyUserid
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
        // Verify token
        if (token) {
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

      // send private chat to user using socketID
      socket.on(chatConstants.PRIVATE, (data) => {
        const from = getUserById(socket.id)
        const to = getUserbyUserid(data.to)
        const message = data.msg;
        console.log('from:',from);
        console.log('to:',to.socketID);
        console.log('msg:', message);
        this.io.to(to.socketID).emit('private', {
          from: from.userid,
          message: message
        });
      })  

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
