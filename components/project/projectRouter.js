const express = require("express");
const projectController = require('./projectController');
const { isAuth } = require('../auth/authMiddleware')

const router = express.Router();

router.get('/:id', projectController.getProject)
router.get('/', projectController.getProjects);
router.post('/',  projectController.postProject);
router.delete('/',  projectController.deleteProject);
router.put('/',  projectController.putProject);

module.exports = router;
