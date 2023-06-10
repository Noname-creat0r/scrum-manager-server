const db = require('../../db/models');
const { throwError } = require ('../../util/error');

const selectTaskById = async (id) => {
  return await db.Task.findOne({
    where: { id: id },
    include: [
      {
        model: db.TaskStatus,
        as: 'status',
        attributes: ['status']
      }
    ]
  })
}

exports.syncTasks = async (req, res, next) => {
  try {
    const positionInfo = req.body.positionInfo
  
    for (const posItem of positionInfo) {
      const updTask = await db.Task.findOne({
        where: { id: posItem.id }
      })

      const status = await db.TaskStatus.findOne({
        where: { status: posItem.status}
      })

      updTask.set({ 
        bContainerPos: posItem.bContainerPos,
        statusId: status.id
      })

      await updTask.save()
      console.log(updTask)
    }

    res.status(200).json({ message: 'Project tasks position info syncronized.' })
  } catch(error) {
    next(error)
  }
}

exports.getTasks = async (req, res, next) => {
  try {
    const projectId = req.query.projectId
    console.log(projectId)
    if (!projectId) {
      throwError(400, 'Missing body parametr.')
    }

    const projectTasks = await db.Task.findAll({
      where: { projectId: projectId },
      include: [
        {
          model: db.TaskStatus,
          as: 'status',
          attributes: ['status']
        }
      ]
    })
 
    res.status(200).json({ tasks: projectTasks })

  } catch(error) {
    next(error)
  }
}

exports.getTask = () => {

}

exports.postTask = async (req, res, next) => {
  try {
    const title = req.body.title
    const description = req.body.description
    const storyPoints = req.body.storyPoints
    const iterationId = req.body.iterationId | null
    const projectId = req.body.projectId
    const status = req.body.status
      
    if (!title || !description || !storyPoints || !projectId || !status) {
      throwError(400, 'Missing body param.')    
    }
      
    const statusId = await db.TaskStatus.findOne({
      where: { status: status },
      attributes: ['id']
    })  
    
    // Outsource the checks to util

    if (!statusId) {
      throwError(400, 'There is no such status for the task')
    }

    const project = await db.Project.findOne({
      where: { id: projectId }
    })

    if (!project) {
      throwError(400, 'There is no such project for the new task')
    }
  
    const maxBackPos = await db.Task.max(
      'bContainerPos',
      { where: { statusId: statusId.id } }
    )

    console.log(maxBackPos)

    const newTask = await db.Task.create({
      title: title,
      description: description,
      storyPoints: storyPoints,
      projectId: projectId,
      iterationId: null,
      bContainerPos: maxBackPos + 1, 
      statusId: statusId.id
    })

    const task = await selectTaskById(newTask.id) 

    res.status(201).json({ task })

  } catch (error) {
    next(error)
  } 
}

exports.deleteTask = async (req, res, next) => {
  try {
    const taskId =  req.query.taskId

    if (!taskId) {
      throwError(400, 'Missing param in query.')
    }

    const task = await db.Task.findOne({
      where: { id: taskId }
    }) 

    if (!task) {
      throwError(400, 'There is no such task to delete.')
    }

    await task.destroy()

    res.status(200).json({ message: 'You have deleted a task.', taskId: parseInt(taskId)})

  } catch (error) {
    next(error)
  } 
}

exports.putTask = async (req, res, next) => {
  try {
    const taskId = req.body.id
    const title = req.body.title
    const description = req.body.description
    const storyPoints = req.body.storyPoints
    const iterationId = req.body.iterationId | null
    const projectId = req.body.projectId
    const status = req.body.status
  
    const bContainerPos = req.body.bContainerPos

    if (!taskId) {
      throwError(400, 'Missing param in body.')
    }

    const task = await db.Task.findOne({
      where: { id: taskId }
    })

    if (!task) {
      throwError(400, 'There is no such task to edit.')
    }
    
    const statusId = await db.TaskStatus.findOne({
      where: { status: status },
      attributes: ['id']
    })  

    if (!statusId) {
      throwError(400, 'There is no such status for the task')
    }

    task.set({
      title: title || task.title,
      description: description || task.description,
      storyPoints: storyPoints || task.storyPoints,
      iterationId: iterationId || task.iterationId,
      projectId: projectId || task.projecId,
      statusId: statusId.id || task.statusId,
      bContainerPos: bContainerPos
    })

    await task.save()

    const updatedTask = await selectTaskById(task.id)

    res.status(200).json({ message: 'You have updated a task information.', task: updatedTask })

  } catch (error) {
    next(error)
  } 
}
