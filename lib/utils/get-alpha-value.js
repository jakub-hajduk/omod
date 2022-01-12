const isArray = require('./is-array');

/**
 * Fetches alpha value = require(given string in form of hsla or rgba.
 * @param {string} value
 * @returns {string|undefined}
 */
const getAlphaValue = (value) => {
  const output = value.toString().match(/^(?:rgba|hsla).*(?:,\s*)([0-9.,]+)\)$/)
  return value && isArray(output) ? parseFloat(output[1]) : undefined
}

module.exports = getAlphaValue;
