/**
 * 渐进式网络应用程序( Progressive Web Application)
 * 是一种可以提供类似于原生应用程序体验的网络应用程序. 
 * PWA能做到原生应用体验靠的不是某一项技术,而是经过应用一些新技术进行改进,在安全 性能和体验都有很大的
 * 提升.
 * 特点:
 * 1.可靠 即使在不稳定的网络环境下,也能瞬间加载并展现
 *   Server Workers 是用 JavaScript 编写的 JS 文件,能够代理请求,并且能够操作浏览器缓存,通过将缓存的
 * 内容直接返回,让请求能够瞬间完成.开发者可以预存储关键文件,可以淘汰过期的文件等等.
 *   前端工程师的很多性能优化手段,比如 CDN,CSS Sprite, 文件的合并压缩,异步加载,资源缓存等等,大部分都是
 * 在干一件事儿,就是尽量降低一个页面网络请求成本从而缩短页面加载资源的时间并降低用户可感知的延时,提高浏览器
 * 渲染速度,提升代码质量.
 *   浏览器的 JavaScript 都是运行在一个单一主线程上,同一时间只能做一件事.随着 web 业务不断复杂,我们加了
 * 很多消耗资源,时间的复杂运算.这些导致了很多的性能问题.
 *   所以 Web Worker API 被造出来,唯一目的就是解放主线程,它是脱离在主线程之外的,将一些复杂的耗时的活儿
 * 交给它,完成后通过 postMessage 方法告诉主线程,而主线程通过 onMessage 方法得到 Web Worker的结果反馈
 * 但是 web Worker 是临时的,每次做的事情的结果还不能被持久存下来,如果下次有同样复杂的计算,还得非时间再计算
 * 一遍,Service Worker 在 Web Worker 的基础上加上了持久离线缓存能力。
 *   Server Workers有以下的功能和特性
 *   1.1 一个独立的 worker 线程,独立与当前网页进程,有自己独立的 worker context
 *   1.2 一旦被 install 就永远存在,除非被手动 unregister
 *   1.3 用到的时候可以直接唤醒,不用的时候自动睡眠
 *   1.4 可编程拦截代理请求和返回,缓存文件,缓存的文件可以被网页进程取到(包括网络离线状态)
 *   1.5 离线内容开发者可控
 *   1.6 能向客户端推送消息
 *   1.7 不能直接操作 DOM
 *   1.8 必须在 HTTPS 环境下才能工作
 *   1.9 异步实现,内部大都是通过 Promise 实现
 * 
 * 2.体验 快速响应,并且有平滑的动画响应用户操作
 * 3.粘性 像设备上的原生应用,具有沉浸式的用户体验,用户可以添加到桌面
 */