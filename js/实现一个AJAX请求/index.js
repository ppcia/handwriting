// 请求地址
const SERVER_URL = ''
// 创建一个XMLHttpRequest对象
let xhr = new XMLHttpRequest()
// 创建http请求
xhr.open('GET', SERVER_URL, true)
// 设置状态监听函数
xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return
    // 请求成功
    if (this.readyState == 200) {
        handle(this.response)
    } else {
        console.error(this.statusText)
    }
}

xhr.onerror = function () {
    console.error(this.statusText)
}
//设置请求头信息
xhr.responseType = 'json'
xhr.setRequestHeader('Accept', 'application/json')

// 发送http请求
xhr.send(null)