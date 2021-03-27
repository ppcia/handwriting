const path = require('path')

module.exports = {
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        publicPath: 'xuni',
        filename: 'bundle.js'
    },

    mode: 'development',

    devServer:{
        contentBase: 'www',
        hot: true,
        open: true,
        port: 8888
    }
}