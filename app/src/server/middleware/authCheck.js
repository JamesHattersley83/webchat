const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // check if authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  // verify jwt
  return jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }

    req.userData = {};
    req.userData.token = token;
    req.userData.userid = decoded.userid;
    req.userData.username = decoded.username;

    return next();
  });
};
