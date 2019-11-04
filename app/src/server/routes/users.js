const express = require('express');
const router = express.Router();
const user_register = require('../controllers/users');

router.post('/', user_register.register);

router.post('/:username', (req, res) => {
  res.status(500);
});

module.exports = router;
