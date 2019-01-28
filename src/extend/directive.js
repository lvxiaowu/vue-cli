export default {
    directives: {
        title: {
            bind: function (a, b, c) {
                const title = b.value;
                document.title = title;
                if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
                    let iframe = document.createElement('iframe')
                    iframe.style.visibility = 'hidden';
                    iframe.setAttribute('src', 'about:blank')
                    let iframeCallback = function () {
                        setTimeout(function () {
                            iframe.removeEventListener('load', iframeCallback)
                            document.body.removeChild(iframe)
                        }, 0)
                    }
                    iframe.addEventListener('load', iframeCallback)
                    document.body.appendChild(iframe)
                }
            }
        },
        touch: {
            bind: function (el, b, v) {
                function _value() {
                    if (typeof (eval(b.value)) == "function") {
                        b.value(el);
                    } else if (b.value.fn) {
                        b.value.fn(el, b.value.arg)
                    }
                }
                var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
                var hasTouch = 'ontouchstart' in window && !isTouchPad;
                var hasTouch = navigator.userAgent.toLowerCase().match(/(iphone|ipod|android|ios)/i);
                var touchStart = hasTouch ? 'touchstart' : 'mousedown';
                var touchMove = hasTouch ? 'touchmove' : 'mousemove';
                var touchEnd = hasTouch ? 'touchend' : 'mouseup';
                var touchType = b.arg; //传入的模式 "swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"

                if (b.modifiers.custom) {
                    var timeOutEvent = 0;
                    var direction = '';
                    //滑动处理
                    var startTime, startPoint;
                    //返回角度
                    function gA(dx, dy) {
                        return Math.atan2(dy, dx) * 180 / Math.PI;
                    }
                    if (touchType == 'longtap') {
                        $(el).addClass('callout')
                    }
                    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
                    function getEvent(startPoint, point) {
                        var dy = startPoint.pageY - point.pageY,
                            dx = point.pageX - startPoint.pageX,
                            endTime = (new Date()).getTime();
                        var result = null;
                        //如果滑动距离太短
                        var angle = gA(dx, dy);
                        if (Math.abs(dx) < 3 && Math.abs(dy) < 3) {
                            if (endTime - startTime < 150) {
                                result = "tap";
                            }
                        } else if (angle >= -45 && angle < 45) {
                            result = 'swiperight';
                        } else if (angle >= 45 && angle < 135) {
                            result = 'swipeup';
                        } else if (angle >= -135 && angle < -45) {
                            result = 'swipedown';
                        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                            result = 'swipeleft';
                        }
                        return result;
                    }
                    el.addEventListener(touchStart, function (ev) {
                        clearTimeout(timeOutEvent)
                        timeOutEvent = 0;
                        startPoint = hasTouch ? ev.touches[0] : ev;
                        startTime = (new Date).getTime();
                        //判断长按
                        timeOutEvent = setTimeout(function () {
                            timeOutEvent = 0;
                            if (touchType === 'longtap') {
                                _value()
                            }
                        }, 600);
                        if (b.modifiers.prevent) ev.preventDefault();
                        if (b.modifiers.stop) ev.stopPropagation()

                    }, false);

                    el.addEventListener(touchMove, function (ev) {
                        clearTimeout(timeOutEvent)
                        timeOutEvent = 0;
                        if (b.modifiers.prevent) ev.preventDefault();
                        if (b.modifiers.stop) ev.stopPropagation()
                    }, false);
                    el.addEventListener(touchEnd, function (ev) {
                        var point = hasTouch ? ev.changedTouches[0] : ev;
                        if (startPoint && point) {

                            direction = getEvent(startPoint, point);
                            clearTimeout(timeOutEvent)
                            if (direction == touchType) _value();
                        }

                        if (b.modifiers.prevent) ev.preventDefault();
                        if (b.modifiers.stop) ev.stopPropagation();

                    }, false);
                } else {
                    switch (touchType) {
                        case "longtap":
                            touchType = "longTap";
                            break;
                        case "swipeleft":
                            touchType = "swipeLeft";
                            break;
                        case "swiperight":
                            touchType = "swipeRight";
                            break;
                        case "swipeup":
                            touchType = "swipeUp";
                            break;
                        case "swipedown":
                            touchType = "swipeDown";
                            break;
                        case "singletap":
                            touchType = "singleTap";
                            break;
                    }
                    $(el).on(touchType, function (event) {
                        _value();
                        event.preventDefault();
                        /* Act on the event */
                    }).on('touchend', function (event) {
                        // console.log("key touch end")
                        // event.preventDefault();
                        /* Act on the event */
                    });
                }
            }
        },
        select: {
            bind: function (el, b, v) {
                var vm = v.context,
                    _name = $(el).attr("set") || "";
                if (_name) vm.$set(vm["select"], _name, '');
            },
            update: function (el, b, v) {
                var _obj = $(el);
                var vm = v.context,
                    _name = _obj.attr("set") || "";
                if (_name) {
                    var _option = _obj.find('option');
                    var _text = _option.not(function () {
                        return !this.selected
                    }).text() || "";
                    if (_obj.val()) {
                        vm["select"][_name] = _text;
                    } else {
                        vm["select"][_name] = "";
                    }
                }

            }
        },
    },
}
