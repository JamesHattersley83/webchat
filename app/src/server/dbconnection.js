const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, `./config/${process.env.NODE_ENV}.env`),
});

const PORT = process.env.PORT || 4000;

// connect to db
const dbURL = process.env.MONGO_DB_URL;

const connect = new Promise((resolve, reject) => {
  mongoose.connect(
    dbURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log(`Error connecting to: ${dbURL}`);
        return reject(err);
      }
      console.log(`Connected to MongoDB database: ${dbURL}`);
      return resolve();
    }
  );
}).then(() => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = connect;
