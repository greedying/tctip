import Base from '../base/base'
import { createElement } from '../utils/dom'

class BaseDom extends Base {

  constructor (config, parentDom) {
    super(config)
    this._parentDom = parentDom
  }

  get dom () {
    return this._dom
  }

  get parentDom () {
    return this._parentDom
  }

  createDom (params, tagName) {
    let target = this.parentDom ? this.parentDom.dom : document.body
    this._dom = createElement(params, tagName)
    return target.appendChild(this.dom)
  }

  appendDom (params, tagName) {
    let dom = createElement(params, tagName)
    return this.dom.appendChild(dom)
  }

}

export default BaseDom
