Function.prototype.myCall = function (context) {
    // 判断调用函数
    if (typeof this !== 'function') {
        console.error('type error')
    }

    // 获取参数
    let args = [...arguments].slice(1)
    //判断context是否传入，如果没传入则设置为window
    context = context || window
    //将调用函数设置对象的方法
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}