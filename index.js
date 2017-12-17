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
        `Invalid Argument: type ${typeof arg} passed to thread.last\n
         Expected either function or array`
      )
    }
  }, value)
}

function as(value, f) {
  let ref = {value}
  const args = f(ref)

  return args.reduce((ref, arg) => {
    if (Array.isArray(arg)) {
      if (!arg.slice(1).find(v => v === ref)) {
        throw new Error(
          `Missing Argument: thread.as was given an array
           Expected the placeholder to be present as a function parameter`
        )
      }

      ref.value = arg[0](
        ...arg.slice(1).map(v => {
          return v === ref ? ref.value : v
        })
      )
    }
    else if (typeof arg === "function") {
      ref.value = arg(ref.value)
    }
    else {
      throw new Error(
        `Invalid Argument: type ${typeof arg} passed to thread.as\n
         Expected either function or array`
      )
    }

    return ref
  }, ref).value
}

module.exports = {
  first: first,
  last: last,
  as: as
}
