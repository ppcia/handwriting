# 手写节流函数

函数节流是指规定一个单位时间，在这个时间内，只能有一次触发事件的回调函数执行，
如果在同一个单位时间内被触发多次，只有一次能生效。

## 定义
*节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效*

## 实现
1. 时间戳写法，事件会立即执行，停止触发后没有办法再次执行：
```javascript
function throttle(fn, delay) {
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
```

2. 定时器的写法，delay毫秒后第一次执行，第二次事件停止触发后依然会再次执行一次
```javascript
function throttle(fn, wait) {
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
```

3. 时间戳写法的特性与定时器写法的特性相结合
```javascript
function throttle(fn, wait) {
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
```

## 应用场景
节流在间隔一段时间执行一次回调的场景有：

* 滚动加载，加载更多或滚到底部监听
* 搜索框，搜索联想功能