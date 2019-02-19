const jwt = require('jsonwebtoken');
const fs = require('fs');

/**
 * RS256
 * 用 RS256 算法生成与验证 JWT
 * ssh-keygen -t rsa -b 2048 -f private.key
 * openssl rsa -in private.key -pubout -outform PEM -out public.key
 */

 //获取密钥
const privateKey = fs.readFileSync(__dirname+'/config/private.key');

//获取公钥
const publicKey = fs.readFileSync(__dirname+'/config/public.key');

//签发 token
export function signToken(data) {
  let created = Math.floor(Date.now() / 1000);
  return jwt.sign({
      data,
      iss: 'sandune.com',
      author: 'sandune',
      exp: created + 3600 * 24
  },privateKey,{ algorithm: 'RS256' })
}

//验证 token

export function verifyToken(token) {
  try{
      //验证 token
      let result = jwt.verify(token, publicKey, (error, decoded) => {
          if(error) {
              throw error.message
          }
          return decoded
      }) || {};
      let {exp = 0} = result, current = Math.floor(Date.now()/1000);
      if(current <= exp){
          var res = result.data || {};
      }
      return {status: 200,res: res}
  }
  catch(e){
      return {status: 400,err: e }//token错误
  }
  
}