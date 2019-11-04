const request = require('request-promise');

module.exports = {
  register: function(req, res, next) {
    const { success, userid, username, token } = req.body;
    // res.status(500).send({
    //   success: success,
    //   userid: userid,
    //   username: username,
    //   token: token
    // });

    new Promise((resolve, reject) => {
      let options = {
        method: 'POST',
        uri: `http://localhost:3000/user`,
        body: {
          success: success,
          userid: userid,
          username: username,
          token: token
        },
        json: true
      };

      request(options)
        .then(result => {
          res.send('User sucessfully registered');
          resolve();
        })
        .catch(err => {
          console.log(err);
          res.send('error');
          return;
        });
    });
  }
};
