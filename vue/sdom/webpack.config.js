const path = require('path')

module.exports = {
    //入口
    entry: './src/index.js',
    // 出口
    output: {
        // 虚拟打包路径
        publicPath: 'xuni',
        filename: 'bundle.js'
    },
    devServer: {
        port: 8080,
        contentBase: 'www',
        hot: true
    }
}