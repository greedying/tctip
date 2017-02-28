class Base {
  constructor (config) {
    this.config = config
  }

  get config () {
    return this._config
  }

  set config (config) {
    this._config = config
  }

}

export default Base
