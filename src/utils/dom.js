// body准备好后，执行函数
function ready (callback) {
  if (!document.body) {
    // 判断body是否存在，如果不存在则等待存在
    setTimeout(function () {
      ready(callback)
    }, 0)
  } else {
    callback && callback()
  }
}

/**
 **在目标元素target最后创建新元素。
 * 新元素标签名为tagName,属性则由param键值对决定
 */
function createElement (params, tagName) {
  let element = document.createElement(tagName || 'div')
  for (let key in params) {
    if (key !== 'style') {
      element[key] = params[key]
    } else {
      for (let csskey in params[key]) {
        element.style[csskey] = params[key][csskey]
      }
    }
  }
  return element
}

/***
 * 根据className获得元素
 */
function getElementsByClassName (className, node) {
  node = node || document

  if (node.getElementsByClassName) {
    return node.getElementsByClassName(className)
  } else {
    let getElementsByClassName = (searchClass, node) => {
      let classElements = []
      let els = node.getElementsByTagName('*')
      let pattern = new RegExp(`(^|\\s)${searchClass}(\\s|$)`)

      for (let el of els) {
        if (pattern.test(el.className)) {
          classElements.push(el)
        }
      }
      return classElements
    }
    return getElementsByClassName(className, node)
  }
}

// 判断浏览器类型
function getExplorer () {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const explorers = [
    'msie',
    'firefox',
    'chrome',
    'opera',
    'safari'
  ]
  for (let explorer of explorers) {
    if (userAgent.indexOf(explorer) >= 0) {
      return explorer
    }
  }
  return 'other'
}

// 如果是firefox，则使用textContent，否则使用innerText
let textKey = 'innerText'
if (getExplorer() === 'firefox') {
  textKey = 'textContent'
}

export {
  ready,
  createElement,
  getElementsByClassName,
  textKey
}
