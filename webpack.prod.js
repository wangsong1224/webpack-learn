/**
 * 开发环境和生产环境的构建目标差异很大,
 * 开发环境:具有实时重新加载或热模块替换能力的 source map 
 *        localhost server
 * 生产环境:更小的bundle 更轻量的 source map 更优化的资源 改善加载时间
 * 通常将 webpack 配置根据不同的环境独立编写
 * 
 * 指定环境:
 * 许多 library 将通过与 process.env.NODE_ENV 环境变量关联,以决定 library 中应该引用哪些内容
 * 例如,当不处于生产环境中时,某些 library 为了使调试变得容易,可能会添加额外的日志记录( log)和测试( test)
 * 其实,当使用 process.env.NODE_ENV==='production' 时,一些 library 可能针对具体用户的环境
 * 进行代码优化,从而删除或添加一些重要的代码
 * 我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量
 * 
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  // 针对生产环境用途,使用 source-map 而不是 inline-source-map
  // 对调试源码和基准测试很有帮助
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问
    // webpack-dev-middleware用的到
    // publicPath: '/'
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    //依赖分析工具,生成 treemap https://github.com/webpack-contrib/webpack-bundle-analyzer
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 1224,
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info'
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})