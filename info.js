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
    // 字符串形态
    app: './src/index.ts',
    // 数组形态
    shared: ['react', 'react-dom', 'redux', 'react-redux'],
    // 对象形态
    personal: {
      // 声明入口文件,支持路径字符串或路径数组(多入口)
      import: './personal.js',
      filename: 'pages/personal.js',
      /**
       * 声明该入口的前置依赖 bundle
       * foo 入口的 dependOn 属性指向 main 入口，此时 Webpack 认为：客户端在加载 foo 产物之前必然会加载 main，
       * 因此可以将重复的模块代码、运行时代码等都放到 main 产物，减少不必要的重复
       * 
       * dependOn 适用于哪些有明确入口依赖的场景，例如我们构建了一个主框架 Bundle，其中包含了项目基本框架(如 React)，
       * 之后还需要为每个页面单独构建 Bundle，这些页面代码也都依赖于主框架代码，此时可用 dependOn 属性优化产物内容，
       * 减少代码重复。
       */
      dependOn: 'shared',
      /**
       * 设置该入口的 Runtime Chunk，若该属性不为空，Webpack 会将该入口的运行时代码抽离成单独的 Bundle
       * 为支持产物代码在各种环境中正常运行，Webpack 会在产物文件中注入一系列运行时代码，用以支撑起整个应用框架。
       * 运行时代码的多寡取决于我们用到多少特性
       * 例如 需要导入导出文件时，将注入 __webpack_require__.r 等 使用异步加载时，将注入 __webpack_require__.l 等
       * 极端情况下运行时代码量可能超过业务代码量,为此,必要时我们可以尝试使用 runtime 配置将运行时抽离成独立的 bundle
       */
      runtime: 'common-runtime',
      // 效果与 output.chunkLoading 相同，用于声明异步模块加载的技术方案，支持 false/jsonp/require/import 等值
      chunkLoading: 'jsonp',
      // 效果与 output.asyncChunks 相同，用于声明是否支持异步模块加载，默认值为 true。
      asyncChunks: true
    },
    // 函数形态
    admin: function () {
      return './admin.js';
    }
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
    /**
     * 文件发布路径，在 Web 应用中使用率较高
     */
    publicPath: '',
    /**
     * 是否自动清除 path 目录下的内容,调试时特别好用
     */
    clean: true,
    /**
     * NPM Library 形态下的一些产物特性，例如：Library 名称、模块化(UMD/CMD 等)规范；
     */
    library: '',
    /**
     * 声明加载异步模块的技术方案,支持 false/jsonp/require 等方式
     */
    chunkLoading: ''
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
       * 
       */
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 自动注入运行时 react/jsx-runtime 代码,不必手动管理依赖
              presets: ['@babel/preset-react', {
                runtime: 'automatic'
              }]
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
      },
      /**
       * file-loader、url-loader、raw-loader 都并不局限于处理图片，它们还可以被用于加载
       * 任意类型的多媒体或文本文件，使用频率极高，几乎已经成为标配组件！
       * 所以 Webpack5 直接内置了这些能力，开箱即可使用。
       * 
       * 前面介绍的 Loader 与 Asset Modules 都只是解决了图像资源加载 —— 
       * 也就是让 Webpack 能够理解、处理图像资源，现实中我们还需要为 Web 页面中的图片做各种优化，
       * 提升页面性能，常见的优化方法包括：
       * 1 图像压缩：减少网络上需要传输的流量；
       * 2 雪碧图：减少 HTTP 请求次数；
       * 3 响应式图片：根据客户端设备情况下发适当分辨率的图片，有助于减少网络流量；
       * 4 CDN：减少客户端到服务器之间的物理链路长度，提升传输效率；
       * 等等。
       * 
       * image-webpack-loader 底层依赖于 imagemin 及一系列的图像优化工具：
       * 图像压缩是一种非常耗时的操作，建议只在生产环境下开启
       * 
       * 响应式图片:不同设备返回不同尺寸图片
       * https://juejin.cn/book/7115598540721618944/section/7116188435223674911
       */
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // type 属性适用于 Webpack5，旧版本可使用 file-loader
        type: "asset/resource",
        use: [{
          loader: 'image-webpack-loader',
          options: {
            // jpeg 压缩配置
            mozjpeg: {
              quality: 80
            },
          }
        }]
      }
    ]
  },
  /**
   * 用于声明的外部资源,webpack 直接忽略这些资源 跳过这些资源的解析,打包操作
   * Webpack 编译过程会跳过 externals 所声明的库，并假定消费场景已经安装了相关依赖，
   * 常用于 NPM 库开发场景；在 Web 应用场景下则常被用于优化性能。
   * 我们可以将 React 声明为外部依赖，并在页面中通过 <script> 标签方式引入 React 库，
   * 之后 Webpack 就可以跳过 React 代码，提升编译性能。
   * 
   * 可以在package.json里面声明
   * peerDependencies:{
   *  lodash:'4.17.21'
   * }
   * 多数第三方框架都可以沿用上例方式处理，包括 React、Vue、Angular、Axios、Lodash 等，方便起见，
   * 可以直接使用 webpack-node-externals 排除所有 node_modules 模块
   */
  externals: {
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_",
    }
  },
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
   * 
   * production：默认值，生产模式，使用该值时 Webpack 会自动帮我们开启一系列优化措施：
   * Three-Shaking、Terser 压缩代码、SplitChunk 提起公共代码，通常用于生产环境构建；
   * 
   * development：开发模式，使用该值时 Webpack 会保留更语义化的 Module 与 Chunk 名称，
   * 更有助于调试，通常用于开发环境构建；
  */
  mode: '',
  //========后处理============

  //========开发者工具============
  /**
   * 开发者选项
   */
  devtool: 'source-map',
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

