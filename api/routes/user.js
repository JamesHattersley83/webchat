const express = require('express');
const router = express.Router();
const user_auth = require('../controllers/user');

router.get('/', (req, res) => {
  res.status(200).send('Good request...');
});

router.post('/', user_auth.register);

router.post('/:username', user_auth.login);

module.exports = router;
