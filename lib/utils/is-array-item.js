/**
 * Checks if given path is path to array element
 * @param path
 * @returns {boolean}
 */
const isArrayItem = (path) => path.slice(-1)[0].includes('[')

module.exports = isArrayItem;
