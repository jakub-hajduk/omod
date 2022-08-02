const getClosestValueFromReference = require('./modifier-utils/get-closest-value-from-reference');
const hasReference = require('./modifier-utils/has-reference');
const getPathFromReference = require('./modifier-utils/extract-reference-path');

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
