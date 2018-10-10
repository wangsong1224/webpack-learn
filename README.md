## 1.管理资源

> webpack 出现之前,前端开发人员会使用 grunt 和 gulp 等工具来处理资源,并将  它们从/ src 文件夹移动到/ dist

> webpack 会动态打包所有的依赖项 每个模块都可以明确的描述它自身的依赖,我们将避免打包未使用的模块

> webpack 最出色的功能之一就是,除了 JavaScript, 还可以通过 loader 引入任何其他类型的文件 也就是说, 其他静态资源等等,可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容.

> webpack 会在幕后将代码转译 webpack 不会更改代码中除了 import 和 export 语句以外的部分 如果想使用更多 ES2015 的特性 请使用 babel
