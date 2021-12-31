# omod
Modify javascript objects recursively with pipeable node and value modifier functions

You can use this library for modifying any object in javascript.

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

const modifiedObject = omod(inputObject, valueModifierFn)
```

# omod
```js
omod(inputObject, valueModifierFn, nodeModifierFn)
```

- `inputObject` - object to be modified
- `valueModifierFn` - function for modifying values of object 
- `nodeModifierFn` - function for modifying whole nodes of object.

# Value Modifier Function
```js
const reverseValue = (value, path, object) => value.toString().split().reverse().join()
```
- `value` - current value to be modified
- `path` - path to the value in form of array. For example: `['colors', 'primary', 'value']`
- `object` - full initial object 

# Node Modifier Function
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
  
  return node
}
```

- `value` - current value to be modified
- `path` - path to the value in form of array. For example: `['colors', 'primary']`
- `object` - full initial object


# Modifier Pipe 
You can also pipe some modifiers using `modifierPipe`

```js
const { omod, modifierPipe } = require('omod');

const valueModifierA = [...]
const valueModifierB = [...]
const valueModifierC = [...]

const valueModifiers = modifierPipe(
  valueModifierA,
  valueModifierB,
  valueModifierC,
)

const nodeModifierA = [...]
const nodeModifierB = [...]
const nodeModifierC = [...]

const nodeModifiers = modifierPipe(
  nodeModifierA,
  nodeModifierB,
  nodeModifierC
)

const modifiedObject = omod(object, valueModifiers, nodeModifiers)
```
