const db = require('../../db/models');
const { throwError } = require ('../../util/error');

exports.getProjects = async (req, res, next) => {
 try {
  const projects = await db.Project.findAll({
    include: [
      { model: db.User, as: 'author', attributes: ['name','email', 'createdAt'] },
      { model: db.Tag, as: 'tags', attributes: ['title'] }
    ]
  })

  // load assignees

  if (!projects) {
    throwError(503, 'There are now projects at the moment.')
  }

  res.status(200).json({ projects })

  } catch(error) {
    next(error)
  }
}

exports.getProject = async (req, res, next) => {
  try {
    const project = await db.Project.findOne({
      where: { id: req.body.projectId },
      include: [
        { model: db.User, as: 'author', attributes: ['name','email', 'createdAt'] },
        { model: db.Tag, as: 'tags', attributes: ['title'] },
        { model: db.Task }
      ]
    })

    //const assignees

  } catch(error) {
    next(error)
  }
}

exports.postProject = async (req, res, next) => {
  try {
    const title = req.body.title
    const description = req.body.description
    const private = req.body.private
  
    if (!title || !description || !private.toString()) {
      throwError(400, 'Missing project data.')
    }

    const newProject = await db.Project.create({
      title: title,
      description: description,
      private: private,
      authorId: req.userId
    })

    if (!newProject) {
      throwError(500, 'Could not create a new project. Server error.')
    }

    res.status(201).json({ message: 'You have create a project!', project: newProject })

  } catch(error) {
    next(error)
  }
}

exports.deleteProject = async (req, res, next) => {
  try {
    const projectId = req.body.projectId
    if (!projectId) {
      throwError(400, 'Missing project id.')
    }
  
    const project = await db.Project.findOne({
      where: { id: projectId }
    })

    if (!project) {
      throwError(400, 'There is no such project you trying to delete.')
    }

    await project.destroy()

    res.status(200).json({ message: 'You have deleted a project!', projectId })

  } catch(error) {

  }
}

exports.putProject = async (req, res, next) => {
  try {
    
  } catch(error) {

  }
}
