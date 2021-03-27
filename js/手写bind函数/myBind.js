Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('type error')
    }

    fn = this;
    let args = [...arguments].slice(1)
    
    return function Fn() {
        return fn.apply(this instanceof Fn? this: context, args.concat(...arguments))
    }
}