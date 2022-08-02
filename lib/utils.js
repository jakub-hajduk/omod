module.exports = {
  getPathFromReference: require("./modifiers-deprecated/modifier-utils/extract-reference-path"),
  isArrayItem: require("./utils/is-array-item"),
  isObject: require("./utils/is-object"),
  get: require("./utils/get"),
  isArray: require("./utils/is-array"),
  isString: require("./utils/is-string"),
  getAlphaValue: require("./modifiers-deprecated/modifier-utils/get-alpha-value"),
  hasReference: require("./modifiers-deprecated/modifier-utils/has-reference"),
  isColorValue: require("./modifiers-deprecated/modifier-utils/is-color-value"),
  last: require("./utils/last"),
  getClosestValueFromReference: require("./modifiers-deprecated/modifier-utils/get-closest-value-from-reference"),
  isNumber: require("./utils/is-number"),
  modifierPipe: require("./utils/modifier-pipe")
}
