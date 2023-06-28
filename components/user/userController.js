const db = require('../../db/models');
const { throwError, checkProps } = require ('../../util/error');

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id

    if (!userId) {
      throwError(400, 'Missing user id.')
    }

    const user = await db.User.findOne({
      where: { id: parseInt(userId) },
      attributes: [ 'email', 'name', 'createdAt' ]
    })

    res.status(200).json({ user })

  } catch(error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const uid = req.query.id

    if (!uid) {
      throwError(400, 'Missing user id')
    }

    const user = await db.User.findOne({
      where: { id: parseInt(uid) }
    }) 

    if (!user) {
      throwError(400, 'There is no such user you trying to delete')
    }

    await user.destroy()

    res.status(200).json({ message: 'You have deleted a user.', uid })

  } catch(error) {
    next(error)
  }
}

exports.putUser = async (req, res, next) => {
  try {
    const userParams = req.body.user

    if (!checkProps(userParams)) {
      throwError(400, 'Missing param in body.')
    }

    const user = await db.User.findOne({
      where: { id: parseInt(userParams.id) }
    })

    if (!user) {
      throwError(400, 'There is no such user you are trying to edit.')
    }

    user.set({
      email: userParams.email || user.email,
      name: userParams.name || user.name
    })

    await user.save()

    res.status(200).json({ user })

  } catch(error) {
    next(error)
  }
}
