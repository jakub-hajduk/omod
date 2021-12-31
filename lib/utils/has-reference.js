const isString = require('./is-string');

/**
 * Check if given value contains reference to other token
 * @param value
 * @returns {boolean}
 */
const hasReference = (value) => {
  if (!isString(value)) {
    return false
  }

  return value.includes('{') || value.includes('$')
}

module.exports = hasReference;
