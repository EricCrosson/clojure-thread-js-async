# clojure-thread-js

Clojure threading macro. Supports first and last macro (-> , ->>). No support for binding.
Might be useful for testing React/Redux reducer.

## Usage

```
const thread = require('clojure-thread-js')

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
