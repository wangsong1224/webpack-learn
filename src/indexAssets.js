import _ from 'lodash'
// 资源
import './style.css'
import BtnKai from './image/btn_kai.png'
import DataXml from './data/data.xml'

function component() {
  var element = document.createElement('div')
  //添加文字
  element.innerHTML = _.join(['Hello', 'webpack', '你好'], ' ')
  // 添加 css
  element.classList.add('hello');
  // 添加图片
  var img = new Image()
  img.src = BtnKai
  document.body.appendChild(img)
  console.log(DataXml)
  return element
}

document.body.appendChild(component())