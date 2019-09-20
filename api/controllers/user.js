const logger = require('../logger');

module.exports = {
  login: function(req, res, next) {
    let username = req.params.username;
    logger.info(`User ${username} attempting to log in`);
    res.status(200).send({});
  },

  register: function(req, res, next) {
    res.status(201).send({});
  }
};
