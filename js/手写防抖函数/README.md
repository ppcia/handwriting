# 手写防抖函数

函数防抖是指事件被触发n秒后执行回调，如果这n秒内又被触发，则重新计时。这个可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求

## 定义
*防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时*

## 实现
简单实现代码：
```javascript
function debounce(fn, wait){
    var timer = null
    
    return function(){
        var context = this      // 保存this指向
        var args = arguments    // 拿到event对象

        // 如果此时存在定时器的话，则需要取消之前的定时器并且重新计时
        if(timer){
            clearTimeout(timer)
            timer = null
        }

        timer = setTimeout(function(){
            fn.apply(context, args)
        }, wait)
    }
}
```

防抖如果需要立即执行，可加入第三个参数用于判断，实现如下：
```javascript
function debounce(fn, wait, immediate){
    var timer = null

    return function(){
        var context = this
        var args = arguments

        if(timer){
            clearTimeout(timer)
            timer = null
        }

        if(immediate){
            // 如果已经执行过了就不在执行
            var callNow = !timer
            timer = setTimeout(function(){
                timer = null
            }, wait)
            if(callNow){
                fn.apply(context, args)
            }
        }else{
            timer = setTimeout(function(){
                fn.apply(context, args)
            }, wait)
        }
    }
}
```

## 应用场景
防抖在连续的事件，只需触发一次回调的场景有：
* 搜索框搜索输入。只需用户最后一次输入完，再发送请求
* 手机号、邮箱验证输入检测
* 窗口大小resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。