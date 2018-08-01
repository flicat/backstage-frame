// import { SSL_OP_LEGACY_SERVER_CONNECT } from 'constants'

/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))[0-9]{8,8}$/.test(s);
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * 数值范围
 * @param {Number} min
 * @param {Number} max
 */
export function range (min, max) {
  return function (rule, value, callback) {
    if (value > max) {
      callback(new Error(`不能大于${max}`));
    } else if (value < min) {
      callback(new Error(`不能小于${min}`));
    } else {
      callback();
    }
  };
}

const max = (rule, value, callback) => {
  if (value > 100) {
    return callback(new Error('不能大于100'));
  } else if (value < 0) {
    return callback(new Error('不能小于0'));
  }
};

// 姓名, 中文，英文，中英文，2-25个字符
export function checkName (rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入姓名'));
  } else if (value.length >= 2 && value.length <= 25) {
    if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
      return callback();
    } else {
      return callback(new Error('请输入中文，英文，或者中英混合的名字'));
    }
  } else {
    return callback(new Error('长度在 2 到 25 个字符'));
  }
}

// 除了10,11,12开头的手机号
export function checkPhone (rule, value, callback) {
  if (/^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))[0-9]{8,8}$/.test(value)) {
    return callback();
  } else {
    return callback(new Error('请输入11位合法手机号'));
  }
}
// 身份证
export function checkIdcard (rule, value, callback) {
  let city = {11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'};
  if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
    return callback(new Error('请输入合法的身份证号'));
  } else if (!city[value.substr(0, 2)]) {
    return callback(new Error('请输入合法的身份证号'));
  } else {
      // 18位身份证需要验证最后一位校验位
    if (value.length === 18) {
      value = value.split('');
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
      // 校验位
      let parity = [ '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2' ];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i++) {
        ai = value[i];
        wi = factor[i];
        sum += ai * wi;
      }
      if (parity[sum % 11] !== value[17]) {
        return callback(new Error('请输入合法的身份证号'));
      }
    }
  }
  return callback();
}
// 护照, 共8位或者7位，第一个字母为英文大写字母，之后是数字
export function checkPassport (rule, value, callback) {
  let pat1, pat2;
  pat1 = /^[A-Z]\d{6}$/;
  pat2 = /^[A-Z]\d{7}$/;
  if (value.length === 7 || value.length === 8) {
    if (pat1.test(value) || pat2.test(value)) {
      return callback();
    } else {
      return callback(new Error('请输入合法的护照号,注意大小写'));
    }
  } else {
    return callback(new Error('请输入合法的护照号,注意大小写'));
  }
}
// 回乡证, 共11位，第1位为字母（H或者M），之后为数字
export function checkPermitTomainland (rule, value, callback) {
  let pat = /^[MH]\d{10}$/;
  if (value.length === 11) {
    if (pat.test(value)) {
      return callback();
    } else {
      return callback(new Error('请输入合法的回乡证，注意大小写'));
    }
  } else {
    return callback(new Error('请输入合法的回乡证，注意大小写'));
  }
}
// 港澳通行证, 共9位，第一位为大写字母C，之后为数字
export function checkPermitToHK (rule, value, callback) {
  let pat;
  pat = /^[C]\d{8}$/;
  if (value.length === 9) {
    if (pat.test(value)) {
      return callback();
    } else {
      return callback(new Error('请输入合法的港澳通行证，注意大小写'));
    }
  } else {
    return callback(new Error('请输入合法的港澳通行证，注意大小写'));
  }
}

export function checkCerNo (cerType) {
  cerType = cerType | 0;
  return function checkCerNo (rule, value, callback) {
    switch (cerType) {
      case '': {
        callback(new Error('请输入证件号'));
        break;
      }
      case 1: {
        checkIdcard(rule, value, callback);
        break;
      }
      case 2: {
        checkPassport(rule, value, callback);
        break;
      }
      case 3: {
        checkPermitTomainland(rule, value, callback);
        break;
      }
      case 4: {
        checkPermitToHK(rule, value, callback);
        break;
      }
    }
  };
}

export default { max };
