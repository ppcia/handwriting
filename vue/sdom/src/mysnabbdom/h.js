import vnode from './vnode.js'

// 编写一个低配版的h函数，这个函数必须接受三个参数，缺一不可
// 相当于它的重载功能较弱
// 也就是说，调用的时候必须是下面的三种之一
// 形态① h('div', {}, '文字')
// 形态② h('div',{}, [])
// 形态③ h('div', {}, h())
export default function (sel, data, c) {
    // 检查参数的个数
    if (arguments.length !== 3) {
        throw new Error('传入的参数必须是三个')
    }
    // 检查参数c的类型
    if (typeof c == 'string' || typeof c == 'number') {
        // 说明现在调用h函数是形态①
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        // 说明现在调用h函数是形态②

        let children = []
        // 遍历c, 收集children
        for (let i = 0; i < c.length; i++){
            // 检查c[i]必须是一个对象
            if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error('传入的数组参数中有项不是h函数')
            }
            // 这里不用执行c[i], 因为测试语句中已经有了执行
            // 此时只需要收集好就可以了
            children.push(c[i])
        }
        // 循环结束了，就说明children收集完毕了, 此时可以返回虚拟节点了，它有children属性的
        return vnode(sel, data, children, undefined,undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
        // 说明现在调用h函数是形态③
        // 即，传入的c是唯一的children, 不用执行c，因为测试语句中已经有了执行
        let children = [c]
        return vnode(sel, data, children, undefined,undefined)
    } else {
        throw new Error('传入的第三个参数类型不对')
    }
}