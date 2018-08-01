const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

const devServer = {
    // 可用localhost,127.0.0.1,以及内网IP访问
    // 但不能用0.0.0.0:8000打开
    host: 'localhost',
    port: 8000,
    headers: {
      'Access-Control-Allow-Origins': '*'
    },
    // 代理
    proxy: {
      '/api': {
        // target: 'http://172.164.1.68:8000/',
        target: 'http://172.164.1.68:8000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    overlay: {
      // 出现的错误显示到页面
      errors: true
    },
    // 处理url和页面的映射
    historyApiFallback: {
      index: '/dist/index.html'
    },
    // hotModuleReplacement
    // 修改代码后页面无刷新更新,不会丢失数据
    hot: true,
    // 启动时自动打开浏览器
    // 但是改webpack配置后也会打开新页面
    open: true
  }

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    devServer,
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'iView admin v' + package.version,
            filename: '../index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main-components/theme-switch/theme'
            },
            {
                from: 'src/views/my-components/text-editor/tinymce'
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        })
    ]
});