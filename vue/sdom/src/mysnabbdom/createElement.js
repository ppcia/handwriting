// 真正创建节点, 将vnode创建为DOM，插入到pivot这个元素之前
export default function (vnode, pivot) {
    console.log('目的是把虚拟节点', vnode, '插入到标杆', pivot, '前')
    let domNode = document.createElement(vnode.sel)
    // 有子节点还是有文本？
    if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
        // 它内部是文字
        domNode.innerText = vnode.text
        // 将孤儿节点上树， 让标杆节点的父元素调用insertBefore方法， 将新的孤儿节点插入
        pivot.parentNode.insertBefore(domNode, pivot)

    }
}