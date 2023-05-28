const express = require("express");
const taskController = require('./taskController');
const { isAuth } = require('../auth/authMiddleware')

const router = express.Router();

router.get('/:id', taskController.getTask)
router.get('/', taskController.getTasks);
router.post('/', isAuth, taskController.postTask);
router.delete('/', isAuth, taskController.deleteTask);
router.put('/', isAuth, taskController.putTask);

module.exports = router;
