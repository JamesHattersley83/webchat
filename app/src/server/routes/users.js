const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.status(500);
});

router.post('/:username', (req, res) => {
  res.status(500);
});

module.exports = router;
