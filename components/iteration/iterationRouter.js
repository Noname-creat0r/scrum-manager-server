const express = require("express");
const iterationController = require('./iterationController');

const router = express.Router();

router.post('/', iterationController.postIteration);
router.delete('/', iterationController.deleteIteration);
router.put('/', iterationController.putIteration);

module.exports = router;
