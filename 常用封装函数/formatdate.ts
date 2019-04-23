/***
 * 时间处理函数
 */
export function formatTime(date: any) {
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
}

export function formatNumber(n: any) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

export function parseTime(time: any, cFormat?: string) {
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
  const formatObj: any = {
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
}

export function formatTimeToText(time: Date | number, option: any) {
  time = + time * 1000;
  const d: any = new Date(time);
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
}

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function jsGetAge(strBirthday) {
  const strBirthdayArr = strBirthday.split('-');
  const birthYear = strBirthdayArr[0];
  const birthMonth = strBirthdayArr[1];
  const birthDay = strBirthdayArr[2];

  const d = new Date();
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1;
  const nowDay = d.getDate();

  if (nowYear === birthYear) {// 同年计算月份
    const monthDiff = nowMonth - birthMonth; // 月之差
    if (monthDiff > 0) {
      return {
        age: 0,
        month: monthDiff,
      };
    } else {
      return {
        age: 0,
        month: 0,
      };
    }
  } else {
    const ageDiff = nowYear - birthYear ; // 年之差
    if (ageDiff > 0) {
      const monthDiff = nowMonth - birthMonth;
      if (monthDiff > 0) {
        return {
          age: ageDiff,
          month: monthDiff,
        };
      } else {
        return {
          age: ageDiff - 1,
          month: monthDiff + 12,
        };
      }

    } else {
      return Error('错误');
    }
  }

}