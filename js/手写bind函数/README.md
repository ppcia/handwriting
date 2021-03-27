# 手写bind函数

## 定义
*bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )*

举个例子：
```javascript
var foo ={

}
function bar(){
    console.log(this.value)
}
// 返回了一个函数
var bindFoo = bar.bind(foo)

bindFoo()
```
> 1. 返回一个函数
> 2. 可以传入参数

## 如何实现-第一步
如果实现上面两种结果呢？
实现第一版bind函数：
```javascript
Function.prototype.bind1 = function(context){
    let self = this
    return function(){
        return self.apply(context)
    }
}
```
> 注意！之所以有 return self.apply(context),是考虑到绑定的函数可能是有返回值的

例如：
```javascript
var foo = {
    value: 1
}
function bar(){
    return this.value
}
var bindFoo = bar.bind(foo)
console.log(bindFoo())
```
## 如何实现-第二步-传参的模拟实现
例子：
```javascript
var foo = {
    value: 1
}
function bar(name, age){
    console.log(this.value)
    console.log(name)
    console.log(age)
}
var bindFoo = bar.bind(foo, 'lili')
bindFoo('18)
```
> 函数中需要传入name和age两个参数，除了bind的时候可以传入一个name，而且还可以在执行返回的函数的时候再传入一个age

对于这种情况，我们可以用arguments进行处理
实现第二版bind函数：
```javascript
Function.prototype.bind2=function(context){
    var self = this
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1)

    return function(){
        // 这个时候arguments是指从bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(context, args.concat(bindArgs))
    }
}
```
## 构造函数效果的模拟实现
*一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数*

例子：
```javascript
var value = 1

var foo = {
    value: 2
}

function bar(name, age){
    this.habit = 'shopping'
    console.log(this.value)
    console.log(name)
    console.log(age)
}
bar.prototype.friend = 'kk'

var bindFoo = bar.bind(foo, 'lili')

var obj = new bindFoo('18')

console.log(obj.habit)
console.log(obj.friend)

```
实现第三版bind函数：
```javascript
Function.prototype.bind3=function(context){
    var self = this
    var args = Array.prototype.slice.call(arguments, 1)

    var fBound = function(){
        var bindArgs = Array.protottype.slice.call(arguments)
        // 当作为构造器函数时，this指向实例，此时结果为true,将绑定函数的this指向该实例，可以让实例获得来自绑定函数的值
        // 如果改成'this instanceof fBound ? null : context',
        // 实例只是一个空对象，将null改成this
        // 当作为普通函数时，this指向window，此时结果为false，将绑定函数的this指向context
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }

    fBound.prototype = this.prototype
    return fBound
}
```

## 构造函数效果的优化实现
在这个写法中，我们直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。这个时候，我们可以通过一个空函数来进行中转：
```javascript
Function.prototype.bind2 = function (context) {

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```
最终版
```javascript
Function.prototype.bind = function(context){
    if(typeof this !== 'function'){
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable")
    }

    var self = this

    var args = Array.prototype.slice.call(arguments, 1)

    var fNOP = function(){}

    var fBound = function(){
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof FNOP ? this:context, args.concat(bindArgs))
    }

    FNOP.prototype = this.prototype
    fBound.prototype = new FNOP()
    return fBound
}
```
