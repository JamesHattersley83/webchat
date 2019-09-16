module.exports = {
  login: function(req, res, next) {
    logger.info(`User ${username} attempting to login`);
    res.status(200);
  },

  register: function(req, res, next) {
    res.status(201);
  }
};
