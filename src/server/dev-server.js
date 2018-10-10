// 使用 webpack-dev-middleware和webpack-hot-middleware
// https://github.com/webpack-contrib/webpack-hot-middleware
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const config = require('../../webpack.dev.config')
const compiler = webpack(config)

// 告诉 express 用中间件和 webpack.dev.config
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
// 使用 HMR
app.use(webpackHotMiddleware(compiler))

app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})





//以下是使用webpack-dev-server和webpack-hot-middleware实现热重载

// const webpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');

// const config = require('../../webpack.dev.config.js');
// const options = {
//   contentBase: './dist',
//   hot: true, //热重载
//   host: 'localhost'
// };
// webpackDevServer.addDevServerEntrypoints(config, options);
// const compiler = webpack(config);
// const server = new webpackDevServer(compiler, options);

// server.listen(5000, 'localhost', () => {
//   console.log('dev server listening on port 5000');
// });