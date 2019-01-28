var reg = {
  required: function(v) {
    // return /^\S+$/.test(v)
    return /^[\w\W]+$/.test(v);
  },
  bool: function(v) {
    return v == "true";
  },
  UserName: function(v) {
    return /^[0-9a-zA-Z_-]*$/.test(v)
  },
  tel: function(v) {
    return /^1[1-9]\d{9}$/.test(v)
  },
  RealName: function(v) {
    return /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$|^\s*[A-Za-z][A-Za-z\s*]*[A-Za-z]\s*$/.test(v)
  },
  email: function(v) {
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(v)
  },
  number: function(v) {
    return /^[0-9]*$/.test(v)
  },
  reg: function(v, r) {
    // 正则，加一个修饰符。
    if (Object.prototype.toString.call(r) == "[object Array]") {
      if (r.length == 1) {
        r = String(r[0]);
        return (new RegExp(r)).test(v);
      } else if (r.length == 2) {
        var regStr = String(r[0]);
        var modifierStr = String(r[1]);
        return (new RegExp(regStr, modifierStr)).test(v);
      }
    } else {
      return (new RegExp(r)).test(v);
    }
  },
  Card: function(B) {
    B = B.replace("x", "X");
    var d = true,
      c = B;
    if (!B || !/^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/.test(B)) {
      d = false;
    } else if (B.length == 15 || B.length == 18) {
      if (B.length == 18) {
        B = B.split("");
        var t = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var z = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
        var x = 0;
        var u = 0;
        var C = 0;
        for (var y = 0; y < 17; y++) {
          u = B[y];
          C = t[y];
          x += u * C
        }
        var i = z[x % 11];
        if (z[x % 11] != B[17]) {
          d = false
        }
      }
    } else {
      d = false;
    }
    return d
  },
  // 银行卡号验证16-19位
  bankCard: function(v) {
    return /^\d{16,19}$/g.test(v);
  },
  limit: function(v, r) {
    var _l = r.split("-");
    var n = _l[0],
      m = _l[1] || 999;
    return v >= Number(n) && v <= Number(m)
  },
  range: function(v, r) {
    return eval('/^\\S' + r + '$/').test(v);
  },
  // 输入额度是否是r的整数倍
  integer: function(v, r) {
    if (!r) {
      return false;
    }
    var r = Number(r);
    return (v % r === 0);
  }
}

function checkValue(r, v) {
  var ret = [];
  for (var i = 0; i < r.length; i++) {
    var _r = r[i],
      _t = _r['t'],
      _c = false;
    if (_t) {
      _c = _t(v, _r['b']);
    }
    if (!_c) ret.push(r[i])
  }
  return ret;
}
export
default {
  data: function() {
    return {
      validator: {},
      vaRequire: {},
      vaGroup: {}
    }
  },
  methods: {
    checkVa: function(a, c) {
      var vm = this,
        _v = "validator";
      if (vm[_v] && vm["vaGroup"]) {
        var _g = vm["vaGroup"];
        if (a && _g[a]) _g = _g[a];

        var list = _g._list;
        if (list)
          for (var i = 0; i < list.length; i++) {
            var _a = list[i];
            if (vm[_v][_a] && vm[_v][_a]['va'].length) {
              let _va = vm[_v][_a]['va'][0],
                m = _va['m'];
              if (c) c(m, vm[_v][_a]['va'])
              else {
                try {
                  vm.TipMsg = m
                } catch (e) {}
              }
              return false;
            }
          }
        return true;
      } else {
        return true;
      }
    },
    requiredVa: function(a) {
      var vm = this,
        _v = "validator";
      if (vm[_v] && vm["vaGroup"]) {
        var _g = vm["vaGroup"];
        if (a && _g[a]) _g = _g[a];
        var list = _g._list;
        for (let i = 0; i < list.length; i++) {
          var _a = list[i];
          if (vm[_v][_a]) {
            if (!vm[_v][_a]["re"]) return false;
          }
        }
        return true;
      } else {
        return true;
      }
    }
  },
  watch: {
    'validator': {
      handler: function(val, oldVal) {
        var vm = this;
        for (let v in vm.vaRequire) {
          vm.vaRequire[v] = vm.requiredVa(v);
        }
      },
      deep: true
    }
  },
  directives: {
    'va': {
      bind: function(el, binding, vnode) {
        let vm = vnode.context,
          name = binding.arg ? binding.arg : el.getAttribute('name'),_va = "validator",option=binding.value;
        if (option) {
          option = JSON.parse(JSON.stringify(option));
          let group = {
            "group": true
          }
          if (option.modifiers) group = Object.assign(group, option.modifiers);
          else Object.assign(group, binding.modifiers);
          vm.$set(vm[_va], name, {
            re: false,
            va: false,
            tips: "",
            _reg: null
          });
          var item = vm[_va][name];
          // 分组
          var msg = option.msg || ("请输入" + name);
          var _group = {};

          for (let a in group) {
            vm["vaGroup"][a] || vm.$set(vm["vaGroup"], a, {
              _list: []
            });
            vm["vaGroup"][a]['_list'].push(name);
            vm.$set(vm["vaRequire"], a, false);
          }
          let _option = [];
          if (option['conf']) {
            var _c = option['conf'];
            for (let i = 0; i < _c.length; i++) {
              if (reg[_c[i]]) {
                _option.push({
                  a: _c[i],
                  b: null,
                  m: msg,
                  t: reg[_c[i]]
                });
              }

            }
          }
          delete option['conf'];
          for (let a in option) {
            if (reg[a]) {
              var _b, _m;
              if (option[a] && option[a] instanceof Array) {
                _b = (option[a].length > 1 ? option[a][0] : null);
                _m = (option[a].length > 1 ? option[a][1] : option[a][0]);
              } else {
                _b = null;
                _m = msg;
              }
              _option.push({
                a: a,
                b: _b,
                m: _m,
                t: reg[a]
              });
            }
          }
          item.tips = msg;
          item._reg = _option;
          item["va"] = checkValue(item["_reg"], el.value.replace(/(^\s+)|(\s+$)/g, ""));
          if (vm[_va][name]) {
            var _v = el.value.replace(/(^\s+)|(\s+$)/g, ""),
              item = vm[_va][name];
            item['re'] = !!_v;
            item['va'] = checkValue(item["_reg"], _v);
          }

        } else {
          // console.log(name + "配置错误")
        }
      },
      update: function(el, binding, vnode, oldVnode) {
        var _va = "validator";
        if (vnode.data.domProps.value != oldVnode.data.domProps.value) {
          var vm = vnode.context,
            name = binding.arg ? binding.arg : el.getAttribute('name');
          if (vm[_va][name]) {
            var _v = el.value.replace(/(^\s+)|(\s+$)/g, ""),
              item = vm[_va][name];
            item['re'] = !!_v;
            item['va'] = checkValue(item["_reg"], _v);
          }
        }
      }
    }
  }
};
