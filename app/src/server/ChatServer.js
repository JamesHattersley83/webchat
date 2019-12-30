class ChatServer {
  constructor(io) {
    this.io = io;
  }

  init() {
    this.io.on('connection', socket => {
      console.log('New client connected to Chat Server..');
      socket.emit('test', { hello: 'world' });
    });
  }
}
