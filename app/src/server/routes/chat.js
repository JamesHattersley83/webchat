const express = require('express');
const router = express.Router();
const chatHistory = require('../controllers/chat');

router.get('/:count', chatHistory.getfilteredChatHistory);

module.exports = router;
