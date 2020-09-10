const Chat = require('../models/chat');
const connect = require('../dbconnection');

module.exports = {
  getfilteredChatHistory: (req, res, next) => {
    let count = parseInt(req.params.count);
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    connect.then(() => {
      Chat.find({})
        .limit(count)
        .sort({ time: -1 })
        .then((chat) => {
          res.json(chat);
        });
    });
  },
};
