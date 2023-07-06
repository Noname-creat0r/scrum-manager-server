const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../../db/models');
const { throwError } = require ('../../util/error');

exports.signin = async (req, res, next) => {
  try { 
    const { email, password } = req.body;
  
    const user = await db.User.findOne({
      where: { email: email }
    })

    if (!user) {
      throwError(401, 'This user need to sign up first!')
    }

    const isRightPass = await bcrypt.compare(password, user.password);
    
    if (!isRightPass) {
      throwError(401, 'Wrong password!')
    }

    const key = process.env.KEY
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        email: email,
        userId: user.id.toString()
      }, 
      key
    )

    res.status(201).json({ userId: user.id, token })

  } catch(error) {
    next(error);  
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
  
    const isSignedUp = await db.User.findOne({
     where: { name: name, email: email },
    });
  
    if (isSignedUp) {
      throwError(403, 'This user has already been signed up!')
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
    next(error);
  }
};

