import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const container = document.getElementById('container')

const myVode1 = h('h1', {}, '你好')

patch(container, myVode1)