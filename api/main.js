require("dotenv").config();
const logger = require("./logger");
const express = require("express");
const user = require("./routes/user");
const app = express();

app.use("/user", user);

// return 404 status when route does not match
app.get("*", function(req, res) {
  res.status(404).send("Bad Request...");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}...`);
});

module.exports = server;
