module.exports = {
  login: function(req, res, next) {
    logger.info(`User ${username} attempting to log in`);
    res.status(200);
  },

  register: function(req, res, next) {
    res.status(201);
  }
};
