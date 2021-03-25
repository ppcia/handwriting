function myNew() {
    // 新建一个对象newObject
    let newObject = null
    // 取参数第一项为构造函数fn
    let construct = Array.prototype.shift.call(arguments)

    // 新建一个空对象，对象的原型为构造函数的prototype对象
    newObject = Object.create(construct.prototype)
    // 绑定this并执行构造函数
    result = construct.apply(newObject, arguments)

    // 如果函数返回非空并且是对象 则返回 result，否则返回 newObj
    return result instanceof Object ? result : newObject
}
