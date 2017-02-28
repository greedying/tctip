import BaseDom from '../../base-dom'
import { textKey } from '../../../utils/dom'
import Emitter from '../../../base/emitter'

class IconBox extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._iconList = undefined
    this.genDom()
  }

  genDom () {
    this.createDom({
      className: 'tctip-icon-box'
    })

    this._iconList = new IconList({
      list: this.config.list
    }, this)
  }

}

class IconList extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._iconDoms = []
    this.genDom()
  }

  get className () {
    return this.config.list.length < 5 ? 'not-full' : ''
  }

  genDom () {
    this.createDom({
      className: this.className
    }, 'ul')

    for (let info of this.config.list) {
      this._iconDoms.push(new Icon(info, this))
    }
  }

}

class Icon extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._link = undefined
    this._emitter = Emitter
    this.genDom()
    this.addEvent()
  }

  get className () {
    return this.active ? 'tctip-current' : ''
  }

  set className (className) {
    this.dom.className = className
  }

  get active () {
    return this.config.active || false
  }

  set active (active) {
    this.config.active = active
    this.className = active ? 'tctip-current' : ''
  }

  genDom () {
    this.createDom({
      className: this.className
    }, 'li')

    this._link = new IconLink(this.config, this)
  }

  // 监听事件，更改class
  addEvent () {
    this._emitter.on('changeIcon', (item) => {
      this.active = this.config.index === item.index
    })
  }

}

class IconLink extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this._img = undefined
    this._emitter = Emitter
    this.genDom()
  }

  get className () {
    return this.config.index === 4 ? 'fifth' : ''
  }

  genDom () {
    this.createDom({
      className: this.className,
      href: 'javascript:',
      onmouseover: () => {
        this.mouseover()
      },
      [textKey]: this.config.name
    }, 'a')

    this._img = new IconImg(this.config, this)
  }

  mouseover () {
    this._emitter.emit('changeIcon', this.config)
  }
}

class IconImg extends BaseDom {
  constructor (config, parentDom) {
    super(config, parentDom)
    this.genDom()
  }

  genDom () {
    this.createDom({
      src: this.config.icon,
      alt: this.config.name
    }, 'img')
  }
}

export default IconBox
