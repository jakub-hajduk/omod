const modifierPipe = require('../utils/modifier-pipe')
const resolveColorReferenceValues = require('./resolve-color-reference-values')
const resolvePlainReferenceValues = require('./resolve-plain-referenve-values')
const convertPlainColorValue = require('./convert-plain-color-value')

const figmaTokensToStyleDictionary = modifierPipe(
  resolveColorReferenceValues,
  resolvePlainReferenceValues,
  convertPlainColorValue
)

module.exports = figmaTokensToStyleDictionary
