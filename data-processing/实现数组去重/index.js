const arr = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8]

/* 
    ES6方法
*/
Array.from(new Set(arr))

/* 
    ES5:使用map存储不重复的数字
*/
function uniqueArray(arr){
    let map = {}
    let res = []
    for(var i= 0; i< arr.length; i++){
        if(!map.hasOwnProperty([arr[i]])){
            map[arr[i]] = 1
            res.push(arr[i])
        }
    }
    return res
}

