# omod 2
Modify javascript objects recursively with pipeable node modifier functions

You can use this library for modifying any object in javascript including arrays and collections.

Those functions were initially created to translate figmaTokens JSON format to style-dictionary. Its purpose was to unify all values and resolve references.

Since it is quite extensible and pipeable, I decided to publish it as a standalone npm package.

# Quick start

```
$ yarn add omod
```

Then in your file:

```js
const { omod } = require('omod');

[...]

const modifiedObject = omod(inputObject, modifierFn)
```

# omod
Omod runs modifier function for each node of the object recursively, doesn't matter if it is nested object, collection or primitives array. Therefore, it's up to modifier, what it is going to modify.  

```js
omod(inputObject, modifierFn)
```

- `inputObject` - object to be modified 
- `modifierFn` - function for modifying nodes of object.

# Modifier Function
In modifier function you can modify whole nodes, array items, or primitive values of the object. Your function may test current node, and execute modifications to modify object selectively.


```js
const extractColorValues = (node, path, object) => {
  if (path.includes('colors') && 'value' in node) {
    const color = doSomethingWithColor(node.value);
    
    return {
      originalColor: node.value,
      value: {
        r: color.getR(),
        g: color.getG(),
        b: color.getB(),
        a: color.getA()
      }
    }
  }
  
  return node // has to return node
}
```

- `value` - current value to be modified
- `path` - path to the value in form of array. For example: `[ 'colors', 'primary', 4 ]`
- `object` - full initial object


# Modifier Pipe 
You can also pipe some modifiers using `modifierPipe`

```js
const { omod, modifierPipe } = require('omod');

const modifierA = [...]
const modifierB = [...]
const modifierC = [...]

const modifiers = modifierPipe(
  modifierA,
  modifierB,
  modifierC
)

const modifiedObject = omod(object, modifiers)
```

# Utility functions

```javascript
const { isArray, isString, last, get } = require('omod')
```

## get 
Fetches value from object using given path

## isArray
Checks if given value is array

## isArrayItem
Checks if given path is path to array element


## isNumber
Checks if given value is number

## isObject
Checks if given value is object

## isString
Checks if given value is string

## last
Gets last element from array

## modifierPipe
Creates pipe for given modifiers
