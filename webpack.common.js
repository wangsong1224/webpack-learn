 /**
  * tree shaking
  * 移除 JavaScript 上下文中未引用的代码( dead-code),它依赖于 ES2015模块系统中的静态结构特性
  * 例如 import export 兴起于 rullup
  * webpack4通过 package.json 的' sideEffects 属性作为标记,向 compiler 提供提示,
  * 表明项目中的哪些文件是 "pure(纯的 es2015模块)",由此可以安全的删除文件中未使用的部分
  * 为了学会使用 tree shaking，你必须……
  * 1.使用 ES2015 模块语法（即 import 和 export）。
  * 2.在项目 package.json 文件中，添加一个 "sideEffects" 属性。
  * 3.引入一个能够删除未引用代码(dead code)的压缩工具(minifier),例如 UglifyJSPlugin
  */

 /**
  * 代码分离
  * 把代码分离到不同的 bundle 中,然后可以按需加载或并行加载这些文件
  * 代码分离可以用于获取更小的 bundle, 以及控制资源加载优先级,如果合理使用,会极大影响加载时间
  * 有三种常见的代码分离方法:
  * 1.入口起点:使用 entry 配置手动的分离代码
  * 2.防止重复:使用 SplitChunks 去重和分离 chunk
  * 3.动态导入:通过模块的内联函数调用来分离代码
  * 动态导入有两种方法:
  *   3.1推荐的方法是使用 import()函数
  *     import()调用会在内部用到 promise 如果在旧版浏览器中使用 import(),记得使用一个 
  *     polyfill库来 shim Promise
  *   3.2使用 webpack 特定的 require.ensure
  */

 /**
  * 缓存
  * build 会生成一个可部署的 /dist 目录,然后把打包后的内容放置在此目录中
  * 只要将 dist 目录中的内容部署到服务器上,客户端(通常是浏览器)就能够访问网站此服务器的网站及资源
  * 然而最后一步获取资源是比较费时间的,这就是缓存产生的原因
  * 可以通过命中缓存,以降低网络流量,是网站加载速度更快,然而,如果我们在部署新版本时不更改资源的文件名
  * 浏览器可能会认为它没有更新,就会使用它缓存的版本 由于缓存的存在,当你需要获取新的代码时,就会很麻烦
  * 
  * 通过必要配置,确保 webpack 编译生成的文件能够被客户端缓存,当文件内容变化后,能够请求到新的文件
  */

 /**
  * shimming
  * webpack 编译器( compiler)能够识别遵循 ES2015模块语法, CommonJS 或者 AMD 规范编写的模块,
  * 然而一些第三方的库可能会引用一些全局依赖(比如 jQuery)
  * 这些库也可能创建一些需要被导出的全局变量 这些不符合规范的模块就是 shimming 发挥作用的地方
  * 
  * webpack 整体的概念是让前端开发更加模块化,需要编写具有良好封闭性 彼此隔离的模块,以及不要依赖于
  * 那些隐含的依赖模块(例如全局变量)
  * shimming 另一个使用场景,当你希望 polyfill 浏览器功能来支持更多用户时.
  * 这种情况下,你可能指向要将这些 polyfills 提供给需要修补(patch)的浏览器(也就是实现按需加载)
  * 
  */

 /**
  * module: 提供比完整程序接触面( surface area)更小的离散功能块.精心编写的程序提供了可靠的抽象和
  *   封装接线,使得应用程序中每个模块都具有条理清楚的设计和明确的目的.
  * 
  * bundle: 由多个不同的模块生成, bundles 包含了早已经过加载和编译的最终源文件版本
  * 
  * bundle 分离:这个流程提供一个优化 build 的方法,允许 webpack 为应用程序生成多个 bundle.
  *   最终效果是,当其他某些 bundle 的改动时,彼此独立的另一些 bundle 都可以不受到影响,减少需要
  *   重新发布的代码量,因此由客户端重新下载并利用浏览器缓存
  * 
  * chunk: 这是 webpack 特定的术语,被用在内部来管理 building 过程. bundle 由 chunk 组成
  *   通常 chunk 会直接对应输出的 bundle, 但是有一些配置并不会产生一对一的关系
  * 
  * 第三方库入口点( Vendor Entry Point): 从 app.js 和 vendors.js 开始创建依赖图.
  *   这些依赖图是彼此完全分离相互独立的,允许你使用CommonsChunkPlugin 从「应用程序 bundle」
  *   中提取 vendor 引用(vendor reference) 到 vendor bundle.可以帮助你在 webpack 中实现
  *   被称为长效缓存的通用模式.
  * 
  * 代码分离( code splitting): 指将代码分离到每个 bundles/chunks 里面,你可以按需加载,而不是加载
  *   一个包含全部的 bundle.
  * 
  * 配置( configuration): webpack 的配置文件是一个普通的 JavaScript 文件,它导出为一个对象,然后
  *   webpack 根据这个对象定义的属性进行处理
  * 
  */

 /**
  * 公共路径
  * webpack 提供了一个非常有用的配置,该配置为项目中所有的资源指定一个基础路径.它被称为公共路径
  * 在开发模式中,我们通常有一个 assets/ 文件夹,它往往存放在和首页一个级别的目录下面,这样是很方便,
  * 但是如果在生产环境中,你想把这些静态文件统一使用 CDN 加载,怎么办?
  * 想要解决这个问题,你可以使用有着悠久历史的环境变量.比如,我们设置一个名为 ASSET_PATH 的变量
  * 
  * 即时设定路径值:
  * 另一个可能出现的情况是,我们需要即时设置公共路径. webpack 提供了一个全局变量供你设置,叫
  *  __webpack_public_path__.所以在项目的入口,可以简单地设置如下:
  * __webpack_public_path__=process.env.ASSET_PATH
  * 一切设置完成。因为我们已经在我们的配置项中使用了DefinePlugin， 
  * process.env.ASSET_PATH 就已经被定义了， 所以让我们能够安心地使用它了。
  */

 /**
  * 集成
  * webpack 是一个模块打包器(例如 Browserify,Brunch),不是一个任务执行器(例如 Make,Grunt,Gulp).
  * 任务执行器就是用来自动化的处理常见的开发任务,例如项目的检查( lint),构建( build),测试( test),
  * 相对于打包器( bundler),任务执行器聚焦在偏重上层的问题上面.你可以使用上层的工具,把打包部分的问题
  * 交给 webpack.
  * 
  * 打包器帮助你取得准备用于部署的 JavaScript 和样式表,将它们转换为适合浏览器的可用格式.
  * 例如: JavaScript 可以压缩,拆分 chunk 和懒加载来提高性能.打包是 web 开发中最重要的挑战之一,解决
  * 此问题可以消除开发过程中大部分痛点.
  * 
  * 如果以正确的方式处理(虽然有一些功能重复),任务运行器和模块打包器能够一起协同工作
  * Gulp:https://webpack.docschina.org/guides/integrations/
  */

 /**
  * webpack 构建的典型应用程序或者站点中,有三种主要类型的代码:
  * 1.开发人员编写的源码
  * 2.源码依赖的任何第三方的 library 或者 vendor 代码
  * 3.webpack 的 runtime 和 manifest, 管理所有模块的交互
  * 
  * Runtime
  * 包含:在模块交互时,连接模块所需的加载和解析逻辑,班阔浏览器中的已加载模块的连接,以及懒加载模块的执行逻辑
  * 
  * Manifest
  * 打包之后,开发时候的目录结构( src )等已经不存在, webpack 通过 manifest 来管理所有模块之间的交互.
  * 当编译器( compiler )开始执行 解析和映射应用程序时,它会保留所有模块的详细要点.这个数据集合称之为
  * "Manifest".当完成打包并发送到浏览器时,会在运行时通过Manifest来解析和加载模块.
  * 无论选择哪种模块语法, import 和 require 等都被转换为 __webpack_require__ 方法,
  * 此方法指向模块标识符( module identifier).通过使用Manifest中的数据, runtime 能够查询模块标识符,
  * 检索出背后对应的模块.
  */

 const path = require('path')
 const webpack = require('webpack')
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CleanWebpackPlugin = require('clean-webpack-plugin')
 const WorkboxPlugin = require('workbox-webpack-plugin')
 module.exports = {
   /**
    * 入口起点指示 webpack 应该使用哪个模块作为构建其内部依赖图(dependcy graph)的开始,
    * webpack 会找出有哪些模块和 library 是入口起点直接和间接依赖的.
    * 
    * 传入数组的作用:在你想要多个依赖文件一起注入,并且将它们的依赖导向到一个 chunk 的时候,
    *   传入数组的方式很有用.
    * 
    * 多入口 根据入口起点名称动态生成 bundle 名称
    */

   //1.多入口使用HMR写法
   // entry: {
   //   app: './src/index.js,webpack-hot-middleware/client?reload=true',
   //   print: './src/print.js,webpack-hot-middleware/client?reload=true'
   // },

   // 2.单入口使用 HMR 写法
   // entry: ['webpack-hot-middleware/client?reload=true', './src/index.js'],

   //3.普通多入口写法
   //  entry: {
   //    polyfills: './src/polyfill.js',
   //    app: './src/index.js'
   //  },

   // 4.普通单入口写法
   //  entry: ['./src/index.js'],

   // 5.引入 ts 写法
   entry: ['./src/index.ts'],

   /**
    * output 属性告诉 webpack 在哪里输出它所创建的 bundles, 以及如何命名这些文件.
    * 开始的时候在 index.html 文件中手动引入所有的资源,随着程序的增长,尤其是对文件名使用哈希(hash)
    * 并且输出多个 bundle 的时候,手动对 index.html 管理会很困难,这时候可以引入插件
    * 
    * 多输出
    * webpack 生成了 print.bundle.js 和 app.bundle.js 文件,这也和我们在 index.html 文件中
    * 指定的名称对应.
    * 但是我们如果更改了一个入口起点的名称,或者添加了一个入口起点,生成的包将被重命名在一个构建中,
    * 但是我们的 index.html 文件仍然会引用旧的名字,可以用 HTMLWebpackPlugin 来解决
    * 
    * 通过使用 output.filename进行文件名替换,可以确保浏览器获取到修改后的文件
    * [hash]替换可以用于在文件名中包含一个构建相关的 hash
    * [chunkhash]替换在文件名中包含一个 chunk 相关的 hash 
    * dev 模式不支持 chunkhash?
    */
   output: {
     //  filename: '[name].bundle.js',
     //  filename: '[name].[hash].js',
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
     // publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问
     // webpack-dev-middleware用的到
     // publicPath: '/'
   },

   /**
    * 优化
    * CommonsChunkPlugin 已经从 webpack v4（代号 legato）中移除。
    * 想要了解最新版本是如何处理 chunk，请查看 SplitChunksPlugin。
    * SplitChunks 插件可以将公共的依赖模块提取到已有的入口 chunk 中,或者提取到一个新生成的 chunk
    * 去掉重复的依赖模块
    * 
    * webpack 提供了一个优化功能,可以根据提供的选项将运行时的代码拆分成独立的块,直接将
    * optimization.runtimeChunk 设置为 single, 就能创建单个运行时 bundle
    * 
    * 将第三方库(比如 lodash react)提取到单独的 vendor chunk 文件中是推荐的做法
    * 因为他们很少像本地源代码那样频繁的修改,可以利用客户端的长效缓存机制,可以通过命中缓存
    * 来消除请求,并减少向服务器获取资源,同时还能保证客户端代码和服务器端代码版本一致
    * 可以用 cacheGroups 选项来实现
    * 
    */
   optimization: {
     splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all'
         }
       }
     },
     runtimeChunk: 'single'
   },

   /**
    * loader
    * 开箱即用的自带特性. webpack 本身只支持 JavaScript 文件.而 loader 能够让 webpack 处理非 JavaScript
    * 文件,并现将他们转换为有效的 模块,然后添加到依赖图中
    * loader 能够 import 导入任何类型的模块
    */
   module: {
     rules: [
       /**
        * 一些传统的模块依赖的 this 指向的 window, 当模块运行在 CommonJS环境下这将变成一个问题,也就是
        * this 指向的是 module.exports 可以通过 imports-loader 覆写 this
        */
       {
         test: require.resolve('./src/thisToWindow.js'),
         use: 'imports-loader?this=>window'
       },
       /**
        * 使用 exports-loader 将一个全局变量作为一个普通的模块来导出
        * 将 file 导出为 file 将 helpers.parse 导出为 parse
        */
       {
         test: require.resolve('./src/global.js'),
         use: 'exports-loader?file,parse=helpers.parse'
       },
       /**
        * 解析 ts 文件
        */
       {
         test: /\.tsx?$/,
         use: 'ts-loader',
         exclude: /node_modules/
       }
     ]
   },

   /**
    * 解析
    * 这些选项能设置模块如何被解析, webpack 提供了合理的默认值,但是还是可能会修改一些解析的细节
    * 
    */
   resolve: {
     // 自动解析默认的扩展 https://webpack.docschina.org/configuration/resolve/
     extensions: ['.tsx', '.ts', '.js']
   },

   /**
    * 插件
    * loader 被用于转换某些类型的模块,而插件可以用于执行范围更广的任务
    * 插件的范围包括:打包优化 资源管理 注入环境变量
    */
   plugins: [
     /**
      * HtmlWebpackPlugin会默认生成 index.html 文件,会用新的替换原来的,
      * 所有的 bundle 会自动添加到 HTML 中
      * https://github.com/jantimon/html-webpack-plugin
      */
     new HtmlWebpackPlugin({
       title: 'Learn Webpack'
     }),
     /**
      * 每次构建之前清理 dist文件是比较推荐的做法
      * https://www.npmjs.com/package/clean-webpack-plugin
      */
     new CleanWebpackPlugin(['dist']),
     /**
      * 在 webpack 编译的每个模块中,通过访问_变量就可以获取到 package 包
      * 就是告诉 webpack 如果至少有一处引用到了_ 就将 lodash 包引入进来,提供给用到它的模块
      * 还可以通过一个'数组路径'进行配置,例如 代码中用到 json()时候 其实用的是 lodash 的 json 方法
      */
     new webpack.ProvidePlugin({
       _: 'lodash',
       json: ['lodash', 'json']
     }),
     new WorkboxPlugin.GenerateSW({
       //这些选项帮助 ServiceWorkers 快速启动 不允许遗留任何旧的ServiceWorkers
       clientsClaim: true,
       skipWaiting: true
     })
   ]
 }