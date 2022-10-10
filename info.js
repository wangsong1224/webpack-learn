const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = {
  //========输入输出============
  /**
   * 定义项目入口,会根据入口文件找到所有依赖
   * 单入口:字符串
   * 多入口:对象
   */
  entry: {
    app: './src/index.ts'
  },
  /**
   * 项目执行的上下文路径, 会将入口的根路径指向 context 指定的路径
   */
  context: path.resolve(__dirname, 'app'),
  /**
   * 配置输出的路径,名称等
   */
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  //========输入输出============


  //========模块处理============
  /**
   * 用于配置模块[路径]解析规则,帮助 webpack 更精准更高效的找到指定模块
   * 
   */
  resolve: {
    /**
     * resolve.alias 优先级高于其它模块解析方式。
     */
    alisa: {},
    /**
     * 使用 resolve.extensions 声明自动解析 .ts 后缀文件，
     * 这意味着代码如 import "./a.ts" 可以忽略后缀声明，简化为 import "./a" 文件
     */
    extensions: ['.ts', '.js']
  },
  /**
   * 用于配置模块加载规则,主要是用什么 loader 解析
   */
  module: {
    rules: [
      /**
       * test 匹配文件
       * @babel/preset-env 是一种 babel 预设规则集-Preset
       * 这种设计能按需将一系列复杂,数量庞大的配置,插件,polyfill 等打包成一个单一的资源包
       * 从而简化 babel 的应用,学习成本
       */
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
              // presets: ['@babel/preset-typescript']
            }
          }
        ]
      },
      /**
       * 注意，如果项目中已经使用 babel-loader，你也可以选择使用 
       * @babel/preset-typescript 规则集，借助 babel-loader 
       * 完成 JavaScript 与 TypeScript 的转码工作
       * 不过，@babel/preset-typescript 只是简单完成代码转换，
       * 并未做类似 ts-loader 的类型检查工作，大家需要根据实际场景选择适当工具。
       */
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      },
      /**
       * webpack处理 css 文件时通常用以下 loader
       * css-loader :将 css 等价翻译为形如 module.exports='${css}' 的 js 代码,
       * 使 webpack 能够像处理 js 一样解析 css 的内容和资源依赖
       * 
       * style-loader: 将 loader 的产物注入一系列runtime 代码,这些代码会将 css 内容
       * 注入到页面的<style>标签,使得样式生效
       * 
       * mini-css-extract-plugin: 该插件会将 css 代码抽离到单独的 .css 文件,
       * 并将该文件通过 <link> 标签的方式插入到页面中
       */
      /**
       * css-loader提供了很多处理 CSS 代码的基础能力，包括 CSS 到 JS 转译、依赖解析、Sourcemap、
       * css-in-module 等，基于这些能力，Webpack 才能像处理 JS 模块
       * 一样处理 CSS 模块代码
       * 
       * 经过 css-loader处理后,css 会转化成等价的 js 字符串,但是这些字符串还不会对页面样式
       * 产生影响,要继续使用 style-loader 加载器,
       * style-loader 并不会对代码内容做任何修改,而是简单注入一系列运行时代码,用于将 css-loader
       * 转译出的 js 字符串插入到页面的 style 标签
       * 
       * 经过 style-loader + css-loader 处理后，样式代码最终会被写入 Bundle 文件，
       * 并在运行时通过 style 标签注入到页面。这种将 JS、CSS 代码合并进同一个产物文件的方式有几个问题：
       * JS、CSS 资源无法并行加载，从而降低页面性能；
       * 资源缓存粒度变大，JS、CSS 任意一种变更都会致使缓存失效。
       * 
       * 因此，生产环境中通常会用 mini-css-extract-plugin 插件替代 style-loader，
       * 将样式代码抽离成单独的 CSS 文件。
       * 
       * CSS 预处理器,补充了逻辑判断 数学运算 嵌套封装等特性,基于这些特性 我们可以写出复用性
       * 可读性 可维护性更强 调理更清晰的样式代码
       * 
       * PostCSS 也能在原生 CSS 基础上增加更多表达力、可维护性、可读性更强的语言特性。
       * 两者主要区别在于预处理器通常定义了一套 CSS 之上的超集语言；PostCSS 并没有定义一门新的语言，
       * 而是与 @babel/core 类似，只是实现了一套将 CSS 源码解析为 AST 结构，
       * 并传入 PostCSS 插件做处理的流程框架，具体功能都由插件实现。
       * 预处理器之于 CSS，就像 TypeScript 与 JavaScript 的关系；
       * 而 PostCSS 之于 CSS，则更像 Babel 与 JavaScript。
       */
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ]
      }
    ]
  },
  /**
   * 用于声明的外部资源,webpack 直接忽略这些资源 跳过这些资源的解析,打包操作
   */
  externals: {},
  //========模块处理============


  //========后处理============
  /**
   * 用于控制如何优化产物包体积
   * Dead Code Elimination 删除文件中未使用的部分
   * Scope Hoisting 作用域提升,文件中定义的内容被直接注入文件对应的模块中
   * 代码混淆
   * 代码压缩
   * 等
   */
  optimization: {},
  /** 
   * 用于配置编译产物的目标运行环境，支持 web、node、electron 等值，不同值最终产物会有所差异
  */
  target: {},
  /** 
   * 编译模式短语，支持 development、production 等值，可以理解为一种声明环境的短语
  */
  mode: {},
  //========后处理============

  //========开发者工具============
  /**
   * 用于配置 HMR 强相关的开发服务器功能
   * 结合 webpack 工作流,提供基于 HTTP(S)协议的静态资源服务
   */
  devServer: {
    hot: true,
    open: true,
    /**
     * 代理
     */
    proxy: {

    },

  },
  /**
   * webpack5 之后,用于配置如何缓存编译过程信息和编译结果
   */
  cache: {},
  /**
   * 用于配置当产物大小超过阈值时,如何通知开发者
   */
  performance: {

  },
  /**
   * 用于精准的控制编译过程的日志内容,在比较细致的性能调试的时候有用
   */
  stats: {},
  /**
   * 用于控制日志的输出方式,例如可以通过该配置将日志输出到磁盘文件
   */
  infrastructureLogging: {},
  /** */
  plugins: [
    /**
     * html-webpack-plugin 是一款根据编译产物自动生成 HTML 文件的 Webpack 插件，
     * 借助这一插件我们无需手动维护产物数量、路径、hash 值更新等问题
     */
    new HtmlWebpackPlugin({
      title: 'Learn Webpack'
    }),
  ]
  //========开发者工具============
}