const logger = require('../logger');
const db = require('../db');
const Joi = require('@hapi/joi');
const User = require('../models/user');

module.exports = {
  login: function(req, res, next) {
    let username = req.params.username;
    logger.info(`User ${username} attempting to log in`);
    res.status(520).send({});
  },

  register: function(req, res, next) {
    // define validation schema
    const schema = Joi.object({
      // username is require, min 4 / max 8
      username: Joi.string()
        .alphanum()
        .min(4)
        .max(8)
        .required(),

      // password is require, min 6 / max 8 and no spaces
      password: Joi.string()
        .min(6)
        .max(8)
        .trim()
        .required()
    });

    const result = schema.validate(req.body);

    if (result.error) {
      // 400 Bad Request
      res.status(400).send(result.error.details[0].message);
      return;
    }

    // save new user
    user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(error => {
      if (error) {
        res.status(500);
        logger.error(`Error has occured: ${error}`);
        return;
      }
      res.status(201).send('User is successfully registered');
    });
  }
};
