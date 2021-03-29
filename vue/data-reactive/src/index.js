var obj = {}

function defineReactive(data, key, val) {
    if (arguments.length == 2) {
        val = obj[key]
    }
    Object.defineProperty(data, key, {
        // 可枚举
        enumerable: true,
        // 可以被配置
        configurable: true,
        // getter
        get() {
            console.log('你试图访问obj的a属性')
            return val
        },
        //setter
        set(newValue) {
            console.log('你试图改变obj的a属性', newValue)
            if (val === newValue) {
                return
            }
            val = newValue
        }
    })
}

defineReactive(obj, 'a', 10)

console.log(obj.a)
obj.a = 9
console.log(obj.a)