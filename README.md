# clojure-thread-js

Clojure threading macro. Supports first, last, and as macro. No support for binding.
Might be useful for testing React / Redux reducer.

## Usage

```javascript
const thread = require('clojure-thread')

// first
// returns 9
thread.first(
  1,
  x => x * 10,
  [(x, y) => x - y, 1]
)

// last
// returns -9
thread.last(
  1,
  x => x * 10,
  [(x, y) => x - y, 1]
)

// as
// returns -8
// second argument must be a function that
// takes a placeholder as input and
// returns an array of functions or arrays
thread.as(
  1,
  placeholder => [
    x => x * 10,
    [(x, y) => x - y, placeholder, 1],
    [(x, y) => x - y, 1, placeholder]
  ]
)

// React Redux reducer
const reducer = (state = 0, action) => {
  switch(action.type) {
    case "INC":
      return state + 1
    default:
      return state
  }  
}

const state = thread.first(
  reducer(undefined, {}),
  [reducer, {type: "INC"}],  
)

console.log(state == 1)
```

## License

MIT
