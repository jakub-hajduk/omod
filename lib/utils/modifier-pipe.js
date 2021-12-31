/**
 * Creates pipe for given modifiers.
 *
 * @param functions
 * @returns {ValueModifier|NodeModifier}
 */
const modifierPipe = (...functions) => (valueArgument, pathArgument, objectArgument) => functions.reduce((previousValue, currentFunction) => currentFunction(previousValue, pathArgument, objectArgument), valueArgument)

module.exports = modifierPipe;
