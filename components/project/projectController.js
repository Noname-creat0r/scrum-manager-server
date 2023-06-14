const db = require('../../db/models');
const { throwError, checkProps } = require ('../../util/error');

exports.getProjects = async (req, res, next) => {
 try {
  const projects = await db.Project.findAll({
    include: [
      { model: db.User, as: 'author', attributes: ['name', 'email', 'createdAt'] },
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
    const projectId = req.params.id

    if (!projectId) {
      throwError(400, 'Missing project id.')
    }

    const project = await db.Project.findOne({
      where: { id: parseInt(projectId) },
      include: [
        { model: db.User, as: 'author', attributes: ['name', 'email', 'createdAt'] },
        { model: db.Tag, as: 'tags', attributes: ['title'] },
        { model: db.Iteration, as:'iterations', attributes: ['id', 'title', 'description'] },
      ]
    })

    res.status(200).json({ projects: [project] })
    //const assignees

  } catch(error) {
    next(error)
  }
}

exports.postProject = async (req, res, next) => {
  try {
    const projectProps = req.body.project

    if (!checkProps(projectProps)) {
      throwError(400, 'Missing project property!')
    }

    const newProject = await db.Project.create({
      title: projectProps.title,
      description: projectProps.description,
      private: projectProps.private,
      authorId: projectProps.authorId
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
    const projectId = req.query.id

    if (!projectId) {
      throwError(400, 'Missing project id.')
    }
  
    const project = await db.Project.findOne({
      where: { id: parseInt(projectId) }
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
    const projectProps = req.body.project

    if (!checkProps(projectProps)) {
      throwError(400, 'Missing project property in body!')
    } 

    const project = await db.Project.findOne({
      where: { id: parseInt(projectProps.id) }
    })

    if (!project) {
      throwError(400, 'There is no such project you trying to edit.')
    }

    project.set({
      title: projectProps.title || project.title,
      description: projectProps.description || project.description,
      authorId: projectProps.authorId || project.authorId,
      private: projectProps.private || project.private
    }) 

    await project.save()

    res.status(200).json({ project })

  } catch(error) {
    next(error)
  }
}
