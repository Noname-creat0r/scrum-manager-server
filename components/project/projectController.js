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

}

exports.postProject = async (req, res, next) => {

}

exports.deleteProject = async (req, res, next) => {

}

exports.putProject = async (req, res, next) => {

}
