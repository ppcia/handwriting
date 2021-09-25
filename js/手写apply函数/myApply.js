Function.prototype.myApply = function (context, bindArgs) {

    // 判断调用对象是否是函数
    if (typeof this !== 'function') {
        console.error('typeof error')
    }
    fn = new Symbol();
    // 判断context是否存在，额u过没有传入则为window
    context = context || window
    // 将函数设为对象的方法
    context.fn = this

    let result = context.fn(...args)
    // 调用方法

    delete context.fn
    return result
}