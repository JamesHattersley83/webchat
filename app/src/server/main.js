require('dotenv').config();
const express = require('express');
const path = require('path');
const users = require('./routes/users');

const app = express();

// init middleware
app.use(express.json({ extended: true }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.use('/user', users);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
