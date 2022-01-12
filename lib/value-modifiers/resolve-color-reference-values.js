const TinyColor = require('tinycolor2');
const getClosestValueFromReference = require('../utils/get-closest-value-from-reference');
const hasReference = require('../utils/has-reference');
const getPathFromReference = require('../utils/get-path-from-reference');
const isColorValue = require('../utils/is-color-value');
const getAlphaValue = require('../utils/get-alpha-value');

/**
 * @type ValueModifier
 */
const resolveColorReferenceValues = (value, path, object) => {
  if (isColorValue(value) && hasReference(value)) {
    const ref = getPathFromReference(value)
    const colorValue = getClosestValueFromReference(object, ref, path)
    const finalColor = new TinyColor(colorValue)
    const alphaValue = getAlphaValue(value) || undefined

    if (alphaValue) {
      finalColor.setAlpha(alphaValue)
    }

    return finalColor.toHex8String()
  }

  return value
}

module.exports = resolveColorReferenceValues;
