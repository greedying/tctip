import BaseDom from './base-dom'
import BtnBox from './btn-box'
import MainBox from './main-box'

class Tctip extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._btnBox = undefined
    this._mainBox = undefined
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip',
      style: {
        top: this.config.top
      },
      onmouseover: () => {
        this.show()
      },
      onmouseout: () => {
        this.hide()
      }
    })
    this._btnBox = new BtnBox(this.config, this)
    this._mainBox = new MainBox(this.config, this)
  }

  show () {
    this.dom.style.width = '240px'
  }

  hide () {
    this.dom.style.width = '0px'
  }

}
export default Tctip
