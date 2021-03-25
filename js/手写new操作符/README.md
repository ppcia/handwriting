# 手写new操作符

在调用new过程中大概做了几件事:
* 1. 返回（产生）一个新的对象
* 2. 将对象与构造函数通过原型链连接起来
* 3. 设置了this的指向（指向新生成的实例对象）
* 4. 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

## 思路：
    步骤如下：
        1. 创建一个空对象
        2. 获取构造函数
        3. 设置空的对象的原型
        4. 绑定this并执行构造函数
        5. 确保返回值为对象

## 实现
```javascript
function myNew() {
    // 新建一个对象newObject
    let newObject = null
    // 取参数第一项为构造函数fn
    let construct = Array.prototype.shift.call(arguments)

    // 新建一个空对象，对象的原型为构造函数的prototype对象
    newObject = Object.create(construct.prototype)
    // 绑定this并执行构造函数
    let result = construct.apply(newObject, arguments)

    // 如果函数返回非空并且是对象 则返回 result，否则返回 newObj
    return result instanceof Object ? result : newObject
}
```
