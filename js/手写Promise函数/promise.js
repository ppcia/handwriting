class MyPromise {
  constructor(exector) {
    this.initValue();
    this.initBind();
    try {
      exector(this.resolve, this.reject)
    } catch (e) {
      this.reject(e);
    }
  }

  initValue() {
    this.PromiseResult = null;
    this.PromiseState = 'pending';
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  resolve(value) {
    // 状态不可变
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'fulfilled';
    this.PromiseResult = value;
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult);
    }
  }

  reject(reason) {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'rejected';
    this.PromiseResult = reason;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult);
    }
  }

  then(onFulfilled, onRejected) {
    // 接收两个回调onDulfilled, onRejected
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = cb => {
        setTimeout(() => {
          try {
            const x = cb(this.PromiseResult)
            if (x === thenPromise) {
              // 不能返回自身
              throw new Error('不能返回自身')
            }
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x);
            }
          } catch (error) {
            reject(error);
          }
        });

        if (this.PromiseState === 'fulfilled') {
          resolvePromise(this.PromiseResult);
        } else if (this.PromiseState === 'rejected') {
          resolvePromise(this.PromiseResult);
        } else if (this.PromiseState === 'pending') {
          this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
          this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
        }
      }
    })

    return thenPromise;
  }

  static all(promises) {
    const result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      const addData = (index, value) => {
        result[index] = value;
        count++;
        if (count === promises.length) resolve(result);
      }
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            addData(index, res)
          }, err => reject(err));
        } else {
          addData(index, promise);
        }
      })
    })
  }
}