Function.prototype = function (context) {

    // 判断调用对象是否是函数
    if (typeof this !== 'function') {
        console.error('typeof error')
    }

    // 判断context是否存在，额u过没有传入则为window
    context = context || window
    // 将函数设为对象的方法
    context.fn = this

    let result = null
    // 调用方法
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }

    delete context.fn
    return result
}