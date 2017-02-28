import BaseDom from './base-dom'
import Title from './main/title'
import BodyBox from './main/body-box'
import Footer from './main/footer'

class MainBox extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._title = undefined
    this._bodyBox = undefined
    this._footer = undefined
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip-main-box'
    })
    this._title = new Title({}, this)
    this._bodyBox = new BodyBox({
      list: this.config.list
    }, this)
    this._footer = new Footer({}, this)
  }
}

export default MainBox
