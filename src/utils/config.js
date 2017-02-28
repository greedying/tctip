import { inArray, mergeObject } from './array'

const defaultTop = '10%'

const defaultStat = true

const buttonTypes = ['dashang', 'zanzhu']

const defaultButton = {
  id: 1,
  type: 'dashang'
}

const buttonImages = {
  zanzhu: {
    '1': require('../assets/img/button/zanzhu/1.png'),
    '2': require('../assets/img/button/zanzhu/2.png'),
    '3': require('../assets/img/button/zanzhu/3.png'),
    '4': require('../assets/img/button/zanzhu/4.png'),
    '5': require('../assets/img/button/zanzhu/5.png'),
    '6': require('../assets/img/button/zanzhu/6.png'),
    '7': require('../assets/img/button/zanzhu/7.png'),
    '8': require('../assets/img/button/zanzhu/8.png'),
    '9': require('../assets/img/button/zanzhu/9.png')
  },
  dashang: {
    '1': require('../assets/img/button/dashang/1.png'),
    '2': require('../assets/img/button/dashang/2.png'),
    '3': require('../assets/img/button/dashang/3.png'),
    '4': require('../assets/img/button/dashang/4.png'),
    '5': require('../assets/img/button/dashang/5.png'),
    '6': require('../assets/img/button/dashang/6.png'),
    '7': require('../assets/img/button/dashang/7.png'),
    '8': require('../assets/img/button/dashang/8.png'),
    '9': require('../assets/img/button/dashang/9.png')
  }
}

const defaultList = {
  alipay: {
    icon: require('../assets/img/icon/alipay.png'),
    name: '支付宝',
    desc: '支付宝打赏'
  },
  wechat: {
    icon: require('../assets/img/icon/wechat.png'),
    name: '微信',
    desc: '微信打赏'
  },
  bitcoin: {
    icon: require('../assets/img/icon/bitcoin.png'),
    name: '比特币',
    desc: '比特币打赏'
  },
  tenpay: {
    icon: require('../assets/img/icon/tenpay.png'),
    name: '财付通',
    desc: '财付通打赏'
  }
}

function formatConfig (config) {
  if (config.stat === undefined) {
    config.stat = defaultStat
  }
  config.top || (config.top = defaultTop)
  formatButton(config)
  formatList(config)
}

function formatButton (config) {
  if (!config.button) {
    config.button = defaultButton
  }

  let button = config.button
  if (button.imageUrl) {
    return
  }

  if (!button.id) {
    button.id = defaultButton.id
  }
  if (!button.type || !inArray(button.type, buttonTypes)) {
    button.type = defaultButton.type
  }
  button.imageUrl = buttonImages[button.type][button.id]
  delete button.type
  delete button.id
}

function formatList (config) {
  if (!config.list) {
    console.error('必须传入list参数')
    return
  }

  let list = []
  let knowActive = false

  for (let one of config.list) {
    if (!one.type) {
      console.error('缺少type，相应配置文件为', one)
      break
    }
    if (!one.qrImg && !one.qrContent) {
      console.error('缺少qrImg或者qrContent参数，相应配置文件为', one)
      break
    }

    let type = one.type
    if (defaultList.hasOwnProperty(type)) {
      mergeObject(one, defaultList[type], true)
    }

    if (knowActive) {
      one.active = ''
    } else if (one.active) {
      knowActive = true
    }

    // 增加索引
    one.index = list.length
    list.push(one)

    if (list.length >= 5) {
      break
    }
  }

  if (!knowActive) {
    list[0].active = true
  }

  config.list = list
}

export { formatConfig }
