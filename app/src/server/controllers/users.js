const path = require('path');
require('dotenv').config();
const request = require('request-promise');
const jwt = require('jsonwebtoken');

URL = process.env.URL;

module.exports = {
  debug: function(req, res, next) {
    console.log(req.userData);
    return res.send('Complete');
  },

  register: (req, res, next) => {
    new Promise((resolve, reject) => {
      let options = {
        method: 'POST',
        uri: URL,
        body: { username: req.body.username, password: req.body.password },
        json: true,
        resolveWithFullResponse: true,
        simple: false
      };

      request(options)
        .then(result => {
          let dataResponse = {
            success: false,
            userid: '',
            username: '',
            token: ''
          };
          if (result.statusCode === 201) {
            dataResponse.success = true;
            dataResponse.userid = result.body.userid;
            dataResponse.username = result.body.username;
            dataResponse.token = jwt.sign(
              {
                username: result.body.username,
                userid: result.body.userid
              },
              process.env.JWTSECRET,
              { expiresIn: '12h' }
            );
          }
          res.status(result.statusCode).send(dataResponse);
          resolve();
        })
        .catch(function(err) {
          console.log(err);
          res.status(500).send('Server error...');
          reject();
        });
    });
  },

  login: (req, res, next) => {
    new Promise((resolve, reject) => {
      let options = {
        method: 'POST',
        uri: URL + req.params.username,
        body: { password: req.body.password },
        json: true,
        resolveWithFullResponse: true,
        simple: false
      };

      request(options)
        .then(result => {
          let dataResponse = {
            success: false,
            userid: '',
            username: '',
            token: ''
          };
          if (result.statusCode === 200) {
            dataResponse.success = true;
            dataResponse.userid = result.body.userid;
            dataResponse.username = result.body.username;
            dataResponse.token = jwt.sign(
              {
                username: result.body.username,
                userid: result.body.userid
              },
              process.env.JWTSECRET,
              { expiresIn: '12h' }
            );
          }
          res.status(result.statusCode).send(dataResponse);
          resolve();
        })
        .catch(function(err) {
          console.log(err);
          res.status(500).send('Server error...');
          reject();
        });
    });
  }
};
