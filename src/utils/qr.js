import qrcode from 'qrcode-generator/qrcode.js'
const errorLevel = 'L'
const typeNumber = 4
// const width = 106
const margin = 0
const cellSize = 5

/**
(typeNumber * 4 + 17) * cellSize + margin * 2 = width
 cellSize = (width - margin *2) / (typeNumber * 4 + 17) = 4.24，近似5
 width本来是106，这样就让width大一些好了
**/

export default function (content) {
  let qr = qrcode(typeNumber, errorLevel)
  qr.addData(content)
  qr.make()
  return qr.createImgTag(cellSize, margin)
}
