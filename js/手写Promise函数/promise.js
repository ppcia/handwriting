function Promise(executor) {
    // 添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = null
    // 声明一个属性
    this.callback = []
    // 保存实例对象的this的值
    const self = this
    // resolve函数
    function resolve(data) {
        // 判断状态
        if(self.PromiseState !== 'pending') return
        // 1. 修改对象的状态(promiseState)
        self.PromiseState = 'fulfilled'
        // 2. 设置对象结果值(promiseResult)
        self.PromiseResult = data
        // 调用成功的回调属性
        self.callback.forEach(item => {
            item.onResolved(data)
        })
    }
    // reject函数
    function reject(data) {
        // 1. 修改对象的状态(promiseState)
        self.PromiseState = 'rejected'
        // 2. 设置对象结果值(promiseResult)
        self.PromiseResult = data
        // 执行回调
        self.callback.forEach(item => {
            item.onRejected(data)
        })
    }
    try {
        // 同步调用【执行器函数exector】
        executor(resolve, reject)
    } catch (e) {
        // 修改promise对象状态为失败
        reject(e)
    }
}

// 添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
    return new Promise((resolve, reject) => {
        // 调用回调函数 PromiseState
        if (this.PromiseState === 'fulfilled') {
            try {
                // 获取回调函数的执行结果
                let result = onResolved(this.PromiseResult)
                if (result instanceof Promise) {
                    // 如果是promise类型的对象
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
                } else {
                    // 结果的对象状态为成功
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        }
        if (this.PromiseState === 'rejected') {
            onRejected(this.PromiseResult)
        }
        // 判断pending状态
        if (this.PromiseState === 'pending') {
            // 保存回调函数
            this.callback.push({
                onResolved: function () {
                    // 执行成功回调函数
                    let result = onResolved(self.PromiseResult)
                    // 判断
                    if (result instanceof Promise) {
                        resolve.then(v => {
                            resolve(v)
                        }, r => {
                            reject(r)
                        })
                    } else {
                        resolve(result)
                    }
                },
                onRejected: function () {
                    // 执行失败回调的函数
                    onRejected(self.PromiseResult)
                }
            }) 
        }
    })
}