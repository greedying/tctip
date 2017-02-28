import BaseDom from '../base-dom'
import { textKey } from '../../utils/dom'

class Footer extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._link = undefined
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip-footer'
    }, 'p')

    this._link = new Link({}, this)
  }
}

class Link extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this.genDom()
  }

  genDom () {
    this.createDom({
      href: 'https://github.com/greedying/tctip',
      target: '_blank',
      [textKey]: '了解更多'
    }, 'a')
  }
}

export default Footer
