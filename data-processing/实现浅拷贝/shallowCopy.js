// 扩展运算符
function shallowCopy1(target){
    // 类型判断
    if(typeof target === 'object' && target !== null){
        // 判断数据是否为数组
        if(Array.isArray(target)){
            return [...target]
        }else{
            return {...target}
        }
    }else{
        return target
    }
}

function shallowCopy2(target){
    if(typeof target === 'object' && target !== null){
        // 创建一个容器
        const result = Array.isArray(target) ? [] : {}
        // 遍历target数据
        for(let key in target){
            // 判断当前对象身上是否包含该属性
            if(target.hasOwnProperty(key)){
                // 将属性设置到result结果数据中
                result[key] = target[key]
            }
            return result
        }
    }else{
        return target
    }
}