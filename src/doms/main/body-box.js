import BaseDom from '../base-dom'
import IconBox from './body/icon-box'
import QRDetail from './body/qr-detail'

class BodyBox extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._iconBox = undefined
    this._QRBox = undefined
    this._currentItem = undefined
    this.genDom()
  }

  get currentItem () {
    if (!this._currentItem) {
      for (let item of this.config.list) {
        if (item.active) {
          this._currentItem = item
        }
      }
    }
    return this._currentItem
  }

  set currentItem (item) {
    this._currentItem = item
  }

  genDom () {
    this.createDom({
      className: 'tctip-body-box'
    })

    this._iconBox = new IconBox({
      list: this.config.list
    }, this)

    this._QRDetail = new QRDetail(this.currentItem, this)
  }

}

export default BodyBox
