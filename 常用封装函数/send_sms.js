/**
 * 阿里云短信验证码服务
 */
const SMSClient = require('@alicloud/sms-sdk');
const parseTime = require('./formatdate')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'youKeyId'
const secretAccessKey = 'youKeyId'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

//生产6位随机数
const messagecheck = () => {
  var range=function(start,end)
        {
            var array=[];
            for(var i=start;i<end;++i) array.push(i);
            return array;
        };
        var randomstr = range(0,6).map(function(x){
        return Math.floor(Math.random()*10);
                  }).join('');
  return randomstr
}

module.exports = {
  //发送短信
  sendRegisterCode: (phone) =>{
    return new Promise( (resolve, reject) => {

        smsClient.sendSMS({
            PhoneNumbers: phone,//必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为：国际区号+号码，如“85200000000”
            SignName: 'xxx',//必填:短信签名-可在短信控制台中找到
            TemplateCode: 'code',//必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
            TemplateParam: '{"code":'+ messagecheck() +'}'//可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
        }).then(function (res) {
            let {Code}=res
            if (Code === 'OK') {
                //处理返回参数
                // {
                //   Message: 'OK',
                //   RequestId: 'C283F13B-DF09-4021-8DD0-9C266FBB87EC',
                //   BizId: '662318451424950724^0',
                //   Code: 'OK'
                // }
                console.log(res)
              resolve(res)
            }else{
              reject(false)
            }
        }, function (err) {
            console.log(err)
            reject(false)
        })
    })
  },
  verifyCode: (phone,CodeNum,BizId) => {
    return new Promise((resolve, reject) => {
      var nowDate = new Date();
  
      var data = {
        PhoneNumber: phone,
        SendDate: parseTime.parseTime(nowDate, '{y}{mm}{dd}'),
        PageSize: '10',
        CurrentPage: "1"
      }
  
      if(BizId){
        data.BizId = BizId;
      }
      //查询短信发送详情
      smsClient.queryDetail(data).then((res) => {
        let { Code, SmsSendDetailDTOs, TotalCount } = res
        if (Code === 'OK') {
            //处理发送详情内容
            var infoData = SmsSendDetailDTOs.SmsSendDetailDTO[0];
            
            if(!CodeNum){//没有携带code则只判断是否超时
              if(TotalCount >= 5){
                //第五条数据相差不到 10分钟，请求频繁，过段时间再试
                var fiveDate = new Date(SmsSendDetailDTOs.SmsSendDetailDTO[4].ReceiveDate)
                if((nowDate - fiveDate) < 15){
                  reject ({status: false, msg: '操作频繁，请过会儿再试！'})
                }else{
                  resolve({status:true})
                }
              }
            }else{//携带code则验证code
              //判断时间差距
              if((nowDate - new Date(infoData.ReceiveDate))/1000/60 < 10){
                
                if(CodeNum && infoData.Content.replace(/[^0-9]+/g, '') === CodeNum){
                  resolve({status:true})
                }else{
                  reject ({status: false, msg: '验证码错误！'})
                }
              }else{
                reject ({status: false, msg: '验证码已过期！'})
              }
            }
        }else{
          reject({status: false, msg: '短信查询错误！'})
        }
      }, function (err) {
        //处理错误
        reject(err)
      })
    }).catch(e => {
      
      if(e){
        return e
      }
    })
  }
}
