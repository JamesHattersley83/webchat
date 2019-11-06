require('dotenv').config();
const request = require('request-promise');

module.exports = {
  register: (req, res, next) => {
    new Promise((resolve, reject) => {
      let options = {
        method: 'POST',
        uri: 'http://localhost:3000/user',
        body: { username: req.body.username, password: req.body.password },
        json: true
      };

      request(options)
        .then(function(result) {
          res
            .status(201)
            .send({ success: false, userid: '', username: '', token: '' });
          resolve();
        })
        .catch(function(err) {
          console.log(err);
          res.status(400).send('user already exists');
          return;
        });
    });
  }
};
