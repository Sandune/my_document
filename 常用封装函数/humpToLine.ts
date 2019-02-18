// 下划线转换驼峰
export function toHump(data:any) {
  for (var i in data) {
    var name = i.replace(/\_(\w)/g, function (all, letter) {
      return letter.toUpperCase()
    })
    if (i !== name) {
      data[name] = data[i]
      delete data[i]
    }
  }
  return data
}
// 驼峰转换下划线
export function toLine(data:any) {
  for (var i in data) {
    var name = i.replace(/([A-Z])/g, '_$1').toLowerCase()
    if (i !== name) {
      data[name] = data[i]
      delete data[i]
    }
  }
  return data
}
