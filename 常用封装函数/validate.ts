export function isValidUsername(str: string) {
  const validMap = ['admin', 'editor'];
  return validMap.indexOf(str.trim()) >= 0;
}

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function validateLowerCase(str: string) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

export function validateUpperCase(str: string) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

export function validatAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

export function isPhone(str: string){
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(str)
}

export function isZHName(str: string){
  return /^[\u4e00-\u9fa5]{2,4}$/.test(str)
}

export function isUserCard(str: string){
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str) 
}

