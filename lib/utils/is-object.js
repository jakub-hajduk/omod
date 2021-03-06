/**
 * Checks if given value is object
 * https://youmightnotneed.com/lodash/#isObject
 * @param value
 * @returns {boolean}
 */
const isObject = value => value instanceof Object && !Array.isArray(value)

module.exports = isObject;
