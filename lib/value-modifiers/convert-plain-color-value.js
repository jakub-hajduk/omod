const TinyColor = require('tinycolor2');
const isColorValue = require('../utils/is-color-value');
const last = require('../utils/last');

/**
 * Converts all colors fo hex8 values;
 * @type ValueModifier
 */
const convertPlainColorValue = (value, path, object) => {
  if ((last(path) === 'value' || last(path) === 'color') && isColorValue(value)) {
    const finalValue = new TinyColor(value)
    return finalValue.toHex8String()
  }

  return value
}

module.exports = convertPlainColorValue;
