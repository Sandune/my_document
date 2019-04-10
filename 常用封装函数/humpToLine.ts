// 下划线转换驼峰
export function toHump(data: any) {
  for (const i of data) {
    const name = i.replace(/\_(\w)/g, (all: any, letter: any) => {
      return letter.toUpperCase();
    });
    if (i !== name) {
      data[name] = data[i];
      delete data[i];
    }
  }
  return data;
}
// 驼峰转换下划线
export function toLine(data: any) {
  for (const i of data) {
    const name = i.replace(/([A-Z])/g, '_$1').toLowerCase();
    if (i !== name) {
      data[name] = data[i];
      delete data[i];
    }
  }
  return data;
}
