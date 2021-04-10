const path = require('path')

module.exports = {
    // 入口
    entry: './src/index.js',
    // 出口
    output:{
        // 虚拟打包路径
        publicPath: 'xuni',
        //打包出来的文件名
        filename: 'bundle.js'
    },
    devServer:{
        hot:true,
        port: 8080,
        contentBase: 'www'
    }
}