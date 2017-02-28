import BaseDom from '../..//base-dom'
import { textKey } from '../../../utils/dom'
import qrcode from '../../../utils/qr'
import Emitter from '../../../base/emitter'

class QRDetail extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._box = undefined
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip-qr-detail'
    })

    this._box = new QRBox(this.config, this)
  }

}

class QRBox extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._qrTitle = undefined
    this._qrCode = undefined
    this._qrDesc = undefined
    this._emitter = Emitter
    this.genDom()
    this.addEvent()
  }

  genDom () {
    this.createDom({
      className: 'tctip-qr-box'
    })
    this.genChildren()
  }

  genChildren () {
    this._qrTitle = new QRTitle({}, this)
    this._qrCode = new QRCode(this.config, this)
    this._qrDesc = new QRDesc({
      desc: this.config.desc || ''
    }, this)
  }

  // 监听事件，更改二维码box，直接清空重新生成，效率差点
  addEvent () {
    this._emitter.on('changeIcon', (item) => {
      this.config = item
      this.dom.innerHTML = ''
      this.genChildren()
    })
  }

  regenDom (config) {
    this._config = config
    this.dom.innerHTML = ''
    this._box = new QRBox(this.config, this)
  }

}

class QRTitle extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip-qr-title',
      [textKey]: '扫描二维码打赏'
    }, 'p')
  }
}

class QRCode extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip-qr-code'
    })
    this.genQR()
  }

  genQR () {
    if (this.config.qrImg) {
      this.appendDom({
        src: this.config.qrImg
      }, 'img')
    } else if (this.config.qrContent) {
      this.dom.innerHTML = qrcode(this.config.qrContent)
    } else {
      console.error('没有可展示的二维码')
    }
  }
}

class QRDesc extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip-qr-desc',
      [textKey]: this.config.desc
    }, 'p')
  }
}

export default QRDetail
