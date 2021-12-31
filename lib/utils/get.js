/**
 * get value = require(given path
 * https://youmightnotneed.com/lodash/#get
 *
 * @param {*} object - input object
 * @param {array|string} path - path to value
 * @param {*} defaultValue - default value
 */
const get = (object, path, defaultValue = undefined) => {
  if (!path) return undefined

  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
  const result = pathArray.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    object
  )

  return result === undefined ? defaultValue : result
}

module.exports = get;
