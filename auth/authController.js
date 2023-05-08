const jwt = require('jsonwebtoken');
const { db } = require('../db/database');

exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  
};

exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  
};

