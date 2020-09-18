const express = require('express');
const router = express.Router();
const chatHistory = require('../controllers/chat');
const authCheck = require('../middleware/authCheck');

router.use('/:count', authCheck);

router.get('/:count', chatHistory.getfilteredChatHistory);

module.exports = router;
