export default {
  filters: {
    origin(val) {
      if (!val) {
        return '';
      }
      return val.replace(/^http(s)?/, 'https');
    },
    starPhone(val) {
      if (!val) {
        return '';
      }
      return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    omit: function(v, r) {
      if (v) {
        var _reg = new RegExp(r),
          _r = _reg.exec(v);
        try {
          return _r[1] + _r[2].replace(/[\w\W]/g, '*') + _r[3];
        } catch (e) {
          return v;
        }
      } else {
        return '';
      }
    },
    dateFormat: function(date, fmt) {
      var timeObj = null;

      function _intactNum(str) {
        return ('00' + str).substr(str.length);
      }
      if (!date) {
        return '';
      }
      if (!fmt) {
        return _date.toLocaleDateString();
      }
      date = date.toString();
      var _date = new Date(date.replace(/\-/g, '/'));
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (_date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      }
      timeObj = {
        'M+': _date.getMonth() + 1,
        'd+': _date.getDate(),
        'h+': _date.getHours(),
        'm+': _date.getMinutes(),
        's+': _date.getSeconds()
      };
      for (var k in timeObj) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          var str = timeObj[k] + '';
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : _intactNum(str)
          );
        }
      }
      return fmt;
    },
    timeFormat: function(date, fmt) {
      if (arguments.length != 2)
        // 参数个数校验
        throw Error('arguments长度不合法');
      if (!date || typeof date != 'object')
        // 参数合法性校验
        throw Error(arguments[0] + ':类型不为Date类型');
      if (/H+/.test(fmt) && /h+/.test(fmt))
        throw Error('小时格式错误，同类型只能连续出现一次！');
      /* 模板参数校验，正则验证方法 */
      var verify = function(Rex) {
        var arr = new RegExp(Rex).exec(fmt); // 获得匹配结果数组
        if (!arr)
          // 匹配失败返回
          return '';
        if (fmt.split(Rex).length > 2)
          // 同一类型间隔出现多次
          throw Error('fmt格式错误：同类型只能连续出现一次！');
        return arr[0];
      };
      /**
       * 提供月、天、时、分、秒通用匹配替换
       * @param {对象o属性key} r
       * @param {r对应正则对象} rex
       **/
      var common = function(r, rex) {
        if (len != 1 && len != 2) throw Error('月份格式错误:M只能出现1/2次');
        len == 2
          ? (fmt = fmt.replace(rex, o[r].length == 1 ? '0' + o[r] : o[r]))
          : (fmt = fmt.replace(rex, o[r]));
      };
      var o = {
        // 数据存储对象
        'y+': date.getFullYear() + '', // 年
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'M+': date.getMonth() + 1 + '', // 月
        'd+': date.getDate() + '', // 日
        'H+': date.getHours() + '', // 24时
        'h+': date.getHours() + '', // 12时
        'm+': date.getMinutes() + '', // 分
        's+': date.getSeconds() + '', // 秒
        'S+': date.getMilliseconds() // 毫秒
      };
      for (var r in o) {
        var rex, len, temp;
        rex = new RegExp(r);
        temp = verify(rex); // 匹配所得字符串
        len = temp.length; // 长度
        if (!len || len == 0) continue;
        if (r == 'y+') {
          if (len != 2 && len != 4) throw Error('年份格式错误:y只能出现2/4次');
          len == 2
            ? (fmt = fmt.replace(rex, o[r].substr(2, 3)))
            : (fmt = fmt.replace(rex, o[r]));
        } else if (r == 'q+') {
          if (len != 1) throw Error('季度格式错误:q只能出现1次');
          fmt = fmt.replace(rex, o[r]);
        } else if (r == 'h+') {
          if (len != 1 && len != 2) throw Error('小时格式错误:h只能出现1/2次');
          var h = (o[r] > 12 ? o[r] - 12 : o[r]) + '';
          len == 2
            ? (fmt = fmt.replace(rex, h.length == 1 ? '0' + h : h))
            : (fmt = fmt.replace(rex, h));
        } else if (r == 'S+') {
          if (len != 1) throw Error('毫秒数格式错误:S只能出现1次');
          fmt = fmt.replace(rex, o[r]);
        } else {
          // (r=="M+" || r=="d+" || r=="H+" || r=="m+" || r=="s+")
          common(r, rex);
        }
      }
      return fmt;
    },
    moneyFormat: function(money, s) {
      if (money == 0) {
        return money + '0.00';
      } else if (!money) {
        return '';
      } else {
        var n = 2;
        money =
          parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
        var l = money
            .split('.')[0]
            .split('')
            .reverse(),
          r = money.split('.')[1],
          t = '';
        for (let i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        if (!s) {
          return (
            t
              .split('')
              .reverse()
              .join('') +
            '.' +
            r
          ).replace('.00', '');
        }
        return (
          t
            .split('')
            .reverse()
            .join('') +
          '.' +
          r
        );
      }
    }
  }
};
