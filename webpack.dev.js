// 
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
module.exports = merge(common, {
  mode: 'development',
  /**
   * 每次需要编译代码是都重新打包很麻烦
   * webpack 中有几个不同的选项,可以在代码发生变化后自动编译代码
   * 1.webpack's Watch Mode
   * watch 检测到文件的变化之后会自动重新编译修改后的模块,但是需要手动刷新浏览器
   * 2.webpack-dev-server
   * 多数场景下用 webpack-dev-server ,它会在更新之后自动刷新浏览器
   * 3.webpack-dev-middleware
   * webpack-dev-middleware 是一个容器,可以把 webpack 处理后的文件传递给一个服务器
   * webpack-dev-server 在内部使用了它,同时它也可以作为一个单独的包来使用,以便进行更多
   * 自定义设置来实现更多的需求
   * 一个 webpack-dev-middleware 结合 express 的示例
   * https://webpack.docschina.org/guides/development/
   * 
   */
  /**
   * 配置 webpack-dev-server 在 localhost:8080下建立服务,将 dist 目录下的文件,作为可访问文件
   * https://webpack.docschina.org/configuration/dev-server
   */
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  /**
   * 使用 source map
   * 当 webpack 打包源代码时,可能会很难追踪到错误和警告在源代码中的原始位置
   * 一个源文件包包含一个错误,那么堆栈跟踪就会简单的指向到这个 bundle, 这通常没什么用,我们需要准确的知道
   * 错误来自于哪个源文件,具体哪一行等等
   * https://webpack.docschina.org/configuration/devtool
   * inline-source-map,有助于解释说明,会降低构建速度,不要用于生产环境
   */
  devtool: 'inline-source-map',
  plugins: [
    /**
     * 模块热替换( Hot Moudle Replacement)允许在运行时更新各种模块,而无需进行完全刷新
     * 只适合开发环境
     * 如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，
     * 请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。
     * https://github.com/webpack-contrib/webpack-hot-middleware
     */
    new webpack.HotModuleReplacementPlugin()
  ]
})