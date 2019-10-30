const express = require('express');
const path = require('path');
const users = require('./routes/users');
const bodyParser = require('body-parser');

const app = express();

// init middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

// return 404 status when route does not match
app.get('*', (req, res) => {
  res.status(404).send('Bad Request...');
});

app.use('/user', users);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
