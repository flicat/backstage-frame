/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false;
}

/**
 * 获取路由名称, 根据url地址
 * @param {*} url
 */
export function getRouteNameByUrl(url) {
  let val = /.*\/(.*)\.html/.exec(url);
  return val && val.length >= 1 ? val[1] : '';
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  let res = [];
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i];
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = [];
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1;
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1;
      temp[data[k][pid]]['children'].push(data[k]);
    } else {
      res.push(data[k]);
    }
  }
  return res;
}

/**
 * 获取字符串字节长度
 * @param {*} s
 */
export function getStringLength(s) {
  return s.replace(/[\u4e00-\u9fa5\uff00-\uffff]/g, '**').length;
}

/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16);
  });
}

/**
 * target 目标对象
 * type 匹配类型
 * value 匹配的值
 */
export function getObject(target, type, value) {
  let result = '';
  target.map((item) => {
    if (item[type] === value) {
      result = item;
    }
  });
  return result;
}

/* 將日期对象转换成字符串
 * @param {Date, timestamp} date
 * @param {String} format
 */
export function getDateString(date, format = 'Y-M-D') {
  if (!date) {
    return '';
  }

  date = new Date(date);

  let padStr = function (str) {
    return String(str).padStart(2, '0');
  };

  if (date.toString() !== 'Invalid Date') {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return format.replace(/y+/ig, year)
    .replace(/m+/g, month)
    .replace(/d+/g, day)
    .replace(/M+/g, padStr(month))
    .replace(/D+/g, padStr(day))
    .replace(/h+/g, hours)
    .replace(/i+/g, minutes)
    .replace(/s+/g, seconds)
    .replace(/H+/g, padStr(hours))
    .replace(/I+/g, padStr(minutes))
    .replace(/S+/g, padStr(seconds));
  } else {
    return '';
  }
}

// 获取一个月的天数
export function getMonthDays(yy, mm) {
  yy = Number(yy);
  mm = Number(mm);
  let getCheckYear = function (yy) {
    return yy % 100 === 0 ? yy % 400 === 0 : yy % 4 === 0;
  };

  if (getCheckYear(yy) && mm === 2) {
    return 29;
  }

  if (!getCheckYear(yy) && mm === 2) {
    return 28;
  }

  if (mm === 4 || mm === 6 || mm === 9 || mm === 11) {
    return 30;
  }

  return 31;
}

/* 比较两个日期相差的月份 */
export function getMonthDiff(date1, date2) {
  let year1 = new Date(date1).getFullYear();
  let month1 = new Date(date1).getMonth();
  let day1 = new Date(date1).getDate();
  let year2 = new Date(date2).getFullYear();
  let month2 = new Date(date2).getMonth();
  let day2 = new Date(date2).getDate();

  let diff;
  if (year1 === year2) {
    diff = month2 - month1;
  } else {
    diff = (year2 - year1) * 12 + month2 - month1;
  }

  if (day2 >= day1) {
    diff++;
  }
  return diff;
}

/* 获取对象类型 */
export function getType(target) {
  let typeStr = Object.prototype.toString.call(target);
  return typeStr.match(/\[\w+ (\w+)\]/)[1].toLowerCase();
}

/**
 * 对象遍历方法
 * @param {Object} obj
 * @param {Function} callback
 */
export function forEachIn(obj, callback) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(key, obj[key]);
    }
  }
}
