function first(value, ...args) {
  return args.reduce((v, arg) => {
    if (Array.isArray(arg)) {
      return arg[0](v, ...arg.slice(1))
    }
    else if (typeof arg === "function") {
      return arg(v)
    }
    else {
      throw new Error(
        `Invalid Argument: type ${typeof arg} passed to thread.first\n
         Expected either function or array`
      )
    }
  }, value)
}

function last(value, ...args) {
  return args.reduce((v, arg) => {
    if (Array.isArray(arg)) {
      return arg[0](...arg.slice(1), v)
    }
    else if (typeof arg === "function") {
      return arg(v)
    }
    else {
      throw new Error(
        `Invalid Argument: type ${typeof arg} passed to thread.first\n
         Expected either function or array`
      )
    }
  }, value)
}

module.exports = {
  first: first,
  last: last
}
