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