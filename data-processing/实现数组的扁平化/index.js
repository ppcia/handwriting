// 递归实现
/* 
    普通递归思路很容易理解，就是通过循环递归的方式，
    一项一项去遍历，如果每一项还是数组，那么就继续
    往下遍历，利用递归来实现数组扁平化
*/
let arr = [1, [2, [3, 4, 5]]]
function flatten(arr){
    let result = []
    
    // 遍历数组
    for(let i = 0; i< arr.length; i++){
        // 如果子项还存在数组
        if(Array.isArray(arr[i])){
            // 递归遍历
            result = result.concat(flatten(arr[i]))
        }else{
            result.push(arr[i])
        }
    }
    return result
}

// reduce函数实现
/* 
    reduce函数实现就是对数组的每一项进行处理，那么其实
    也可以用reduce来实现数组的拼接，从而简化第一种代码
*/
function flatten2(arr){
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next)?flatten2(next):next)
    },[])
}

// 扩展运算符实现
function flatten3(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}

// split和toString
/* 
    可以通过split和toString两个方法共同实现数据扁平化，
    由于数组会默认带一个toString的方法，所以可以把数组直接转换成都好分隔符
    ，再用split方法把字符串重新转换为数组
*/

function flatten4(arr){
    return arr.toString().split(',')
}