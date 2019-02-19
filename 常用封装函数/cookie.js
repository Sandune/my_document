/**
 * 使用 cookie
 */
export default {
  setCookie(name, value, days) //两个参数，一个是cookie的名子，一个是值
  {
      var Days = days; //此 cookie 将被保存 30 天
      var exp = new Date(); //new Date("December 31, 9998");
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + decodeURIComponent(value) + ";expires= " + exp.toGMTString() + ";path=/";
  },


  getCookie(name) //取cookies函数        
  {
      var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      if (arr !== null) return decodeURIComponent(arr[2]);
      return null;

  },

  delCookie(name) //删除cookie
  {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      document.cookie = name + "=" + this.getCookie(name) + ";expires=" + exp.toGMTString() + ";path=/";
  }
};