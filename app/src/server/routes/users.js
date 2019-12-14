const express = require('express');
const router = express.Router();
const user_register = require('../controllers/users');
const authCheck = require('../middleware/authCheck');

router.use('/:username', authCheck);

router.post('/', user_register.register);

router.post('/:username', user_register.login);

router.get('/:username', user_register.debug);

module.exports = router;
