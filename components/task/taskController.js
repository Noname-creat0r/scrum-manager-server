const db = require('../../db/models');
const { throwError } = require ('../../util/error');

exports.getTasks = async (req, res, next) => {
  try {
    const projectId = req.query.projectId
    console.log(projectId)
    if (!projectId) {
      throwError(400, 'Missing body parametr.')
    }

    const iterationTasks = await db.Iteration.findAll({
      where: { projectId: projectId },
      attributes: [], 
      include: [ 
        { model: db.Task, as: 'tasks', attributes: ['title', 'description', 'storyPoints', 'iterationId'] }
      ] 
    })
  
    const tasks = []
    for (const iteration of iterationTasks) {
      tasks.push(...iteration.tasks)
    }

    res.status(200).json({ tasks })

  } catch(error) {
    next(error)
  }
}

exports.getTask = () => {

}

exports.postTask = () => {

}

exports.deleteTask = () => {

}

exports.putTask = () => {

}
