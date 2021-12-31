const get = require('./get');
const hasReference = require('./has-reference');
const getPathFromReference = require('./get-path-from-reference');

/**
 * Fetches value for closest matching reference
 * @param object
 * @param reference
 * @param currentPath
 * @returns {string|number}
 */
const getClosestValueFromReference = (object, reference, currentPath) => {
  const refPath = reference.split('.') || [reference]
  const curPath = [...currentPath]
  let value

  while (curPath.pop()) {
    value = get(object, [...curPath, ...refPath, 'value'].join('.'))

    if (value) {
      break
    }
  }

  if (hasReference(value)) {
    const newRef = getPathFromReference(value)
    value = getClosestValueFromReference(object, newRef, currentPath)
  }

  return value
}

module.exports = getClosestValueFromReference;
