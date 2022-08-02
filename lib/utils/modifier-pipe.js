/**
 * Creates pipe for given modifiers.
 *
 * @param functions
 * @returns {ModifierFn}
 */
const modifierPipe = (...functions) => (valueArgument, pathArgument, objectArgument) => functions.reduce((previousValue, currentFunction) => {
  const current = currentFunction(previousValue, pathArgument, objectArgument)
  return current === undefined ? previousValue : current
}, valueArgument)

module.exports = modifierPipe;
