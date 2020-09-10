require('dotenv').config();
const ChatServer = require('./ChatServer');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const users = require('./routes/users');
const chat = require('./routes/chat');

const app = express();

// init middleware
app.use(express.json({ extended: true }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.use('/user', users);
app.use('/chat/history', chat);

const PORT = process.env.PORT || 4000;

let requestHandler = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socketIO(requestHandler);

const chatServer = new ChatServer(io);
chatServer.init();

module.exports = app;
