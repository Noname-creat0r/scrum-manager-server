const db = require('../../db/models');
const { throwError, checkProps } = require ('../../util/error');

exports.getIterations = async (req, res, next) => {
  try {
    const projectId = req.query.projectId
  
    if (!projectId) {
      throwError(400, 'Missing project id in body.')
    }

    const iterations = await db.Iteration.findAll({
      where: { projectId: parseInt(projectId) }
    })
    
    res.status(200).json({ iterations })

  } catch(error) {
    next(error)
  }
}

exports.postIteration = async (req, res, next) => {
  try {
    const iterParams = req.body.iteration
    
    if (!checkProps(iterParams)) {
      throwError(400, "Missing param in body.")
    }

    const newIter = await db.Iteration.create({
      title: iterParams.title,
      description: iterParams.description,
      projectId: iterParams.projectId
    })
    
    res.status(201).json({ message: 'You have added new iteration.', iteration: newIter })

  } catch(error) {
    next(error)
  }
} 

exports.deleteIteration = async (req, res, next) => {
  try {
    const iterationId = req.query.id
    
    const iteration = await db.Iteration.findOne({
      where: { id: parseInt(iterationId) }
    })

    if (!iteration) {
      throwError(400, 'Missing iteration id.')
    }

    await iteration.destroy()

    res.status(200).json({ message: 'You have deleted an iteration.', id: iterationId })

  } catch(error) {
    next(error)
  }
}

exports.putIteration = async (req, res, next) => {
  try {
    const iterationProps = req.body.iteration

    if (!checkProps(iterationProps)) {
      throwError(400, 'Missing iteration property.')
    }

    const iteration = await db.Iteration.findOne({
      where: { id: parseInt(iterationProps.id) }
    })

    if (!iteration) {
      throwError(400, 'There is no such iteration you are trying to edit.')
    }

    iteration.set({
      title: iterationProps.title || iteration.title,
      description: iterationProps.description || iteration.description,
      projectId: iterationProps.projectId || iteration.projectId
    })

    await iteration.save()

    res.status(200).json({ message: 'You have edited the iteration', iteration })

  } catch(error) {
    next(error)
  } 
}
