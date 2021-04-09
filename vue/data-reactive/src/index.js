import {observe} from './observe'
import Watcher from './Watcher'

var obj = {
  a: {
    m:{
      n:5
    }
  },
  b:10,
  c: {
    d: {
      e: {
        f: 666
      }
    }
  },
  g: [22, 33, 44, 55]
}

// 创建observe,注意函数的名字没有r

observe(obj)
new Watcher(obj, 'a.m', (val)=>{
  console.log('*', val)
})
obj.a.m = 88
console.log(obj)