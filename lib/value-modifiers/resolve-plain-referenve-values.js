const getClosestValueFromReference = require('../utils/get-closest-value-from-reference');
const hasReference = require('../utils/has-reference');
const getPathFromReference = require('../utils/get-path-from-reference');

/**
 * @type ValueModifier
 */
const resolvePlainReferenceValues = (value, path, object) => {
  if (hasReference(value)) {
    const ref = getPathFromReference(value)
    return getClosestValueFromReference(object, ref, path)
  }

  return value
}

module.exports = resolvePlainReferenceValues;
