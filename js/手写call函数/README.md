# 手写call函数

## 定义
*call()方法在使用一个指定的this值和若干指定的参数值为前提下调用某个函数或者方法*

举个例子
```javascript
var foo = {
    value: 1
}

function bar(){
    console.log(this.value)
}
bar.call(foo)
```
> 1. call改变了this的指向，指向到foo
> 2. bar函数执行了

## 如何实现-第一步
如果实现上面两种结果呢？
实现效果：
```javascript
var foo = {
    value: 1,
    bar:function(){
        console.log(this.value)
    }
}
```
> 上面的例子的this就指向了foo,但是却给foo对象本身添加了一个属性，这是不行的！

所以我们实现的步骤可以分为下面三个步骤：
1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数
实现代码：
```javascript
// 第一步
foo.fn = bar
// 第二步
foo.fn()
// 第三步
delete foo.fn
```

根据上面的三个步骤可以实现第一版call函数：
```javascript
Function.prototype.call1=function(context){
    // 首先我们需要调用call的函数，用this可以获取
    context.fn = this
    context.fn()
    delete context.fn
}
```

## 如何实现-第二步
*call函数还能给定参数执行函数*
举个例子：
```javascript
var foo  = {}

function bar(name,age){
    console.log(name)
    console.log(age)
    console.log(this.value)
}
bar.call(foo, 'lili', 18)

```

所以我们还需要处理参数问题：
实现第二版call函数
```javascript
Function.prototype.call2 = function(context){
    context.fn = this
    // 从arguments对象中取值，取出第二个到最后一个参数，然后放到一个新数组中
    let args = [...arguments].slice(1)
    context.fn(...args)
    delete context.fn
}   
```

## 如何实现-第三步
*1.this参数可以传入null,当为null的时候，视为指向window*

举个例子：
```javascript
var value = 1
function bar(){
    console.log(this.value)
}
bar.call(null)
```

*2.函数是有返回值的*
举个例子：
```javascript
var obj = {
    value: 1
}

function bar(name, age){
    return {
        value: this.value
        name: name,
        age: age
    }
}

console.log(bar.call(obj, 'lili', 18))
```
根据上面两个问题
实现第三版call函数：
```javascript
Function.prototype.call3 = function(context){
    context.fn = this
    
    // 当为null的时候，视为指向window
    let context = context || window

    // 从arguments对象中取值，取出第二个到最后一个参数，然后放到一个新数组中
    let args = [...arguments].slice(1)

    // 执行函数并返回结果
    let result = context.fn(..args)

    // 删除该函数
    delete context.fn

    // 返回结果
    return result
}
```

## 最终版
call函数的实现步骤：
* 1. 判断调用对象是否为函数，即使我们定义在函数的原型上的，但是可能出现使用call等方法调用的情况
* 2. 处理传入的参数，截取第一个参数之后的所有参数
* 3. 判断传入上下文对象是否存在，如果不存在，则设置为window
* 4. 将函数作为上下文对象的一个属性
* 5. 使用上下文对象来调用这个方法，并保存返回结果
* 6. 删除刚才新增的属性
* 7. 返回结果

## 实现
```javascript
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
```