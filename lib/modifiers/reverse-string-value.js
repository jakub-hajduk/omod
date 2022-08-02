const isString = require("../utils/is-string");

const reverseStringValue = (node) => {
  if (isString(node)) {
    return [...node].reverse().join('')
  }
}

module.exports = reverseStringValue
