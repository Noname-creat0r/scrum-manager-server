const jwt = require('jsonwebtoken')
const { throwError } = require('../../util/error')
const key = process.env.KEY

exports.isAuth = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
      throwError(401, 'Not authenticated.')
    }

    const token = authHeader
    const decodedToken = jwt.verify(token, key)

    if (!decodedToken) {
      throwError(401, 'Bad token.')
    }

    req.locals.userId = decodedToken.payload.userId
    next()
  } catch (error) {
    next(error)
  }
} 
