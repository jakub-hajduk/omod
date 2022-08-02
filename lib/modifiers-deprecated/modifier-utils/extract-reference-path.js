const isString = require('../../utils/is-string');
const hasReference = require('./has-reference');

/**
 * Extracts path from reference
 * @param value
 * @returns {string|undefined}
 */
const extractReferencePath = (value) => {
  if (!isString(value) || !hasReference(value)) {
    return
  }

  const reference = value.toString().match(/(?<=[${])([a-zA-Z0-9.]*)(?=}?)/gm)
  return reference && reference[0]
}

module.exports = extractReferencePath;
