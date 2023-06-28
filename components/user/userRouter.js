const express = require("express");
const userController = require('./userController');
const { isAuth } = require('../auth/authMiddleware')

const router = express.Router();

router.get('/:id', userController.getUser)
router.delete('/',  userController.deleteUser);
router.put('/',  userController.putUser);

module.exports = router;
