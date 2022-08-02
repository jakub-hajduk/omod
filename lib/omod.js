const isObject = require('./utils/is-object');
const isArray = require('./utils/is-array');

const deepEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)

/**
 * Modifier function for modifying nodes of the object
 * @callback ModifierFn
 * @param {object} object - current node to modify
 * @param {string} path - path to the node
 * @param {object} object - full input object
 * @return {object} - modified node
 */

/**
 * Modify object recursively with pipeable modifier functions
 * @param object
 * @param {ModifierFn} modifierFn - modifier function that maps whole nodes in the object
 * @returns {object}
 */
module.exports = (object, modifierFn = (n) => n) => {
  const walk = (inputObject, path= []) => {

    // Collections
    if (isArray(inputObject)) {
      return inputObject.map((childValue, index) => {
        const childPath = [...path, index];
        const modifiedValue = modifierFn(childValue, childPath, {...object})
        const outputValue = modifiedValue === undefined ? childValue : modifiedValue
        if( isObject(outputValue) || isArray(outputValue) ) {
          return walk(outputValue, childPath)
        } else {
          return outputValue
        }
      })
    }

    // Objects
    if (isObject(inputObject) ) {
      return Object.keys(inputObject).reduce((output, childKey) => {
        const childPath = [...path, childKey]
        const childValue = inputObject[childKey]
        const modifiedChildValue = modifierFn(childValue, childPath, {...object})
        const outputValue = modifiedChildValue === undefined ? childValue : modifiedChildValue

        if (deepEqual(inputObject, outputValue)) {
          return inputObject
        } else if (isObject(outputValue) || isArray(outputValue)) {
          output[childKey] = walk(outputValue, childPath)
          return output
        } else {
          output[childKey] = outputValue
          return output
        }
      }, {})
    }
  }

  const modifiedRoot = modifierFn(object, [], object)

  return walk(modifiedRoot === undefined ? object : modifiedRoot, [])
}
