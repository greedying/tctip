import BaseDom from './base-dom'

class BtnBox extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._button = undefined
    this.genDom()
  }

  genDom (BaseDom) {
    this.createDom({
      className: 'tctip-btn-box',
      onclick() {
        parentDom.dom.style.width == '240px' ? parentDom.hide() : parentDom.show();
      },
      href: 'javascript:;'
    }, 'a')

    this._button = new Btn(this.config, this)
  }
}

class Btn extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this.genDom()
  }

  genDom () {
    this.createDom({
      src: this.config.button.imageUrl
    }, 'img')
  }
}

export default BtnBox
