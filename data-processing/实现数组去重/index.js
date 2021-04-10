const arr = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8]

/* 
    ES6方法
*/
Array.from(new Set(arr))

/* 
    ES5:使用map存储不重复的数字
*/
function uniqueArray1(arr){
    // 声明一个空对象，用于存放数组中的下标
    let map = {}
    // 声明一个空数组
    let res = []
    for(var i= 0; i< arr.length; i++){
        if(!map.hasOwnProperty([arr[i]])){
            map[arr[i]] = 1
            res.push(arr[i])
        }
    }
    return res
}

/* 
    利用forEech()和indexOf()
    本质上是双重遍历，效率差些
*/
function uniqueArray2(arr){
    //声明一个空数组
    const result = []
    // 遍历原始数组
    arr.forEach(item=>{
        // 检测result数组中是否包含这个元素
        if(result.indexOf(item) === -1){
            // 如果没有该元素
            result.push(item)
        }
    })
    return result
}
