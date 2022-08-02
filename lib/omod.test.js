const omod = require('./omod')
const test = require('ava')
const get = require("./utils/get")
const reverseKeyNames = require("./modifiers/reverse-key-names")
const reverseStringValue = require("./modifiers/reverse-string-value")

const testModifier = (input, t) => (node, path) => {
  const pathValue = get(input, path)
  t.deepEqual(node, pathValue)
}

test('Should reverse key names at first level', (t) => {
  const input = {
    one: 1,
    two: 2,
    three: 3
  }

  const expected = {
    eno: 1,
    owt: 2,
    eerht: 3
  }

  const output = omod(input, reverseKeyNames)

  t.deepEqual(output, expected)
})

test('Should reverse key names in nested objects', (t) => {
  const input = {
    one: {
      two: {
        three: 3
      }
    }
  }
  const expected = {
    eno: {
      owt: {
        eerht: 3
      }
    }
  }

  const output = omod(input, reverseKeyNames)

  t.deepEqual(output, expected)
})

test('Should return unchanged node if modifier returns undefined', (t) => {
  const input = {
    one: {
      two: {
        three: 3
      }
    }
  }

  const noop = () => {}

  const output = omod(input, noop)

  t.deepEqual(output, input)
})

test('Should reverse key names in collection', (t) => {
  const input = [
    { value: 1 },
    { value: 2 },
    { value: 3 }
  ]

  const expected = [
    { eulav: 1 },
    { eulav: 2 },
    { eulav: 3 }
  ]

  const output = omod(input, reverseKeyNames)

  t.deepEqual(output, expected)
})

test('Should reverse key names in nested collection', (t) => {
  const input = {
    collection: [
      { value: 1 },
      { value: 2 },
      { value: 3 }
    ]
  }
  const expected = {
    noitcelloc: [
      { eulav: 1 },
      { eulav: 2 },
      { eulav: 3 }
    ]
  }

  const output = omod(input, reverseKeyNames)

  t.deepEqual(output, expected)
})

test('Should reverse values in array', (t) => {
  const input = ['one', 'two', 'three']

  const expected = ['eno', 'owt', 'eerht']

  const output = omod(input, reverseStringValue)

  t.deepEqual(output, expected)
})

test('Should reverse values in nested array', (t) => {
  const input = {
    array: ['one', 'two', 'three']
  }

  const expected = {
    array: ['eno', 'owt', 'eerht']
  }

  const output = omod(input, reverseStringValue)

  t.deepEqual(output, expected)
})


test('Should add @ to the path if object contains value property', (t) => {
  const input = {
    one: {
      two: {
        value: 3,
        description: 'number three'
      }
    }
  }

  const expected = {
    one: {
      two: {
        '@': {
          value: 3,
          description: 'number three'
        }
      }
    }
  }

  const addAtToValue = (node) => {
    if( 'value' in node ) {
      return  {'@': {...node}}
    }
  }

  const output = omod(input, addAtToValue)

  t.deepEqual(output, expected)
})

test('Should reverse values in flat object', (t) => {
  const input = {
    one: 'one',
    two: 'two',
    three: 'three'
  }

  const expected = {
    one: 'eno',
    two: 'owt',
    three: 'eerht'
  }

  const output = omod(input, reverseStringValue)

  t.deepEqual(output, expected)
})

test('Should reverse values in nested objects', (t) => {
  const input = {
    one: {
      two: {
        three: 'three'
      }
    },
  }

  const expected = {
    one: {
      two: {
        three: 'eerht'
      }
    }
  }

  const output = omod(input, reverseStringValue)

  t.deepEqual(output, expected)
})

test('Should reverse values in collections', (t) => {
  const input = [
    { value: 'one' },
    { value: 'two' },
    { value: 'three' }
  ]

  const expected = [
    { value: 'eno' },
    { value: 'owt' },
    { value: 'eerht' }
  ]

  const output = omod(input, reverseStringValue)

  t.deepEqual(output, expected)
})

test('Should reverse values in nested collections', (t) => {
  const input = {
    collection: [
      { value: 'one' },
      { value: 'two' },
      { value: 'three' },
    ]
  }

  const expected = {
    collection: [
      { value: 'eno' },
      { value: 'owt' },
      { value: 'eerht' },
    ]
  }

  const output = omod(input, reverseStringValue)

  t.deepEqual(output, expected)
})

test('Modifier function should receive proper path in flat object', (t) => {
  t.plan(4) // root and each object property

  const input = {
    one: 1,
    two: 2,
    three: 3
  }

  omod(input, testModifier(input, t))
})

test('Modifier function should receive proper path in nested object', (t) => {
  t.plan(4) // root and each indentation level

  const input = {
    one: {
      two: {
        three: 3
      }
    }
  }

  omod(input, testModifier(input, t))
})

test('Modifier function should receive proper path in array', (t) => {
  t.plan(4) // root and array items

  const input = ['one', 'two', 'three']

  omod(input, testModifier(input, t))
})

test('Modifier function should receive proper path in nested array', (t) => {
  t.plan(5) // root, object property and array items

  const input = {
    array: ['one', 'two', 'three']
  }

  omod(input, testModifier(input, t))
})

test('Modifier function should receive proper path in collection', (t) => {
  t.plan(7) // root, each node and sub node

  const input = [
    { value: 'one' },
    { value: 'two' },
    { value: 'three' }
  ]

  omod(input, testModifier(input, t))
})

test('Modifier function should receive proper path in nested collection', (t) => {
  t.plan(8) // root, object property, each node, sub node

  const input = {
    collection: [
      { value: 'one' },
      { value: 'two' },
      { value: 'three' },
    ]
  }

  omod(input, testModifier(input, t))
})
