# 手写instancfeof

*instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上*
参考：instanceof [instanceof - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

## 思路
    步骤如下：
        1. 首先获取实例对象的原型(例：person.__proto__)
        2. 然后获取构造函数的prototype(例：Person.prototype)
        3. 然后一直循环判断对象的原型是否等于构造函数的prototype,直到对象原型为null, 因为原型链最终为null

实现:
```javascript
function myInstanceOf(left, right){
    // 获取对象的原型
    let proto = Object.getPrototypeOf(left)
    // 获取构造函数的prototype对象
    let prototype = right.prototype

    // 判断构造函数的prototype对象是否在对象的原型链上
    while(true){
        if(!proto) return false
        if(proto === prototype) return true

        proto = Object.getPrototypeOf(proto)
    }
}
```

> 参考: [getPrototypeOf - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)


