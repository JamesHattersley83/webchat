require('dotenv').config();
const logger = require('./logger');
const express = require('express');
const user = require('./routes/user');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5000;

// connect to db
const dbURL = process.env.MONGO_DB_URL;

const server = new Promise((resolve, reject) => {
  mongoose.connect(dbURL, { useNewUrlParser: true }, err => {
    if (err) {
      logger.error(`Error connecting to: ${dbURL}`);
      return reject(err);
    }
    logger.info(`Connected to MongoDB database: ${dbURL}`);
    return resolve();
  });
}).then(() => {
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}...`);
  });
});

app.use('/user', user);

// return 404 status when route does not match
app.get('*', (req, res) => {
  res.status(404).send('Bad Request...');
});

module.exports = server;
