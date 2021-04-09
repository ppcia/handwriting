import {observe} from './observe'
import Dep from './Dep'

export default function defineReactive(data, key, val){
  const dep = new Dep()
    // console.log('我是defineReactive', data, key)
    if(arguments.length === 2){
      val = data[key]
    }

    // 子元素要进行observe,自此形成递归，这个递归不是函数自己调用自己，而是多个函数、类循环调用
    let childOb = observe(val)

    Object.defineProperty(data, key,{
      enumerable:true,
      configurable: true,
      get(){
        // console.log('你试图访问' + key + '属性');
        // 如果现在处于依赖收集阶段
        if(Dep.target){
          dep.depend()
          if(childOb){
            childOb.dep.depend()
          }
        }
        return val
      },
      set(newVal){
        // console.log('你试图改变' + key + '属性', newVal);
        if(val === newVal){
          return
        }
        val = newVal 
        // 当设置了新值，这个新值也要被observe
        childOb = observe(newVal)
        // 发布订阅模式，通知dep
        dep.notify()
      }
    })
  }