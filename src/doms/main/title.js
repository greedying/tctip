import BaseDom from '../base-dom'
import { textKey } from '../../utils/dom'

class Title extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip-title',
      [textKey]: '喜欢请打赏'
    }, 'h1')
  }
}

export default Title
