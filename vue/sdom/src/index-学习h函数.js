import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

// 创建出patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

var myVnode1 = h('a', { props: { href: 'http://www.baidu.com' } }, '百度')
console.log(myVnode1)

// 让虚拟节点上树
const container = document.getElementById('container')
patch(container, myVnode1)