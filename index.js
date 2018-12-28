async function first(value, ...args) {
    return await args.reduce(async (v, arg) => {
        const accum = await v
        if (Array.isArray(arg)) {
            return arg[0](accum, ...arg.slice(1))
        } else if (typeof arg === "function") {
            return arg(accum)
        } else {
            throw new Error(
                `Invalid Argument: type ${typeof arg} passed to thread.first\n
         Expected either a function or an array`)
        }
    }, value)
}

async function last(value, ...args) {
    return await args.reduce(async (v, arg) => {
        const accum = await v
        if (Array.isArray(arg)) {
            return arg[0](...arg.slice(1), accum)
        }
        else if (typeof arg === "function") {
            return await arg(accum)
        }
        else {
            throw new Error(
                `Invalid Argument: type ${typeof arg} passed to thread.last\n
         Expected either a function or an array`
            )
        }
    }, value)
}

async function as(value, f) {
    let ref = {}
    const args = f(ref)

    return args.reduce(async (val, arg) => {
        const accum = await val
        if (Array.isArray(arg)) {
            if (!arg.slice(1).find(v => v === ref)) {
                throw new Error(
                    `Missing Argument: thread.as was given an array and
           expected the placeholder to be present as a function parameter
           but none was found`
                )
            }

            return arg[0](
                ...arg.slice(1).map(v => {
                    return v === ref ? accum : v
                })
            )
        }
        else if (typeof arg === "function") {
            return arg(accum)
        }
        else {
            throw new Error(
                `Invalid Argument: type ${typeof arg} passed to thread.as\n
         Expected either a function or an array`
            )
        }
    }, value)
}


module.exports = {
    first: first,
    last: last,
    as: as
}
