# 手写Object.create

Object.create() 创建一个新对象 

*原型式继承，是道格拉斯·克罗克提出的。这种继承方法没有使用严格意义上的构造函数。他的想法是借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型，以下是他提出的函数模型*

```javascript
function object(o){
	function F(){}
	F.prototype = o
	return new F()
}
```
## 思路
    步骤如下：
        1. 创建一个临时性的构造函数
        2. 将传入的对象作为这个构造函数的原型
        3. 最后返回了这个临时类型的一个新实例

实际上，object()对传入其中的对象执行了一次浅拷贝,
而且在只传入一个对象的时候，Object.create()与上述object方法是完全一样的

```javascript
function object_create(obj) {
    var args = [].slice.call(arguments, 1)
    for (let i of args) {
        Object.assign(obj, i)
    }
    function F() { }
    F.prototype = obj
    return new F(args)
}
```

***
了解

> [].slice.call(arguments, 1)是啥意思？

首先
* []是什么？
* [].slice.call是什么？
* arguments是什么？

[]是什么？

*[]是js语法中创建一个新数组的意思*
看如下代码：

```javascript
var a = [];
var b = new Array();
```
> 这两种写法并无二致。

[].slice.call是什么？

首先你知道[]是一个数组，那么[].slice是它的一个方法，是一个函数。
它的作用是返回数组中的某一段，看如下代码：
```javascript
var a = [1, 2, 3, 4, 5];
var b = a.slice(2);
// b是a从2号位开始的片段
// 也就是[3, 4, 5]
```

在js中，函数本身也是一种对象，也是具有属性和方法的，call就是其中之一。
它的第一个参数，是指定函数执行时的this指针，后面的参数，就是函数执行的参数。可以查阅MDN: Function.prototype.call()
看如下代码：
```javascript
var a = function (n) {
    console.log(this, n);
}
var b = {};

a(1); // log出Window对象, 1
a.call(b, 2); // log出b对象, 2
```

所以说[].slice.call(arguments, 1)实际上相当于（并不一定等同于）：

```javascript
arguments.slice(1);
```

arguments是什么

*arguments可以看做一个数组。每一个js函数内部都有arguments，它代表传入的参数数组。*
看如下代码：
```javascript
function a() {
    console.log(arguments);
}

a(1, 2, 3); // log出[1, 2, 3]
```

现在你应该明白了，

*[].slice.call(arguments, 1)返回的是arguments数组从1号位开始的片段。*

看如下代码：
```javascript
function a() {
    var args = [].slice.call(arguments, 1);
    console.log(args);
}

a('haha', 1, 2, 3, 4, 5); // log出[1, 2, 3, 4, 5]

a('run', '-g', '-b'); // log出['-g', '-b']
```





