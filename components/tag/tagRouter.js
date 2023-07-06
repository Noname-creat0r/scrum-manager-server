const express = require("express");
const tagController = require('./tagController');

const router = express.Router();

router.post('/', tagController.postTag);
router.delete('/', tagController.deleteTag);
router.put('/', tagController.putTag);

module.exports = router;

