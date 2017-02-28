require('./assets/style/tctip.less')

import { ready } from './utils/dom'
import { formatConfig } from './utils/config'
import stat from './utils/stat'
import TctipDom from './doms/tctip'
import Base from './base/base'

const version = require('../package.json').version

class Tctip extends Base {

  formatConfig () {
    formatConfig(this._config)
  }

  getTctipDom () {
    this._tctipDom = new TctipDom(this._config)
  }

  stat () {
    stat()
  }

  init (config) {
    if (config) {
      this._config = config
    }
    ready(() => {
      this.formatConfig()
      this.getTctipDom()
      this.config.stat && this.stat()
    })
  }
}

Tctip.version = version

export default Tctip
