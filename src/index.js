// import _ from 'lodash'
import printMe from './print.js'

/**
 * 重新 build, 会看到生成了两个额外的文件:
 * sw.js 和体积很大的 precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js。
 * sw.js 是 Service Worker 文件，
 * precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js 是 sw.js 引用的文件，
 * 所以它也可以运行。可能在你本地生成的文件会有所不同；但是你那里应该会有一个 sw.js 文件。
 * 
 * 先 build 再 start 然后关掉服务 刷新页面 还有显示,说明缓存了
 */
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
//       console.log('SW registered: ', registration);
//     }).catch(function (registrationError) {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

// 在添加 DefinePlugin 插件之后,有的 bundle 大小会显著的下降,还有,任何位于/src的本地代码
// 都可以关联到 process.env.NODE_ENV 环境变量,以下检查是有效的
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

function component() {
  var element = document.createElement('div')
  var btn = document.createElement('button')
  //添加文字 全局定义了变量_指向 lodash
  element.innerHTML = _.join(['Hello', 'webpack', '你好', '22'], ' ')
  // 添加 css
  element.classList.add('hello');
  // 添加按钮
  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe
  element.appendChild(btn)
  return element
}

document.body.appendChild(component())