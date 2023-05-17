const express = require("express");
const projectController = require('./projectController');
const { isAuth } = require('../auth/authMiddleware')

const router = express.Router();

router.get('/:id', projectController.getProject)
router.get('/', projectController.getProjects);
router.post('/', isAuth, projectController.postProject);
router.delete('/', isAuth, projectController.deleteProject);
router.put('/', isAuth, projectController.putProject);

module.exports = router;
