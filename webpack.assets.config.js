const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      // 为了从 JavaScript 模块中 import 一个 css 文件,需要在 module配置中安装并添加
      // style-loader css-loader
      {
        //通过正则确定应该查找哪些文件,并将其提供给指定的 loader
        // 在大多数情况下,可以将 css 提取,以便在生产环境中节省加载时间
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      /**
       * 加载图片
       * 现在,
       * 1.当你 import MyImage from './my-image.png' 该图像会被处理并添加到 output 目录
       * 并且 a 变量包含该图像在处理后的最终 url 
       * 2.当使用 css-loader 时,你的 css 中的 url('./my-image.png') 会使用类似的过程去处理. 
       * loader 会识别这是一个本地文件,并将'./my-image.png'路径,替换为输出目录中图像的最终路径 
       * 3.html-loader 以相同的方式处理 <img src="./my-image.png" />
       */
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      /**
       * 加载字体
       * file-loader 和 url-loader 可以接受并加载任何文件,然后将其输出到构建目录
       */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      /**
       * 加载数据
       * JSON,CSV,TSV,XML 等等 类似于 nodejs,JSON 的支持是内置的,也就是说 
       * import Data from './data.json' 默认正常运行.要导入 CSV,TSV,XML 
       * 可以使用 csv-loader xml-loader
       * 
       * 使用 d3等工具来实现某些数据可视化时,预加载数据会非常有用.我么可以不在发送 ajax 请求,
       * 然后运行时解析数据,而是在构建过程中将其提前载入并打包到模块中,以便浏览器加载模块后可以
       * 立即从模块中解析数据
       */
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
}