const express = require("express");
const authController = require('./authController');
const router = express.Router();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

module.exports = router;
