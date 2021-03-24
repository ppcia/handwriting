function object_create(obj) {
    var args = [].slice.call(arguments, 1)
    for (let i of args) {
        Object.assign(obj, i)
    }
    function F() { }
    F.prototype = obj
    return new F(args)
}
