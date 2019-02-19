// html 转码
export function htmlEncode(s) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(s.replace(/'/g, "''")));
  return div.innerHTML;
}

export function htmlDecode(s) {
  var div = document.createElement('div');
  div.innerHTML = s;
  return div.innerText || div.textContent;
}