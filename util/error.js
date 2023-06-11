exports.throwError = (status, message) => {
  const error = new Error(message)
  error.statusCode = status
  throw error
}

exports.checkProps = (obj, exceptions = {}) => {
  for (const key of Object.keys(obj)) {
    if (!exceptions[key] && !obj[key].toString()) {
      return false
    }
  }
  return true;
}
