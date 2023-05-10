const jwt = require('jsonwebtoken');
const db = require('../models');

exports.signin = (req, res, next) => {
  try { 
    const { email, password } = req.body;
     

  } catch(error) {
    console.log(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
  
    const isSignedUp = await db.User.findOne({
     where: { name: name, email: email },
    });
  
    if (isSignedUp) {
      throw new Error("This user has already been signed up");
    }
  
     const newUser = await db.User.create({
       name: name,
       email: email,
       password: password
    });
  
    res.status(201).json({
      message: "New user has been signed up successfully",
      userId: newUser.id
    })
  
  } catch(error) {
    console.log(error);
    next(error);
  }
};

