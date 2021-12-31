const isObject = require('./utils/is-object');
const isArray = require('./utils/is-array');
const isString = require('./utils/is-string');
const isNumber = require('./utils/is-number');

/**
 * Modifier function for modifying value of the object
 * @callback ValueModifier
 * @param {string|number} value - value to modify
 * @param {string} path - path to the element
 * @param {object} object - full input object
 * @return {string|number} - modified value
 */

/**
 * Modifier function for modifying node-modifiers of the object
 * @callback NodeModifier
 * @param {object} object - node-modifiers to modify
 * @param {string} path - path to the node-modifiers
 * @param {object} object - full input object
 * @return {string|number} - modified node-modifiers
 */

/**
 *
 * @param object
 * @param {ValueModifier} valueModifier - modifier function that maps value in the object
 * @param {NodeModifier} nodeModifier - modifier function that maps whole nodes in the object
 * @returns {object}
 */
module.exports = (object, valueModifier = (v, p, o) => v, nodeModifier = (n, p, o) => n) => {
  const walk = (inputObject, valueModifierFn = (v, p, o) => v, nodeModifierFn = (v, p, o) => v, path = []) => {
    const walkerOutput = Object.entries({ ...inputObject }).map(([childKey, childValue]) => {
      if (isArray(childValue)) {
        return [
          childKey,
          childValue.map((arrayItem, index) => walk(nodeModifierFn({ ...arrayItem }, [...path, `${childKey}[${index.toString()}]`], { ...object }), valueModifierFn, nodeModifierFn, [...path, `${childKey}[${index.toString()}]`]))
        ]
      }

      if (isObject(childValue)) {
        return [
          childKey,
          walk(nodeModifierFn({ ...childValue }, [...path, childKey], { ...object }), valueModifierFn, nodeModifierFn, [...path, childKey])
        ]
      }

      if (isString(childValue) || isNumber(childValue)) {
        return [
          childKey,
          valueModifierFn(childValue, [...path, childKey], { ...object })
        ]
      }

      return [childKey, childValue]
    })

    return Object.fromEntries(walkerOutput)
  }

  return walk(object, valueModifier, nodeModifier)
}
