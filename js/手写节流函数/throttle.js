// 时间戳写法，事件会立即执行，停止触发后没有办法再次执行
function throttle1(fn, delay) {
    var oldTime = Date.now()

    return function () {
        var context = this
        var args = arguments

        var newTime = Date.now()

        // 如果两次时间间隔超过了指定时间，则执行函数
        if (newTime - oldTime >= delay) {
            fn.apply(context, args)
            oldTime = Date.now()
        }
    }
}

// 使用定时器的写法，delay毫秒后第一次执行，第二次事件停止触发后依然会
// 执行一次
function throttle2(fn, wait) {
    let timer = null
    return function () {
        var context = this
        var args = arguments
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context, args)
                timer = null
            }, wait)
        }
    }
}

// 可以将时间戳写法的特性与定时器写法的特性相结合，实现一个更加精确的节流。实现如下
function throttle3(fn, wait) {
    let timer = null
    let oldTime = Date.now()
    return function () {
        var context = this
        var args = arguments

        // 当前时间
        let newTime = Date.now()
        let remaining = wait - (newTime - oldTime)
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
            oldTime = Date.now()
        } else {
            timer = setTimeout(fn, remaining)
        }
    }
}
