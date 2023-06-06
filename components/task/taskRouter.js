const express = require("express");
const taskController = require('./taskController');
const { isAuth } = require('../auth/authMiddleware')

const router = express.Router();

router.get('/:id', taskController.getTask)
router.get('/', taskController.getTasks);
router.post('/' , taskController.postTask);
router.delete('/', taskController.deleteTask);
router.put('/', taskController.putTask);

module.exports = router;
