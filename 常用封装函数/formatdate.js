module.exports = {
  formatTime(date) {
    if (typeof date === 'object') {
      date = date;
    } else {
      if (('' + date).length === 10) { date = parseInt(date, 10) * 1000; }
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
  
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  },
  
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  },
  
  parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
      date = time;
    } else {
      if (('' + time).length === 10) { time = parseInt(time, 10) * 1000; }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      const weekName =  ['日', '一', '二', '三', '四', '五', '六'];
      if (key === 'a') { return weekName[value]; }
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return timeStr;
  },
  
  formatTimeToText(time, option) {
    time = + time * 1000;
    const d = new Date(time);
    const now = Date.now();
  
    const diff = (now - d) / 1000;
  
    if (diff < 30) {
      return '刚刚';
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
      return '1天前';
    }
    if (option) {
      return parseTime(time, option);
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      );
    }
  },
  
  isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
  },

  parseTimeMs(format) {

    if (!format) {
      format = 'yyyy-MM-dd HH:mm:ss';
    }
    
    // 用0补齐指定位数
    let padNum = function (value, digits) {
      return Array(digits - value.toString().length + 1).join('0') + value;
    };
  
    // 指定格式字符
    let cfg = {
      yyyy: this.getFullYear(),             // 年
      MM: padNum(this.getMonth() + 1, 2),        // 月
      dd: padNum(this.getDate(), 2),           // 日
      HH: padNum(this.getHours(), 2),          // 时
      mm: padNum(this.getMinutes(), 2),         // 分
      ss: padNum(this.getSeconds(), 2),         // 秒
      fff: padNum(this.getMilliseconds(), 3),      // 毫秒
    };
  
    return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
      return cfg[m];
    });
  }
  
}