/**
 * Webpack 支持三种配置方式：对象、数组、函数
 * 对象方式最简单，且能够应对大多数业务开发场景，所以使用率最高；
 * 数组方式主要用于构建 Library 场景；
 * 函数方式灵活性较高，可用于实现一些简单的环境治理策略。
 * 
 * https://juejin.cn/book/7115598540721618944/section/7118367034789855247
 * webpack 在大型项目中表现不佳,
 * 1. js语言的单线程决定了 webpack 的运算效率不可能很高
 * 2. 大型项目中,webpack 需要借助很多的 plugin 和 loader 来做很多文件读写,代码编译的操作
 * 我们也有很多性能优化的方法
 * 缓存
 * 并发
 * 优化文件处理
 * 
 * webpack 最核心的功能
 * 1. 使用适当的 loader 将任意类型文件转译为 js 代码 例如将 css 转译为 js 字符串,将多媒体文件转译为 base64 代码等
 * 2. 将这些经过 loader 处理的文件资源合并,打包成[向下兼容]的产物文件
 * 
 * webpack的工作流程
 * 1.初始化阶段
 * 初始化参数:从配置文件 配置参数 shell 参数中读取,与默认值 merge 得出最终的参数
 * 创建编译器对象:用上一步得到的参数创建 compiler 对象
 * 初始化编译环境:包括注入内置插件 注册各种模块工厂 初始化 RuleSet 集合 加载配置的插件等
 * 开始编译:执行 compiler 对象的 run 方法,创建 Compilation 对象
 * 确定入口:根据配置中的 entry 找出所有的入口文件,调用 compilation.addEntry 将入口文件装换为 dependence 对象
 * 
 * 2.构建阶段
 * 编译模块(make):从 entry 文件开始,调用 loader 将模块转译为标准 js 内容,调用 js 解析器将内容转换为 AST 对象,
 * 从中找出该模块依赖的模块,再[递归]处理这些依赖模块,直到所有入口依赖的文件都经过了本步骤的处理
 * 完成编译模块:上一步递归处理所有能触达的模块后,得到了每个模块被翻译后的内容以及他们之间的[依赖关系图]
 * 
 * 3.封装阶段
 * 合并(seal):根据入口和模块之间的依赖关系,组装成一个个包含多各模块的 Chunk
 * 优化(optimization):对上述 Chunk 施加一系列优化操作,包括:tree-shaking,terser,scope-hoisting,压缩,code split 等
 * 写入文件系统(emitAssets) 在确定好输入内容后,根据配置确定输出路径和文件名,把文件内容写入到文件系统
 * 
 * 在这个过程中有很多可以优化的地方:
 * 构建阶段:
 * 首先需要将文件的相对引用路径转换为绝对路径，这个过程可能涉及多次 IO 操作，执行效率取决于 文件层次深度；
 * 找到具体文件后，需要读入文件内容并调用 loader-runner 遍历 Loader 数组完成内容转译，这个过程需要执行较密集的 CPU 操作，
 * 执行效率取决于 Loader 的数量与复杂度；
 * 需要将模块内容解析为 AST 结构，并遍历 AST 找出模块的依赖资源，这个过程同样需要较密集的 CPU 操作，
 * 执行效率取决于 代码复杂度；
 * 递归处理依赖资源，执行效率取决于 模块数量。
 * 
 * 封装阶段:
 * 根据 splitChunks 配置、entry 配置、动态模块引用语句等，确定模块与 Chunk 的映射关系，
 * 其中 splitChunks 相关的分包算法非常复杂，涉及大量 CPU 计算；
 * 根据 optimization 配置执行一系列产物优化操作，特别是 Terser 插件需要执行大量 AST 相关的运算，
 * 执行效率取决于 产物代码量；
 * 
 * 
 * 优化:
 * 1. 缓存: cache: { type: 'filesystem'},
 * 缓存是一种应用广泛的性能优化技术,在计算机领域几乎无处不在 例如操作系统层面的 CPU 高速缓存,硬盘缓存
 * 网络中的 DNS 缓存,HTTP 缓存
 * 业务应用中的数据库缓存,Redis 分布式缓存等
 * 2. 受限于 node 的单线程架构,webpack 对所有资源做的解析 转译 合并等操作都是在同一个线程中串行执行
 * CPU 利用率很低
 * HappyPack：多进程方式运行资源加载(Loader)逻辑；
 * Thread-loader：Webpack 官方出品，同样以多进程方式运行资源加载逻辑；
 * Parallel-Webpack：多进程方式运行多个 Webpack 构建实例；
 * TerserWebpackPlugin：支持多进程方式执行代码压缩、uglify 功能。
 * 方案的核心都很类似:针对某种计算任务创建子进程,之后将运行所需参数通过 IPC 传递到子进程并启动计算操作,
 * 计算完毕后子进程再将结果通过 IPC 传递回主进程,寄宿在主进程的组件实例,再将结果交给 webpack
 * 并行压缩:
 * optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: 2 // number | boolean
        })],
    },
  并行确实能够提升系统运行效率，但 Node 单线程架构下，所谓的并行计算都只能依托与派生子进程执行，
  而创建进程这个动作本身就有不小的消耗 —— 大约 600ms，对于小型项目，构建成本可能可能很低，
  引入多进程技术反而导致整体成本增加，因此建议大家按实际需求斟酌使用上述多进程方案。

 */