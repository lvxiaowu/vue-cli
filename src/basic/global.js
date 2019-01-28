//  版本 ：v.1.2019.01.25
(function() {
  window.Global = {
    init: function(argument) {
      this.SetFont();
      return this;
    },
    SetFont(v) {
      var v = v || 750;
      var WH = this.WH();
      var f = (WH.w / 750) * 100;
      f = f < 50 ? f : 50;
      var htmlTag = document.getElementsByTagName('html')[0];
      htmlTag.style = `font-size:${f}px !important`;
      return this;
    },
    loadScript(url, callback) {
      var head =
          document.head ||
          document.getElementsByTagName('head')[0] ||
          document.documentElement,
        script,
        options;

      if (typeof url === 'object') {
        options = url;
        url = undefined;
      }
      var s = options || {};
      url = url || s.url;
      callback = callback || s.success;
      script = document.createElement('script');
      script.async = s.async || false;
      script.type = 'text/javascript';
      if (s.charset) {
        script.charset = s.charset;
      }
      if (s.cache === false) {
        url =
          url +
          (/\?/.test(url) ? ' & ' : ' ? ') +
          '_ = ' +
          new Date().getTime();
      }
      script.src = url;
      head.insertBefore(script, head.firstChild);
      if (callback) {
        document.addEventListener
          ? script.addEventListener('load', callback, false)
          : (script.onreadystatechange = function() {
              if (/loaded|complete/.test(script.readyState)) {
                script.onreadystatechange = null;
                callback();
              }
            });
      }
    },
    Origin: function(e) {
      return this.baseUrl + (e || '');
    },
    Url: function() {
      var s = '';
      for (var i = 0; i < arguments.length; i++) {
        s += '/' + arguments[i];
      }
      return this.baseUrl + s.replace(/\/+/g, '/');
    },
    Mall: function(e) {
      var s = '';
      for (var i = 0; i < arguments.length; i++) {
        s += '/' + arguments[i];
      }
      return this.baseUrl + ('/gjjmall/' + s).replace(/\/+/g, '/');
    },
    getUrlData: function(u) {
      //分解地址参数
      var url = u || window.location.href;
      url = url.split('?');
      if (url.length <= 1) {
        return {};
      }
      var search = url[1].split('#')[0];
      var params = {};
      if (!!search) {
        var tmp = search.split('&');
        for (var i = 0; i < tmp.length; i++) {
          var kv = tmp[i].split('=');
          if (kv.length == 2) {
            params[kv[0]] = decodeURIComponent(kv[1]);
          }
        }
      }
      return params;
    },
    jointUrl: function(p) {
      var str = '';
      for (let i in p) {
        str += '&' + i + '=' + p[i];
      }
      return str;
    },
    creatUrl: function(h, p) {
      var _h = h.split('#'),
        _hash = '';
      var d = Object.assign(this.getUrlData(h), p);
      if (_h.length >= 2) {
        _hash = '#' + _h[1];
        h = _h[0];
      }
      var u = h.split('?');
      return (u[0] + '?' + this.jointUrl(d) + _hash)
        .replace('?&', '?')
        .replace(/\?*$/g, '');
    },
    toSring: function(s) {
      return JSON.stringify(s);
    },
    WH: function() {
      var a = {};
      var O_body = document.getElementsByTagName('body')[0];
      var O_div = document.createElement('div');
      O_div.style =
        'position: absolute;width: 100%;top: 0;bottom: 0;left: 0;z-index: -1';
      O_body.append(O_div);
      a.h = O_div.offsetHeight;
      a.w = O_div.offsetWidth;
      O_body.removeChild(O_div);
      return a;
    },
    https: function(u) {
      if (u.indexOf('http') >= 0) {
        var h = 'https:' == document.location.protocol ? 'https://' : 'http://';
        return h + u.replace('http://', '').replace('https://', '');
      } else {
        return u;
      }
    },
    Cookie: function(a, b, t) {
      if (a && b) {
        var exp = new Date();
        exp.setTime(exp.getTime() + (t || 0) * 1000 * 60);
        document.cookie =
          a +
          '=' +
          escape(b) +
          (t == null ? '' : ';expires=' + exp.toGMTString()) +
          ';path=/';
      } else if (a) {
        var arr,
          reg = new RegExp('(^| )' + a + '=([^;]*)(;|$)');
        if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
        else return null;
      } else {
        return '';
      }
    },
    storage: {
      //本地数据存储
      val: function(s, v) {
        if (window.localStorage) {
          var local = window.localStorage;
          if (typeof v == 'undefined') {
            if (!local.getItem(s)) local.setItem(s, '');
            return local.getItem(s);
          } else {
            return local.setItem(s, v);
          }
        } else {
          return undefined;
        }
      },
      clear: function(s) {
        if (window.localStorage) {
          var local = window.localStorage;
          if (s) {
            window.localStorage.removeItem(s);
          } else {
            window.localStorage.clear();
          }
        }
      }
    },
    toArry: function(o) {
      if (o instanceof Array) {
        return o;
      } else if (o instanceof Object) {
        var _r = [];
        for (a in o) {
          _r.push(o[a]);
        }
        return _r;
      }
      return o;
    },
    timeDown: function(p, c) {
      function run() {
        var m = p.t || 0,
          move = true,
          setT;
        function td(t) {
          if (m <= 0) {
            c.call(0, m);
          } else if (move) {
            setT = window.setTimeout(function() {
              m--;
              c.call(this, m);
              td();
            }, 1000);
          }
        }
        this.stopT = function() {
          clearTimeout(setT);
          move = false;
        };
        td();
        c.call(this, m);
        return this;
      }
      return new run();
    },
    clipboard({ val, success, fail }) {
      const input = window.document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', val);
      input.value = val;
      window.document.body.appendChild(input);
      input.setSelectionRange(0, 9999);
      input.select();
      try {
        if (document.execCommand('copy', false, null)) {
          //success info
          console.log('success');
          success();
        } else {
          //fail info
          fail();
          console.log('fail');
        }
      } catch (err) {
        //fail info
        fail();
        console.log(err);
      }
    }
  };
  Global.init();
})();
