# 手写apply函数

apply函数的实现步骤：
* 1. 判断调用对象是否为函数，即使我们定义在函数的原型上的，但是可能出现使用call等方法调用的情况
* 2. 判断传入上下文对象首付存在，如果不存在，则设置为window
* 3. 将函数作为上下文对象的一个属性
* 4. 判断参数值是否传入
* 5. 使用上下文对象来调用这个方法，并保存返回结果
* 6. 删除刚才新增的属性
* 7. 返回结果

## 实现
```javascript
Function.prototype.myApply=function(context){
    if(typeof this !== 'function'){
        console.error('type error')
    }

    context = context || window
    context.fn = this

    let result = null
    if(arguments[1]){
        result = context.fn(...arguments[1])
    }else{
        result = context.fn()
    }

    delete context.fn
    return result
}
```