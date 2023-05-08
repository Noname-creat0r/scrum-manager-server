const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.SERVER_PORT;

const authRoutes = require('./auth/authRouter');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routers
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = erorr.statusCode || 500;
  const message = error.message || 'Internal server error';
  const data = error.data;
  res.status(status).json({ message, data});
});

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
})
