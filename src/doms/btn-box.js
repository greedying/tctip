import BaseDom from './base-dom'

class BtnBox extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._button = undefined
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip-btn-box',
      onclick: () => {
        this.parentDom.dom.style.width === '240px' ? this.parentDom.hide() : this.parentDom.show()
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
