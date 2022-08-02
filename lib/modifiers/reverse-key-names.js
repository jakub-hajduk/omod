const isObject = require("../utils/is-object");

reverseKeyNames = (node) => {
  if( isObject(node) ) {
    const output = Object.entries(node).map(([key, value]) => [
      [...key].reverse().join(''),
      value
    ])

    return Object.fromEntries(output)
  }
}

module.exports = reverseKeyNames
