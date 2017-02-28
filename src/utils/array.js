function inArray (value, array) {
  if (typeof value === 'string' || typeof value === 'number') {
    for (let one of array) {
      if (value === one) {
        return true
      }
    }
  }
  return false
}

// all, target不存在的属性也合并
function mergeObject (target, source, all) {
  for (let key in source) {
    if (target.hasOwnProperty(key) || all) {
      target[key] = source[key]
    }
  }
  return target
}

export { inArray, mergeObject }
