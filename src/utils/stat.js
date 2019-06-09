import { createElement } from './dom'

const version = require('../../package.json').version
const statUrl = '//stat.tctip.com/stat/index'

export default function () {
  let url = `${statUrl}/version/${version}`
  document.body.appendChild(createElement({
    src: url
  }, 'script'))
}
