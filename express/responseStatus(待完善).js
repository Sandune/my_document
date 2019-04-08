/**
 * 关于回调参数的定义（待完善）
 */

const Status = {
  success: 'success~',//查询成功
  error: 'error~', // 查询出错
  fail: 'fail~', //查询失败
  empty: 'empty~', // 查询为空
  loginError: 'login error~', //登录出错
}

const Response = (status, data) => {
    return JSON.stringify({
      status: status,
      data: data
    })
}

module.exports = {
  success: function(data){
    return Response(Status.success, data)
  },
  error: function(error){
    return Response(Status.error,error)
  },
  fail: function(fail){
    return Response(Status.fail,fail)
  },
  empty: function(){
    return Response(Status.empty,0)
  },
  loginError: function(error){
    return Response(Status.loginError,error)
  }
}