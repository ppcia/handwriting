// 简单版本
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

// 防抖如果需要立即执行，可加入第三个参数用于判断
function debounce1(fn, wait, immediate){
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