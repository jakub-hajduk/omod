const test = require("ava");
const modifierPipe = require("./utils/modifier-pipe");
const omod = require("./omod");
const reverseStringValue = require("./modifiers/reverse-string-value");
const reverseKeyNames = require("./modifiers/reverse-key-names");

test('Complex object regression test', (t) => {
  const input = {
    one: 1,
    two: 2,
    three: 3,
    object: {
      subOne: 'object.1',
      subTwo: 'object.2',
      subThree: 'object.3'

    },
    nestedObject: {
      node: {
        subNode: {
          value: 'nested value'
        }
      }
    },
    collection: [
      { value: 'one' },
      { value: 'two' },
      { value: 'three' },
    ],
    mixedObject: [
      {
        subObject: {
          value: 'mixed sub object'
        }
      },
      {
        value: 'mixed object value'
      },
      {
        nestedCollection: [
          { value: 'nested one' },
          { value: 'nested two' },
          { value: 'nested three' },
        ]
      }
    ]
  }

  const pipedModifier = modifierPipe(reverseStringValue, reverseKeyNames)

  const output = omod(input, pipedModifier)

  t.snapshot(output)
})
