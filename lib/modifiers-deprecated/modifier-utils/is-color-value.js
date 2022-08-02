/**
 * Checks if given value is color definition
 * @param {string} value
 * @returns {boolean}
 */
const isColorValue = (value) => value && ['rgb', 'rgba', 'hsl', 'hsla', '#'].some(prefix => value.toString().startsWith(prefix))

module.exports = isColorValue;
