/*!
 * Mobiscroll v2.14.4
 * //mobiscroll.com
 *
 * Copyright 2010-2014, Acid Media
 * Licensed under the MIT license.
 *
 */

(function($, undefined) {

    function testProps(props) {
        var i;
        for (i in props) {
            if (mod[props[i]] !== undefined) {
                return true;
            }
        }
        return false;
    }

    function testPrefix() {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            p;

        for (p in prefixes) {
            if (testProps([prefixes[p] + 'Transform'])) {
                return '-' + prefixes[p].toLowerCase() + '-';
            }
        }
        return '';
    }

    function init(that, options, args) {
        var ret = that;

        // Init
        if (typeof options === 'object') {
            return that.each(function() {
                if (!this.id) {
                    this.id = 'mobiscroll' + (++id);
                }
                if (instances[this.id]) {
                    instances[this.id].destroy();
                }
                new $.mobiscroll.classes[options.component || 'Scroller'](this, options);
            });
        }

        // Method call
        if (typeof options === 'string') {
            that.each(function() {
                var r,
                    inst = instances[this.id];

                if (inst && inst[options]) {
                    r = inst[options].apply(this, Array.prototype.slice.call(args, 1));
                    if (r !== undefined) {
                        ret = r;
                        return false;
                    }
                }
            });
        }

        return ret;
    }

    var id = +new Date(),
        instances = {},
        extend = $.extend,
        mod = document.createElement('modernizr').style,
        has3d = testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']),
        hasFlex = testProps(['flex', 'msFlex', 'WebkitBoxDirection']),
        prefix = testPrefix(),
        pr = prefix.replace(/^\-/, '').replace(/\-$/, '').replace('moz', 'Moz');

    $.fn.mobiscroll = function(method) {
        extend(this, $.mobiscroll.components);
        return init(this, method, arguments);
    };

    $.mobiscroll = $.mobiscroll || {
        version: '2.14.4',
        util: {
            prefix: prefix,
            jsPrefix: pr,
            has3d: has3d,
            hasFlex: hasFlex,
            testTouch: function(e, elm) {
                if (e.type == 'touchstart') {
                    $(elm).attr('data-touch', '1');
                } else if ($(elm).attr('data-touch')) {
                    $(elm).removeAttr('data-touch');
                    return false;
                }
                return true;
            },
            objectToArray: function(obj) {
                var arr = [],
                    i;

                for (i in obj) {
                    arr.push(obj[i]);
                }

                return arr;
            },
            arrayToObject: function(arr) {
                var obj = {},
                    i;

                if (arr) {
                    for (i = 0; i < arr.length; i++) {
                        obj[arr[i]] = arr[i];
                    }
                }

                return obj;
            },
            isNumeric: function(a) {
                return a - parseFloat(a) >= 0;
            },
            isString: function(s) {
                return typeof s === 'string';
            },
            getCoord: function(e, c) {
                var ev = e.originalEvent || e;
                return ev.changedTouches ? ev.changedTouches[0]['page' + c] : e['page' + c];
            },
            getPosition: function(t, vertical) {
                var style = window.getComputedStyle ? getComputedStyle(t[0]) : t[0].style,
                    matrix,
                    px;

                if (has3d) {
                    $.each(['t', 'webkitT', 'MozT', 'OT', 'msT'], function(i, v) {
                        if (style[v + 'ransform'] !== undefined) {
                            matrix = style[v + 'ransform'];
                            return false;
                        }
                    });
                    matrix = matrix.split(')')[0].split(', ');
                    px = vertical ? (matrix[13] || matrix[5]) : (matrix[12] || matrix[4]);
                } else {
                    px = vertical ? style.top.replace('px', '') : style.left.replace('px', '');
                }

                return px;
            },
            constrain: function(val, min, max) {
                return Math.max(min, Math.min(val, max));
            }
        },
        tapped: false,
        presets: {
            scroller: {},
            numpad: {}
        },
        themes: {
            listview: {},
            menustrip: {}
        },
        i18n: {},
        instances: instances,
        classes: {},
        components: {},
        defaults: {
            theme: 'mobiscroll',
            context: 'body'
        },
        userdef: {},
        setDefaults: function(o) {
            extend(this.userdef, o);
        },
        presetShort: function(name, c, p) {
            this.components[name] = function(s) {
                return init(this, extend(s, {
                    component: c,
                    preset: p === false ? undefined : name
                }), arguments);
            };
        }
    };

})($);
(function($, window, document, undefined) {

    var $activeElm,
        preventShow,
        extend = $.extend,
        ms = $.mobiscroll,
        instances = ms.instances,
        userdef = ms.userdef,
        util = ms.util,
        pr = util.jsPrefix,
        has3d = util.has3d,
        getCoord = util.getCoord,
        constrain = util.constrain,
        isString = util.isString,
        isOldAndroid = /android [1-3]/i.test(navigator.userAgent),
        animEnd = 'webkitAnimationEnd animationend',
        empty = function() {},
        prevdef = function(ev) {
            ev.preventDefault();
        };

    ms.classes.Widget = function(el, settings, inherit) {
        var $ariaDiv,
            $ctx,
            $header,
            $markup,
            $overlay,
            $persp,
            $popup,
            $wnd,
            $wrapper,
            buttons,
            btn,
            doAnim,
            hasButtons,
            isModal,
            lang,
            modalWidth,
            modalHeight,
            posEvents,
            preset,
            preventPos,
            s,
            scrollLock,
            setReadOnly,
            theme,
            wasReadOnly,
            wndWidth,
            wndHeight,

            that = this,
            $elm = $(el),
            elmList = [],
            posDebounce = {};

        function onBtnStart(ev) {
            // Can't call preventDefault here, it kills page scroll
            if (btn) {
                btn.removeClass('dwb-a');
            }
            btn = $(this);
            // Active button
            if (!btn.hasClass('dwb-d') && !btn.hasClass('dwb-nhl')) {
                btn.addClass('dwb-a');
            }
            if (ev.type === 'mousedown') {
                $(document).on('mouseup', onBtnEnd);
            }
        }

        function onBtnEnd(ev) {
            if (btn) {
                btn.removeClass('dwb-a');
                btn = null;
            }
            if (ev.type === 'mouseup') {
                $(document).off('mouseup', onBtnEnd);
            }
        }

        function onWndKeyDown(ev) {
            if (ev.keyCode == 13) {
                that.select();
            } else if (ev.keyCode == 27) {
                that.cancel();
            }
        }

        function onShow(prevFocus) {
            if (!prevFocus) {
                $popup.focus();
            }
            that.ariaMessage(s.ariaMessage);
        }

        function onHide(prevAnim) {
            var activeEl,
                value,
                type,
                focus = s.focusOnClose;
            $markup.remove();

            if ($activeElm && !prevAnim) {
                setTimeout(function() {
                    if (focus === undefined || focus === true) {
                        preventShow = true;
                        activeEl = $activeElm[0];
                        type = activeEl.type;
                        value = activeEl.value;
                        try {
                            activeEl.type = 'button';
                        } catch (ex) {}
                        $activeElm.focus();
                        activeEl.type = type;
                        activeEl.value = value;
                    } else if (focus) {
                        // If a mobiscroll field is focused, allow show
                        if (instances[$(focus).attr('id')]) {
                            ms.tapped = false;
                        }
                        $(focus).focus();
                    }
                }, 200);
            }

            that._isVisible = false;

            event('onHide', []);
        }

        function onPosition(ev) {
            clearTimeout(posDebounce[ev.type]);
            posDebounce[ev.type] = setTimeout(function() {
                var isScroll = ev.type == 'scroll';
                if (isScroll && !scrollLock) {
                    return;
                }
                that.position(!isScroll);
            }, 200);
        }

        function show(beforeShow) {
            if (!ms.tapped) {

                if (beforeShow) {
                    beforeShow();
                }

                // Hide virtual keyboard
                if ($(document.activeElement).is('input,textarea')) {
                    $(document.activeElement).blur();
                }

                $activeElm = $elm;
                that.show();
            }

            setTimeout(function() {
                preventShow = false;
            }, 300); // With $ < 1.9 focus is fired twice in IE
        }

        function event(name, args) {
            var ret;
            args.push(that);
            $.each([userdef, theme, preset, settings], function(i, v) {
                if (v && v[name]) { // Call preset event
                    ret = v[name].apply(el, args);
                }
            });
            return ret;
        }

        /**
         * Positions the scroller on the screen.
         */
        that.position = function(check) {
            var w,
                l,
                t,
                anchor,
                aw, // anchor width
                ah, // anchor height
                ap, // anchor position
                at, // anchor top
                al, // anchor left
                arr, // arrow
                arrw, // arrow width
                arrl, // arrow left
                dh,
                scroll,
                sl, // scroll left
                st, // scroll top
                totalw = 0,
                minw = 0,
                css = {},
                nw = Math.min($wnd[0].innerWidth || $wnd.innerWidth(), $persp.width()), //$persp.width(), // To get the width without scrollbar
                nh = $wnd[0].innerHeight || $wnd.innerHeight();

            if ((wndWidth === nw && wndHeight === nh && check) || preventPos) {
                return;
            }

            if (that._isFullScreen || /top|bottom/.test(s.display)) {
                // Set width, if document is larger than viewport, needs to be set before onPosition (for calendar)
                $popup.width(nw);
            }

            if (event('onPosition', [$markup, nw, nh]) === false || !isModal) {
                return;
            }

            sl = $wnd.scrollLeft();
            st = $wnd.scrollTop();
            anchor = s.anchor === undefined ? $elm : $(s.anchor);

            // Set / unset liquid layout based on screen width, but only if not set explicitly by the user
            if (that._isLiquid && s.layout !== 'liquid') {
                if (nw < 400) {
                    $markup.addClass('dw-liq');
                } else {
                    $markup.removeClass('dw-liq');
                }
            }

            if (!that._isFullScreen && /modal|bubble/.test(s.display)) {
                $wrapper.width('');
                $('.mbsc-w-p', $markup).each(function() {
                    w = $(this).width(true);
                    totalw += w;
                    minw = (w > minw) ? w : minw;
                });
                w = totalw > nw ? minw : totalw;
                $wrapper.width(w).css('white-space', totalw > nw ? '' : 'nowrap');
            }

            modalWidth = that._isFullScreen ? nw : $popup.width();
            modalHeight = that._isFullScreen ? nh : $popup.height(true);
            scrollLock = modalHeight <= nh && modalWidth <= nw;

            that.scrollLock = scrollLock;

            if (s.display == 'modal') {
                l = Math.max(0, sl + (nw - modalWidth) / 2);
                t = st + (nh - modalHeight) / 2;
            } else if (s.display == 'bubble') {
                scroll = true;
                arr = $('.dw-arrw-i', $markup);
                ap = anchor.offset();
                at = Math.abs($ctx.offset().top - ap.top);
                al = Math.abs($ctx.offset().left - ap.left);

                // horizontal positioning
                aw = anchor.width();
                ah = anchor.height();
                l = constrain(al - ($popup.width(true) - aw) / 2, sl + 3, sl + nw - modalWidth - 3);

                // vertical positioning
                t = at - modalHeight; // above the input
                if ((t < st) || (at > st + nh)) { // if doesn't fit above or the input is out of the screen
                    $popup.removeClass('dw-bubble-top').addClass('dw-bubble-bottom');
                    t = at + ah; // below the input
                } else {
                    $popup.removeClass('dw-bubble-bottom').addClass('dw-bubble-top');
                }

                // Calculate Arrow position
                arrw = arr.width();
                arrl = constrain(al + aw / 2 - (l + (modalWidth - arrw) / 2), 0, arrw);

                // Limit Arrow position
                $('.dw-arr', $markup).css({
                    left: arrl
                });
            } else {
                l = sl;
                if (s.display == 'top') {
                    t = st;
                } else if (s.display == 'bottom') {
                    t = st + nh - modalHeight;
                }
            }

            t = t < 0 ? 0 : t;

            css.top = t;
            css.left = l;
            $popup.css(css);

            // If top + modal height > doc height, increase doc height
            $persp.height(0);
            dh = Math.max(t + modalHeight, s.context == 'body' ? $(document).height() : $ctx[0].scrollHeight);
            $persp.css({
                height: dh
            });

            // Scroll needed
            if (scroll && ((t + modalHeight > st + nh) || (at > st + nh))) {
                preventPos = true;
                setTimeout(function() {
                    preventPos = false;
                }, 300);
                $wnd.scrollTop(Math.min(t + modalHeight - nh, dh - nh));
            }

            wndWidth = nw;
            wndHeight = nh;
        };

        /**
         * Show mobiscroll on focus and click event of the parameter.
         * @param {$} $elm - Events will be attached to this element.
         * @param {Function} [beforeShow=undefined] - Optional function to execute before showing mobiscroll.
         */
        that.attachShow = function($elm, beforeShow) {
            elmList.push($elm);
            if (s.display !== 'inline') {
                if (setReadOnly) {
                    $elm.on('mousedown.dw', function(ev) {
                        // Prevent input to get focus on tap (virtual keyboard pops up on some devices)
                        ev.preventDefault();
                    });
                }

                if (s.showOnFocus) {
                    $elm.on('focus.dw', function() {
                        if (!preventShow) {
                            show(beforeShow);
                        }
                    });
                }

                if (s.showOnTap) {
                    that.tap($elm, function() {
                        show(beforeShow);
                    });
                }
            }
        };

        /**
         * Set button handler.
         */
        that.select = function() {
            if (!isModal || that.hide(false, 'set') !== false) {
                that._fillValue();
                event('onSelect', [that._value]);
            }
        };

        /**
         * Cancel and hide the scroller instance.
         */
        that.cancel = function() {
            if (!isModal || that.hide(false, 'cancel') !== false) {
                event('onCancel', [that._value]);
            }
        };

        /**
         * Clear button handler.
         */
        that.clear = function() {
            event('onClear', [$markup]);
            if (isModal && !that.live) {
                that.hide(false, 'clear');
            }
            that.setValue(null, true);
        };

        /**
         * Enables the scroller and the associated input.
         */
        that.enable = function() {
            
            s.disabled = false;
            if (that._isInput) {
                $elm.prop('disabled', false);
            }
        };

        /**
         * Disables the scroller and the associated input.
         */
        that.disable = function() {
            s.disabled = true;
            if (that._isInput) {
                $elm.prop('disabled', true);
            }
        };

        /**
         * Shows the scroller instance.
         * @param {Boolean} prevAnim - Prevent animation if true
         * @param {Boolean} prevFocus - Prevent focusing if true
         */
        that.show = function(prevAnim, prevFocus) {
            // Create wheels
            var html;

            if (s.disabled || that._isVisible) {
                return;
            }

            if (doAnim !== false) {
                if (s.display == 'top') {
                    doAnim = 'slidedown';
                }
                if (s.display == 'bottom') {
                    doAnim = 'slideup';
                }
            }

            // Parse value from input
            that._readValue();

            event('onBeforeShow', []);

            // Create wheels containers
            html = '<div lang="' + s.lang + '" class="mbsc-' + s.theme + (s.baseTheme ? ' mbsc-' + s.baseTheme : '') + ' dw-' + s.display + ' ' +
                (s.cssClass || '') +
                (that._isLiquid ? ' dw-liq' : '') +
                (isOldAndroid ? ' mbsc-old' : '') +
                (hasButtons ? '' : ' dw-nobtn') + '">' +
                '<div class="dw-persp">' +
                (isModal ? '<div class="dwo"></div>' : '') + // Overlay
            '<div' + (isModal ? ' role="dialog" tabindex="-1"' : '') + ' class="dw' + (s.rtl ? ' dw-rtl' : ' dw-ltr') + '">' + // Popup
            (s.display === 'bubble' ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : '') + // Bubble arrow
            '<div class="dwwr">' + // Popup content
            '<div aria-live="assertive" class="dw-aria dw-hidden"></div>' +
                (s.headerText ? '<div class="dwv">' + (isString(s.headerText) ? s.headerText : '') + '</div>' : '') + // Header
            '<div class="dwcc">'; // Wheel group container

            html += that._generateContent();

            html += '</div>';

            if (hasButtons) {
                html += '<div class="dwbc">';
                $.each(buttons, function(i, b) {
                    b = isString(b) ? that.buttons[b] : b;

                    if (b.handler === 'set') {
                        b.parentClass = 'dwb-s';
                    }

                    if (b.handler === 'cancel') {
                        b.parentClass = 'dwb-c';
                    }

                    b.handler = isString(b.handler) ? that.handlers[b.handler] : b.handler;

                    html += '<div' + (s.btnWidth ? ' style="width:' + (100 / buttons.length) + '%"' : '') + ' class="dwbw ' + (b.parentClass || '') + '"><div tabindex="0" role="button" class="dwb' + i + ' dwb-e ' + (b.cssClass === undefined ? s.btnClass : b.cssClass) + (b.icon ? ' mbsc-ic mbsc-ic-' + b.icon : '') + '">' + (b.text || '') + '</div></div>';
                });
                html += '</div>';
            }
            html += '</div></div></div></div>';

            $markup = $(html);
            $persp = $('.dw-persp', $markup);
            $overlay = $('.dwo', $markup);
            $wrapper = $('.dwwr', $markup);
            $header = $('.dwv', $markup);
            $popup = $('.dw', $markup);
            $ariaDiv = $('.dw-aria', $markup);

            that._markup = $markup;
            that._header = $header;
            that._isVisible = true;

            posEvents = 'orientationchange resize';

            that._markupReady();

            event('onMarkupReady', [$markup]);

            // Show
            if (isModal) {

                // Enter / ESC
                $(window).on('keydown', onWndKeyDown);

                // Prevent scroll if not specified otherwise
                if (s.scrollLock) {
                    $markup.on('touchmove mousewheel DOMMouseScroll', function(ev) {
                        if (scrollLock) {
                            ev.preventDefault();
                        }
                    });
                }

                // Disable inputs to prevent bleed through (Android bug)
                if (pr !== 'Moz') {
                    $('input,select,button', $ctx).each(function() {
                        if (!this.disabled) {
                            $(this).addClass('dwtd').prop('disabled', true);
                        }
                    });
                }

                posEvents += ' scroll';

                ms.activeInstance = that;

                $markup.appendTo($ctx);

                if (has3d && doAnim && !prevAnim) {
                    $markup.addClass('dw-in dw-trans').on(animEnd, function() {
                        $markup.off(animEnd).removeClass('dw-in dw-trans').find('.dw').removeClass('dw-' + doAnim);
                        onShow(prevFocus);
                    }).find('.dw').addClass('dw-' + doAnim);
                }
            } else if ($elm.is('div')) {
                $elm.html($markup);
            } else {
                $markup.insertAfter($elm);
            }

            event('onMarkupInserted', [$markup]);

            // Set position
            that.position();

            $wnd.on(posEvents, onPosition);

            // Events
            $markup
                .on('selectstart mousedown', prevdef) // Prevents blue highlight on Android and text selection in IE
            .on('click', '.dwb-e', prevdef)
                .on('keydown', '.dwb-e', function(ev) {
                    if (ev.keyCode == 32) { // Space
                        ev.preventDefault();
                        ev.stopPropagation();
                        $(this).click();
                    }
                });

            setTimeout(function() {
                // Init buttons
                $.each(buttons, function(i, b) {
                    that.tap($('.dwb' + i, $markup), function(ev) {
                        b = isString(b) ? that.buttons[b] : b;
                        b.handler.call(this, ev, that);
                    }, true);
                });

                if (s.closeOnOverlay) {
                    that.tap($overlay, function() {
                        that.cancel();
                    });
                }

                if (isModal && !doAnim) {
                    onShow(prevFocus);
                }

                $markup
                    .on('touchstart mousedown', '.dwb-e', onBtnStart)
                    .on('touchend', '.dwb-e', onBtnEnd);

                that._attachEvents($markup);

            }, 300);

            event('onShow', [$markup, that._tempValue]);
        };

        /**
         * Hides the scroller instance.
         */
        that.hide = function(prevAnim, btn, force) {

            // If onClose handler returns false, prevent hide
            if (!that._isVisible || (!force && !that._isValid && btn == 'set') || (!force && event('onClose', [that._tempValue, btn]) === false)) {
                return false;
            }

            // Hide wheels and overlay
            if ($markup) {

                // Re-enable temporary disabled fields
                if (pr !== 'Moz') {
                    $('.dwtd', $ctx).each(function() {
                        $(this).prop('disabled', false).removeClass('dwtd');
                    });
                }

                if (has3d && isModal && doAnim && !prevAnim && !$markup.hasClass('dw-trans')) { // If dw-trans class was not removed, means that there was no animation
                    $markup.addClass('dw-out dw-trans').find('.dw').addClass('dw-' + doAnim).on(animEnd, function() {
                        onHide(prevAnim);
                    });
                } else {
                    onHide(prevAnim);
                }

                // Stop positioning on window resize
                $wnd.off(posEvents, onPosition);
            }

            if (isModal) {
                $(window).off('keydown', onWndKeyDown);
                delete ms.activeInstance;
            }
        };

        that.ariaMessage = function(txt) {
            $ariaDiv.html('');
            setTimeout(function() {
                $ariaDiv.html(txt);
            }, 100);
        };

        /**
         * Return true if the scroller is currently visible.
         */
        that.isVisible = function() {
            return that._isVisible;
        };

        // Protected functions to override

        that.setValue = empty;

        that._generateContent = empty;

        that._attachEvents = empty;

        that._readValue = empty;

        that._fillValue = empty;

        that._markupReady = empty;

        that._processSettings = empty;

        // Generic widget functions

        /**
         * Attach tap event to the given element.
         */
        that.tap = function(el, handler, prevent) {
            var startX,
                startY,
                moved;

            if (s.tap) {
                el.on('touchstart.dw', function(ev) {
                    // Can't always call preventDefault here, it kills page scroll
                    if (prevent) {
                        ev.preventDefault();
                    }
                    startX = getCoord(ev, 'X');
                    startY = getCoord(ev, 'Y');
                    moved = false;
                }).on('touchmove.dw', function(ev) {
                    // If movement is more than 20px, don't fire the click event handler
                    if (Math.abs(getCoord(ev, 'X') - startX) > 20 || Math.abs(getCoord(ev, 'Y') - startY) > 20) {
                        moved = true;
                    }
                }).on('touchend.dw', function(ev) {
                    var that = this;

                    if (!moved) {
                        // preventDefault and setTimeout are needed by iOS
                        ev.preventDefault();
                        //setTimeout(function () {
                        handler.call(that, ev);
                        //}, isOldAndroid ? 400 : 10);
                    }
                    // Prevent click events to happen
                    ms.tapped = true;
                    setTimeout(function() {
                        ms.tapped = false;
                    }, 500);
                });
            }

            el.on('click.dw', function(ev) {
                if (!ms.tapped) {
                    // If handler was not called on touchend, call it on click;
                    handler.call(this, ev);
                }
                ev.preventDefault();
            });

        };

        /**
         * Sets one ore more options.
         */
        that.option = function(opt, value) {
            var obj = {};
            if (typeof opt === 'object') {
                obj = opt;
            } else {
                obj[opt] = value;
            }
            that.init(obj);
        };

        /**
         * Destroys the mobiscroll instance.
         */
        that.destroy = function() {
            // Force hide without animation
            that.hide(true, false, true);

            // Remove all events from elements
            $.each(elmList, function(i, v) {
                v.off('.dw');
            });

            // Reset original readonly state
            if (that._isInput && setReadOnly) {
                el.readOnly = wasReadOnly;
            }

            event('onDestroy', []);

            // Delete scroller instance
            delete instances[el.id];

            that = null;
        };

        /**
         * Returns the mobiscroll instance.
         */
        that.getInst = function() {
            return that;
        };

        /**
         * Triggers a mobiscroll event.
         */
        that.trigger = event;

        /**
         * Scroller initialization.
         */
        that.init = function(ss) {
            that.settings = s = {};

            // Update original user settings
            extend(settings, ss);
            extend(s, ms.defaults, that._defaults, userdef, settings);

            // Get theme defaults
            theme = ms.themes[s.theme] || ms.themes.mobiscroll;

            // Get language defaults
            lang = ms.i18n[s.lang];

            event('onThemeLoad', [lang, settings]);

            extend(s, theme, lang, userdef, settings);

            preset = ms.presets[that._class][s.preset];

            // Add default buttons
            s.buttons = s.buttons || (s.display !== 'inline' ? ['set', 'cancel'] : []);

            // Hide header text in inline mode by default
            s.headerText = s.headerText === undefined ? (s.display !== 'inline' ? '{value}' : false) : s.headerText;

            if (preset) {
                preset = preset.call(el, that);
                extend(s, preset, settings); // Load preset settings
            }

            if (!ms.themes[s.theme]) {
                s.theme = 'mobiscroll';
            }

            that._isLiquid = (s.layout || (/top|bottom/.test(s.display) ? 'liquid' : '')) === 'liquid';

            that._processSettings();

            // Unbind all events (if re-init)
            $elm.off('.dw');

            doAnim = isOldAndroid ? false : s.animate;
            buttons = s.buttons;
            isModal = s.display !== 'inline';
            setReadOnly = s.showOnFocus || s.showOnTap;
            $wnd = $(s.context == 'body' ? window : s.context);
            $ctx = $(s.context);

            that.context = $wnd;

            that.live = true;

            // If no set button is found, live mode is activated
            $.each(buttons, function(i, b) {
                if (b === 'set' || b.handler === 'set') {
                    that.live = false;
                    return false;
                }
            });

            that.buttons.set = {
                text: s.setText,
                handler: 'set'
            };
            that.buttons.cancel = {
                text: (that.live) ? s.closeText : s.cancelText,
                handler: 'cancel'
            };
            that.buttons.clear = {
                text: s.clearText,
                handler: 'clear'
            };

            that._isInput = $elm.is('input');

            hasButtons = buttons.length > 0;

            if (that._isVisible) {
                that.hide(true, false, true);
            }

            if (isModal) {
                that._readValue();
                if (that._isInput && setReadOnly) {
                    // Set element readonly, save original state
                    if (wasReadOnly === undefined) {
                        wasReadOnly = el.readOnly;
                    }
                    el.readOnly = true;
                }
                that.attachShow($elm);
            } else {
                that.show();
            }

            //if (that._isInput) {
            $elm.on('change.dw', function() {
                if (!that._preventChange) {
                    that.setVal($elm.val(), true, false);
                }
                that._preventChange = false;
            });
            //}

            event('onInit', []);
        };

        that.buttons = {};
        that.handlers = {
            set: that.select,
            cancel: that.cancel,
            clear: that.clear
        };

        that._value = null;

        that._isValid = true;
        that._isVisible = false;

        // Constructor
        if (!inherit) {
            instances[el.id] = that;
            that.init(settings);
        }
    };

    ms.classes.Widget.prototype._defaults = {
        // Localization
        lang: 'en',
        setText: 'Set',
        selectedText: 'Selected',
        closeText: 'Close',
        cancelText: 'Cancel',
        clearText: 'Clear',
        // Options
        disabled: false,
        closeOnOverlay: true,
        showOnFocus: true,
        showOnTap: true,
        display: 'modal',
        scrollLock: true,
        tap: true,
        btnClass: 'dwb',
        btnWidth: true,
        focusOnClose: false // Temporary for iOS8
    };

    ms.themes.mobiscroll = {
        rows: 5,
        showLabel: false,
        headerText: false,
        btnWidth: false,
        selectedLineHeight: true,
        selectedLineBorder: 1,
        dateOrder: 'MMddyy',
        weekDays: 'min',
        checkIcon: 'ion-ios7-checkmark-empty',
        btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down5',
        btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up5',
        btnCalPrevClass: 'mbsc-ic mbsc-ic-arrow-left5',
        btnCalNextClass: 'mbsc-ic mbsc-ic-arrow-right5'
    };

    // Prevent re-show on window focus
    $(window).on('focus', function() {
        if ($activeElm) {
            preventShow = true;
        }
    });

    // Prevent standard behaviour on body click
    $(document).on('mouseover mouseup mousedown click', function(ev) {
        if (ms.tapped) {
            ev.stopPropagation();
            ev.preventDefault();
            return false;
        }
    });

})($, window, document);
(function($, window, document, undefined) {

    var move,
        ms = $.mobiscroll,
        classes = ms.classes,
        instances = ms.instances,
        util = ms.util,
        pr = util.jsPrefix,
        has3d = util.has3d,
        hasFlex = util.hasFlex,
        getCoord = util.getCoord,
        constrain = util.constrain,
        testTouch = util.testTouch;

    classes.Scroller = function(el, settings, inherit) {
        var $markup,
            btn,
            isScrollable,
            itemHeight,
            s,
            trigger,

            click,
            moved,
            start,
            startTime,
            stop,
            p,
            min,
            max,
            target,
            index,
            lines,
            timer,
            that = this,
            $elm = $(el),
            iv = {},
            pos = {},
            pixels = {},
            wheels = [];

        // Event handlers

        function onStart(ev) {
            // Scroll start
            if (testTouch(ev, this) && !move && !click && !btn && !isReadOnly(this)) {
                // Prevent touch highlight
                ev.preventDefault();
                // Better performance if there are tap events on document
                ev.stopPropagation();

                move = true;
                isScrollable = s.mode != 'clickpick';
                target = $('.dw-ul', this);
                setGlobals(target);
                moved = iv[index] !== undefined; // Don't allow tap, if still moving
                p = moved ? getCurrentPosition(target) : pos[index];
                start = getCoord(ev, 'Y');
                startTime = new Date();
                stop = start;
                scroll(target, index, p, 0.001);

                if (isScrollable) {
                    target.closest('.dwwl').addClass('dwa');
                }

                if (ev.type === 'mousedown') {
                    $(document).on('mousemove', onMove).on('mouseup', onEnd);
                }
            }
        }

        function onMove(ev) {
            if (move) {
                if (isScrollable) {
                    // Prevent scroll
                    ev.preventDefault();
                    ev.stopPropagation();
                    stop = getCoord(ev, 'Y');
                    if (Math.abs(stop - start) > 3 || moved) {
                        scroll(target, index, constrain(p + (start - stop) / itemHeight, min - 1, max + 1));
                        moved = true;
                    }
                }
            }
        }

        function onEnd(ev) {
            if (move) {
                var time = new Date() - startTime,
                    val = constrain(p + (start - stop) / itemHeight, min - 1, max + 1),
                    speed,
                    dist,
                    tindex,
                    ttop = target.offset().top;

                // Better performance if there are tap events on document
                ev.stopPropagation();

                if (has3d && time < 300) {
                    speed = (stop - start) / time;
                    dist = (speed * speed) / s.speedUnit;
                    if (stop - start < 0) {
                        dist = -dist;
                    }
                } else {
                    dist = stop - start;
                }

                tindex = Math.round(p - dist / itemHeight);

                if (!moved) { // this is a "tap"
                    var idx = Math.floor((stop - ttop) / itemHeight),
                        li = $($('.dw-li', target)[idx]),
                        valid = li.hasClass('dw-v'),
                        hl = isScrollable;

                    if (trigger('onValueTap', [li]) !== false && valid) {
                        tindex = idx;
                    } else {
                        hl = true;
                    }

                    if (hl && valid) {
                        li.addClass('dw-hl'); // Highlight
                        setTimeout(function() {
                            li.removeClass('dw-hl');
                        }, 100);
                    }
                }

                if (isScrollable) {
                    calc(target, tindex, 0, true, Math.round(val));
                }

                if (ev.type === 'mouseup') {
                    $(document).off('mousemove', onMove).off('mouseup', onEnd);
                }

                move = false;
            }
        }

        function onBtnStart(ev) {
            btn = $(this);
            // +/- buttons
            if (testTouch(ev, this)) {
                step(ev, btn.closest('.dwwl'), btn.hasClass('dwwbp') ? plus : minus);
            }
            if (ev.type === 'mousedown') {
                $(document).on('mouseup', onBtnEnd);
            }
        }

        function onBtnEnd(ev) {
            btn = null;
            if (click) {
                clearInterval(timer);
                click = false;
            }
            if (ev.type === 'mouseup') {
                $(document).off('mouseup', onBtnEnd);
            }
        }

        function onKeyDown(ev) {
            if (ev.keyCode == 38) { // up
                step(ev, $(this), minus);
            } else if (ev.keyCode == 40) { // down
                step(ev, $(this), plus);
            }
        }

        function onKeyUp() {
            if (click) {
                clearInterval(timer);
                click = false;
            }
        }

        function onScroll(ev) {
            if (!isReadOnly(this)) {
                ev.preventDefault();
                ev = ev.originalEvent || ev;
                var delta = ev.wheelDelta ? (ev.wheelDelta / 120) : (ev.detail ? (-ev.detail / 3) : 0),
                    t = $('.dw-ul', this);

                setGlobals(t);
                calc(t, Math.round(pos[index] - delta), delta < 0 ? 1 : 2);
            }
        }

        // Private functions

        function step(ev, w, func) {
            ev.stopPropagation();
            ev.preventDefault();
            if (!click && !isReadOnly(w) && !w.hasClass('dwa')) {
                click = true;
                // + Button
                var t = w.find('.dw-ul');

                setGlobals(t);
                clearInterval(timer);
                timer = setInterval(function() {
                    func(t);
                }, s.delay);
                func(t);
            }
        }

        function isReadOnly(wh) {
            if ($.isArray(s.readonly)) {
                var i = $('.dwwl', $markup).index(wh);
                return s.readonly[i];
            }
            return s.readonly;
        }

        function generateWheelItems(i) {
            var html = '<div class="dw-bf">',
                w = wheels[i],
                l = 1,
                labels = w.labels || [],
                values = w.values,
                keys = w.keys || values;
            $.each(values, function(j, v) {
                if (l % 20 === 0) {
                    html += '</div><div class="dw-bf">';
                }

                html += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + keys[j] + '"' + (labels[j] ? ' aria-label="' + labels[j] + '"' : '') + ' style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;">' +
                    '<div class="dw-i"' + (lines > 1 ? ' style="line-height:' + Math.round(itemHeight / lines) + 'px;font-size:' + Math.round(itemHeight / lines * 0.8) + 'px;"' : '') + '>' + v + '</div></div>';
                l++;
            });

            html += '</div>';
            return html;
        }

        function setGlobals(t) {
            var multiple = t.closest('.dwwl').hasClass('dwwms');
            min = $('.dw-li', t).index($(multiple ? '.dw-li' : '.dw-v', t).eq(0));
            max = Math.max(min, $('.dw-li', t).index($(multiple ? '.dw-li' : '.dw-v', t).eq(-1)) - (multiple ? s.rows - 1 : 0));
            index = $('.dw-ul', $markup).index(t);
        }

        function formatHeader(v) {
            var t = s.headerText;
            return t ? (typeof t === 'function' ? t.call(el, v) : t.replace(/\{value\}/i, v)) : '';
        }

        function getCurrentPosition(t) {
            return Math.round(-util.getPosition(t, true) / itemHeight);
        }

        function ready(t, i) {
            clearTimeout(iv[i]);
            delete iv[i];
            t.closest('.dwwl').removeClass('dwa');
        }

        function scroll(t, index, val, time, active) {
            var px = -val * itemHeight,
                style = t[0].style;

            if (px == pixels[index] && iv[index]) {
                return;
            }

            //if (time && px != pixels[index]) {
            // Trigger animation start event
            //trigger('onAnimStart', [$markup, index, time]);
            //}

            pixels[index] = px;

            if (has3d) {
                style[pr + 'Transition'] = util.prefix + 'transform ' + (time ? time.toFixed(3) : 0) + 's ease-out';
                style[pr + 'Transform'] = 'translate3d(0,' + px + 'px,0)';
            } else {
                style.top = px + 'px';
            }

            if (iv[index]) {
                ready(t, index);
            }

            if (time && active) {
                t.closest('.dwwl').addClass('dwa');
                iv[index] = setTimeout(function() {
                    ready(t, index);
                }, time * 1000);
            }

            pos[index] = val;
        }

        function getValid(val, t, dir, multiple) {
            var cell = $('.dw-li[data-val="' + val + '"]', t),
                cells = $('.dw-li', t),
                v = cells.index(cell),
                l = cells.length;

            if (multiple) {
                setGlobals(t);
            } else if (!cell.hasClass('dw-v')) { // Scroll to a valid cell
                var cell1 = cell,
                    cell2 = cell,
                    dist1 = 0,
                    dist2 = 0;

                while (v - dist1 >= 0 && !cell1.hasClass('dw-v')) {
                    dist1++;
                    cell1 = cells.eq(v - dist1);
                }

                while (v + dist2 < l && !cell2.hasClass('dw-v')) {
                    dist2++;
                    cell2 = cells.eq(v + dist2);
                }

                // If we have direction (+/- or mouse wheel), the distance does not count
                if (((dist2 < dist1 && dist2 && dir !== 2) || !dist1 || (v - dist1 < 0) || dir == 1) && cell2.hasClass('dw-v')) {
                    cell = cell2;
                    v = v + dist2;
                } else {
                    cell = cell1;
                    v = v - dist1;
                }
            }

            return {
                cell: cell,
                v: multiple ? constrain(v, min, max) : v,
                val: cell.hasClass('dw-v') ? cell.attr('data-val') : null
            };
        }

        function scrollToPos(time, index, manual, dir, active) {
            // Call validation event
            if (trigger('validate', [$markup, index, time, dir]) !== false) {
                // Set scrollers to position
                $('.dw-ul', $markup).each(function(i) {
                    var t = $(this),
                        multiple = t.closest('.dwwl').hasClass('dwwms'),
                        sc = i == index || index === undefined,
                        res = getValid(that._tempWheelArray[i], t, dir, multiple),
                        cell = res.cell;

                    if (!(cell.hasClass('dw-sel')) || sc) {
                        // Set valid value
                        that._tempWheelArray[i] = res.val;

                        if (!multiple) {
                            $('.dw-sel', t).removeAttr('aria-selected');
                            cell.attr('aria-selected', 'true');
                        }

                        // Add selected class to cell
                        $('.dw-sel', t).removeClass('dw-sel');
                        cell.addClass('dw-sel');

                        // Scroll to position
                        scroll(t, i, res.v, sc ? time : 0.1, sc ? active : false);
                    }
                });

                trigger('onValidated', []);

                // Reformat value if validation changed something
                that._tempValue = s.formatResult(that._tempWheelArray);

                if (that.live) {
                    that._hasValue = manual || that._hasValue;
                    setValue(manual, manual, 0, true);
                }

                that._header.html(formatHeader(that._tempValue));

                if (manual) {
                    trigger('onChange', [that._tempValue]);
                }
            }

        }

        function calc(t, val, dir, anim, orig) {
            val = constrain(val, min, max);

            var cell = $('.dw-li', t).eq(val),
                o = orig === undefined ? val : orig,
                active = orig !== undefined,
                idx = index,
                dist = Math.abs(val - o),
                time = anim ? (val == o ? 0.1 : dist * s.timeUnit * Math.max(0.5, (100 - dist) / 100)) : 0;

            // Set selected scroller value
            that._tempWheelArray[idx] = cell.attr('data-val');

            scroll(t, idx, val, time, active);

            setTimeout(function() {
                // Validate
                scrollToPos(time, idx, true, dir, active);
            }, 10);
        }

        function plus(t) {
            var val = pos[index] + 1;
            calc(t, val > max ? min : val, 1, true);
        }

        function minus(t) {
            var val = pos[index] - 1;
            calc(t, val < min ? max : val, 2, true);
        }

        function setValue(fill, change, time, noscroll, temp) {
            if (that._isVisible && !noscroll) {
                scrollToPos(time);
            }

            that._tempValue = s.formatResult(that._tempWheelArray);

            if (!temp) {
                that._wheelArray = that._tempWheelArray.slice(0);
                that._value = that._hasValue ? that._tempValue : null;
            }

            if (fill) {

                trigger('onValueFill', [that._hasValue ? that._tempValue : '', change]);

                if (that._isInput) {
                    $elm.val(that._hasValue ? that._tempValue : '');
                }

                if (change) {
                    that._preventChange = true;
                    $elm.change();
                }
            }
        }

        // Call the parent constructor
        classes.Widget.call(this, el, settings, true);

        // Public functions

        /**
         * Gets the selected wheel values, formats it, and set the value of the scroller instance.
         * If input parameter is true, populates the associated input element.
         * @param {Array} values Wheel values.
         * @param {Boolean} [fill=false] Also set the value of the associated input element.
         * @param {Number} [time=0] Animation time
         * @param {Boolean} [temp=false] If true, then only set the temporary value.(only scroll there but not set the value)
         * @param {Boolean} [change=false] Trigger change on the input element
         */
        that.setVal = that._setVal = function(val, fill, change, temp, time) {
            that._hasValue = val !== null && val !== undefined;
            that._tempWheelArray = $.isArray(val) ? val.slice(0) : s.parseValue.call(el, val, that) || [];
            setValue(fill, change === undefined ? fill : change, time, false, temp);
        };

        /**
         * Returns the selected value
         */
        that.getVal = that._getVal = function(temp) {
            var val = that._hasValue ? that[temp ? '_tempValue' : '_value'] : null;
            return util.isNumeric(val) ? +val : val;
        };

        /*
         * Sets the wheel values (passed as an array)
         */
        that.setArrayVal = that.setVal;

        /*
         * Returns the selected wheel values as an array
         */
        that.getArrayVal = function(temp) {
            return temp ? that._tempWheelArray : that._wheelArray;
        };

        // @deprecated since 2.14.0, backward compatibility code
        // ---

        that.setValue = function(val, fill, time, temp, change) {
            that.setVal(val, fill, change, temp, time);
        };

        /**
         * Return the selected wheel values.
         */
        that.getValue = that.getArrayVal;

        // ---

        /**
         * Changes the values of a wheel, and scrolls to the correct position
         * @param {Array} idx Indexes of the wheels to change.
         * @param {Number} [time=0] Animation time when scrolling to the selected value on the new wheel.
         * @param {Boolean} [manual=false] Indicates that the change was triggered by the user or from code.
         */
        that.changeWheel = function(idx, time, manual) {
            if ($markup) {
                var i = 0,
                    nr = idx.length;

                $.each(s.wheels, function(j, wg) {
                    $.each(wg, function(k, w) {
                        if ($.inArray(i, idx) > -1) {
                            wheels[i] = w;
                            $('.dw-ul', $markup).eq(i).html(generateWheelItems(i));
                            nr--;
                            if (!nr) {
                                that.position();
                                scrollToPos(time, undefined, manual);
                                return false;
                            }
                        }
                        i++;
                    });
                    if (!nr) {
                        return false;
                    }
                });
            }
        };

        /**
         * Returns the closest valid cell.
         */
        that.getValidCell = getValid;

        // Protected overrides

        that._generateContent = function() {
            var lbl,
                html = '',
                l = 0;

            $.each(s.wheels, function(i, wg) { // Wheel groups
                html += '<div class="mbsc-w-p dwc' + (s.mode != 'scroller' ? ' dwpm' : ' dwsc') + (s.showLabel ? '' : ' dwhl') + '">' +
                    '<div class="dwwc"' + (s.maxWidth ? '' : ' style="max-width:600px;"') + '>' +
                    (hasFlex ? '' : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>');

                $.each(wg, function(j, w) { // Wheels
                    wheels[l] = w;
                    lbl = w.label !== undefined ? w.label : j;
                    html += '<' + (hasFlex ? 'div' : 'td') + ' class="dwfl"' + ' style="' +
                        (s.fixedWidth ? ('width:' + (s.fixedWidth[l] || s.fixedWidth) + 'px;') :
                        (s.minWidth ? ('min-width:' + (s.minWidth[l] || s.minWidth) + 'px;') : 'min-width:' + s.width + 'px;') +
                        (s.maxWidth ? ('max-width:' + (s.maxWidth[l] || s.maxWidth) + 'px;') : '')) + '">' +
                        '<div class="dwwl dwwl' + l + (w.multiple ? ' dwwms' : '') + '">' +
                        (s.mode != 'scroller' ?
                        '<div class="dwb-e dwwb dwwbp ' + (s.btnPlusClass || '') + '" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>+</span></div>' + // + button
                        '<div class="dwb-e dwwb dwwbm ' + (s.btnMinusClass || '') + '" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>&ndash;</span></div>' : '') + // - button
                    '<div class="dwl">' + lbl + '</div>' + // Wheel label
                    '<div tabindex="0" aria-live="off" aria-label="' + lbl + '" role="listbox" class="dwww">' +
                        '<div class="dww" style="height:' + (s.rows * itemHeight) + 'px;">' +
                        '<div class="dw-ul" style="margin-top:' + (w.multiple ? 0 : s.rows / 2 * itemHeight - itemHeight / 2) + 'px;">';
                    // Create wheel values
                    html += generateWheelItems(l) +
                        '</div></div><div class="dwwo"></div></div><div class="dwwol"' +
                        (s.selectedLineHeight ? ' style="height:' + itemHeight + 'px;margin-top:-' + (itemHeight / 2 + (s.selectedLineBorder || 0)) + 'px;"' : '') + '></div></div>' +
                        (hasFlex ? '</div>' : '</td>');

                    l++;
                });

                html += (hasFlex ? '' : '</tr></table>') + '</div></div>';
            });

            return html;
        };

        that._attachEvents = function($markup) {
            $markup
                .on('DOMMouseScroll mousewheel', '.dwwl', onScroll)
                .on('keydown', '.dwwl', onKeyDown)
                .on('keyup', '.dwwl', onKeyUp)
                .on('touchstart mousedown', '.dwwl', onStart)
                .on('touchmove', '.dwwl', onMove)
                .on('touchend', '.dwwl', onEnd)
                .on('touchstart mousedown', '.dwwb', onBtnStart)
                .on('touchend', '.dwwb', onBtnEnd);
        };

        that._markupReady = function() {
            $markup = that._markup;
            scrollToPos();
        };

        that._fillValue = function() {
            that._hasValue = true;
            setValue(true, true, 0, true);
        };

        that._readValue = function() {
            var v = $elm.val() || '';
            that._hasValue = v !== '';
            that._tempWheelArray = that._wheelArray ? that._wheelArray.slice(0) : s.parseValue(v, that) || [];
            setValue();
        };

        that._processSettings = function() {
            s = that.settings;
            trigger = that.trigger;
            itemHeight = s.height;
            lines = s.multiline;

            that._isLiquid = (s.layout || (/top|bottom/.test(s.display) && s.wheels.length == 1 ? 'liquid' : '')) === 'liquid';

            //that._wheelArray = null;
            //that._tempWheelArray = null;

            if (lines > 1) {
                s.cssClass = (s.cssClass || '') + ' dw-ml';
            }
        };

        // Properties

        that._selectedValues = {};

        // Constructor
        if (!inherit) {
            instances[el.id] = that;
            that.init(settings);
        }
    };

    // Extend defaults
    classes.Scroller.prototype._class = 'scroller';
    classes.Scroller.prototype._defaults = $.extend({}, classes.Widget.prototype._defaults, {
        // Options
        minWidth: 80,
        height: 40,
        rows: 3,
        multiline: 1,
        delay: 300,
        readonly: false,
        showLabel: true,
        wheels: [],
        mode: 'scroller',
        preset: '',
        speedUnit: 0.0012,
        timeUnit: 0.08,
        formatResult: function(d) {
            return d.join(' ');
        },
        parseValue: function(value, inst) {
            var val = [],
                ret = [],
                i = 0,
                keys;

            if (value !== null && value !== undefined) {
                val = (value + '').split(' ');
            }

            $.each(inst.settings.wheels, function(j, wg) {
                $.each(wg, function(k, w) {
                    keys = w.keys || w.values;
                    if ($.inArray(val[i], keys) !== -1) {
                        ret.push(val[i]);
                    } else {
                        ret.push(keys[0]);
                    }
                    i++;
                });
            });
            return ret;
        }
    });

})($, window, document);
(function($, undefined) {
    var ms = $.mobiscroll,
        defaults = {
            invalid: [],
            showInput: true,
            inputClass: ''
        };

    ms.presets.scroller.list = function(inst) {
        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            layout = s.layout || (/top|bottom/.test(s.display) ? 'liquid' : ''),
            isLiquid = layout == 'liquid',
            origReadOnly = s.readonly,
            elm = $(this),
            input,
            prevent,
            id = this.id + '_dummy',
            lvl = 0,
            ilvl = 0,
            timer = {},
            currLevel = 1,
            currWheelVector = [],
            wa = s.wheelArray || createWheelArray(elm),
            labels = generateLabels(lvl),
            fwv = firstWheelVector(wa),
            w = generateWheelsFromVector(fwv, lvl);
        /**
         * Disables the invalid items on the wheels
         * @param {Object} dw - the $ mobiscroll object
         * @param {Number} nrWheels - the number of the current wheels
         * @param {Array} whArray - The wheel array objects containing the wheel tree
         * @param {Array} whVector - the wheel vector containing the current keys
         */
        function setDisabled(dw, nrWheels, whArray, whVector) {
            var j,
                i = 0;

            while (i < nrWheels) {
                var currWh = $('.dwwl' + i, dw),
                    inv = getInvalidKeys(whVector, i, whArray);

                for (j = 0; j < inv.length; j++) {
                    $('.dw-li[data-val="' + inv[j] + '"]', currWh).removeClass('dw-v');
                }
                i++;
            }
        }

        /**
         * Returns the invalid keys of one wheel as an array
         * @param {Array} whVector - the wheel vector used to search for the wheel in the wheel array
         * @param {Number} index - index of the wheel in the wheel vector, that we are interested in
         * @param {Array} whArray - the wheel array we are searching in
         * @return {Array} - list of invalid keys
         */
        function getInvalidKeys(whVector, index, whArray) {
            var i = 0,
                n,
                whObjA = whArray,
                invalids = [];

            while (i < index) {
                var ii = whVector[i];
                //whObjA = whObjA[ii].children;
                for (n in whObjA) {
                    if (whObjA[n].key == ii) {
                        whObjA = whObjA[n].children;
                        break;
                    }
                }
                i++;
            }
            i = 0;
            while (i < whObjA.length) {
                if (whObjA[i].invalid) {
                    invalids.push(whObjA[i].key);
                }
                i++;
            }
            return invalids;
        }

        /**
         * Creates a Boolean vector with true values (except one) that can be used as the readonly vector
         * n - the length of the vector
         * i - the index of the value that's going to be false
         */
        function createROVector(n, i) {
            var a = [];
            while (n) {
                a[--n] = true;
            }
            a[i] = false;
            return a;
        }

        /**
         * Creates a labels vector, from values if they are defined, otherwise from numbers
         * l - the length of the vector
         */
        function generateLabels(l) {
            var a = [],
                i;
            for (i = 0; i < l; i++) {
                a[i] = s.labels && s.labels[i] ? s.labels[i] : i;
            }
            return a;
        }

        /**
         * Creates the wheel array from the vector provided
         * wv - wheel vector containing the values that should be selected on the wheels
         * l - the length of the wheel array
         */
        function generateWheelsFromVector(wv, l, index) {

            var i = 0,
                j, obj, chInd,
                w = [
                    []
                ],
                wtObjA = wa;

            if (l) { // if length is defined we need to generate that many wheels (even if they are empty)
                for (j = 0; j < l; j++) {
                    if (isLiquid) {
                        w[0][j] = {};
                    } else {
                        w[j] = [{}];
                    }
                }
            }
            while (i < wv.length) {

                if (isLiquid) {
                    w[0][i] = getWheelFromObjA(wtObjA, labels[i]);
                } else {
                    w[i] = [getWheelFromObjA(wtObjA, labels[i])];
                }

                j = 0;
                chInd = undefined;

                // while (j < wtObjA.length && chInd === undefined) {
                //     if (wtObjA[j].key == wv[i] && ((index !== undefined && i <= index) || index === undefined)) {
                //         chInd = j;
                //     }
                //     j++;
                // }
                while (j < wtObjA.length && chInd === undefined) {
                    if (wtObjA[j].key == wv[i]) {
                        chInd = j;
                    }
                    j++;
                }
                if (chInd !== undefined && wtObjA[chInd].children) {
                    i++;
                    wtObjA = wtObjA[chInd].children;
                } else if ((obj = getFirstValidItemObjOrInd(wtObjA)) && obj.children) {
                    i++;
                    wtObjA = obj.children;
                } else {

                    return w;
                }
            }
            return w;
        }

        /**
         * Returns the first valid Wheel Node Object or its index from a Wheel Node Object Array
         * getInd - if it is true then the return value is going to be the index, otherwise the object itself
         */
        function getFirstValidItemObjOrInd(wtObjA, getInd) {
            if (!wtObjA) {
                return false;
            }

            var i = 0,
                obj;

            while (i < wtObjA.length) {
                if (!(obj = wtObjA[i++]).invalid) {
                    return getInd ? i - 1 : obj;
                }
            }
            return false;
        }

        function getWheelFromObjA(objA, lbl) {
            var wheel = {
                    keys: [],
                    values: [],
                    label: lbl
                },
                j = 0;

            while (j < objA.length) {
                wheel.values.push(objA[j].value);
                wheel.keys.push(objA[j].key);
                j++;
            }
            return wheel;
        }

        /**
         * Hides the last i number of wheels
         * i - the last number of wheels that has to be hidden
         */
        function hideWheels(dw, i) {
            $('.dwfl', dw).css('display', '').slice(i).hide();
        }

        /**
         * Generates the first wheel vector from the wheeltree
         * wt - the wheel tree object
         * uses the lvl global variable to determine the length of the vector
         */
        function firstWheelVector(wa) {
            var t = [],
                ndObjA = wa,
                obj,
                ok = true,
                i = 0;

            while (ok) {
                obj = getFirstValidItemObjOrInd(ndObjA);
                t[i++] = obj.key;
                ok = obj.children;
                if (ok) {
                    ndObjA = ok;
                }
            }
            return t;
        }

        /**
         * Calculates the level of a wheel vector and the new wheel vector, depending on current wheel vector and the index of the changed wheel
         * wv - current wheel vector
         * index - index of the changed wheel
         */
        function calcLevelOfVector2(wv, index) {
            var t = [],
                ndObjA = wa,
                lvl = 0,
                next = false,
                i,
                childName,
                chInd;

            if (wv[lvl] !== undefined && lvl <= index) {
                i = 0;

                childName = wv[lvl];
                chInd = undefined;

                while (i < ndObjA.length && chInd === undefined) {
                    if (ndObjA[i].key == wv[lvl] && !ndObjA[i].invalid) {
                        chInd = i;
                    }
                    i++;
                }
            } else {
                chInd = getFirstValidItemObjOrInd(ndObjA, true);
                childName = ndObjA[chInd].key;
            }

            next = chInd !== undefined ? ndObjA[chInd].children : false;

            t[lvl] = childName;

            while (next) {
                ndObjA = ndObjA[chInd].children;
                lvl++;
                next = false;
                chInd = undefined;

                if (wv[lvl] !== undefined && lvl <= index) {
                    i = 0;

                    childName = wv[lvl];
                    chInd = undefined;

                    while (i < ndObjA.length && chInd === undefined) {
                        if (ndObjA[i].key == wv[lvl] && !ndObjA[i].invalid) {
                            chInd = i;
                        }
                        i++;
                    }
                } else {
                    chInd = getFirstValidItemObjOrInd(ndObjA, true);
                    chInd = chInd === false ? undefined : chInd;
                    childName = ndObjA[chInd].key;
                }
                next = chInd !== undefined && getFirstValidItemObjOrInd(ndObjA[chInd].children) ? ndObjA[chInd].children : false;
                t[lvl] = childName;
            }
            return {
                lvl: lvl + 1,
                nVector: t
            }; // return the calculated level and the wheel vector as an object
        }

        function createWheelArray(ul) {
            var wheelArray = [];

            lvl = lvl > ilvl++ ? lvl : ilvl;

            ul.children('li').each(function(index) {
                var that = $(this),
                    c = that.clone();

                c.children('ul,ol').remove();

                var v = inst._processMarkup ? inst._processMarkup(c) : c.html().replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
                    inv = that.attr('data-invalid') ? true : false,
                    wheelObj = {
                        key: that.attr('data-val') === undefined || that.attr('data-val') === null ? index : that.attr('data-val'),
                        value: v,
                        invalid: inv,
                        children: null
                    },
                    nest = that.children('ul,ol');

                if (nest.length) {
                    wheelObj.children = createWheelArray(nest);
                }

                wheelArray.push(wheelObj);
            });

            ilvl--;
            return wheelArray;
        }

        if (s.showInput) {
            if ($('#' + id).length <= 0) {
                input = $('<input type="text" id="' + id + '" value="" />').insertBefore(elm);
            } else {
                input = $('#' + id);
            }
            input.addClass(s.inputClass).attr("readonly")
            // input = $('<input type="text" id="' + id + '" value="" class="' + s.inputClass + '" placeholder="' + (s.placeholder || '') + '" readonly />').insertBefore(elm);
            s.anchor = input; // give the core the input element for the bubble positioning
            inst.attachShow(input);
        }

        if (!s.wheelArray) {
            elm.hide().closest('.ui-field-contain').trigger('create');
        }
        return {
            width: 50,
            wheels: w,
            layout: layout,
            headerText: false,
            formatResult: function(d) {
                return d.slice(0, currLevel).join(' ');
            },
            parseValue: function(value) {
                return value ? (value + '').split(' ') : (s.defaultValue || fwv).slice(0);
            },
            onBeforeShow: function() {
                var t = inst.getArrayVal(true);
                currWheelVector = t.slice(0);
                s.wheels = generateWheelsFromVector(t, lvl, lvl);
                prevent = true;
            },
            onValueFill: function(v) {
                // console.log(v)
                if (input) {
                    input.val(v);
                }
            },
            onShow: function(dw) {
                $('.dwwl', dw).on('mousedown touchstart', function() {
                    clearTimeout(timer[$('.dwwl', dw).index(this)]);
                });
            },
            onDestroy: function() {
                if (input) {
                    input.remove();
                }
                elm.show();
            },
            validate: function(dw, index, time) {
                var args = [],
                    t = inst.getArrayVal(true),
                    i = (index || 0) + 1,
                    j,
                    o;

                if ((index !== undefined && currWheelVector[index] != t[index]) || (index === undefined && !prevent)) {
                    s.wheels = generateWheelsFromVector(t, null, index);
                    o = calcLevelOfVector2(t, index === undefined ? t.length : index);
                    currLevel = o.lvl;

                    for (j = 0; j < t.length; j++) {
                        t[j] = o.nVector[j] || 0;
                    }

                    while (i < o.lvl) {
                        args.push(i++);
                    }

                    if (args.length) {
                        s.readonly = createROVector(lvl, index);
                        clearTimeout(timer[index]);
                        timer[index] = setTimeout(function() {
                            prevent = true;
                            hideWheels(dw, o.lvl);
                            currWheelVector = t.slice(0);
                            inst.changeWheel(args, index === undefined ? time : 0, index !== undefined);
                            s.readonly = origReadOnly;
                        }, index === undefined ? 0 : time * 1000);
                        return false;
                    }
                } else {
                    o = calcLevelOfVector2(t, t.length);
                    currLevel = o.lvl;
                }

                currWheelVector = t.slice(0);
                setDisabled(dw, o.lvl, wa, t);
                hideWheels(dw, o.lvl);

                prevent = false;
            }
        };
    };
})($);

(function($) {
    var ms = $.mobiscroll,
        presets = ms.presets.scroller;
    presets.treelist = presets.list;
    ms.presetShort('list');
    ms.presetShort('treelist');
    ms.themes['android-holo-light'] = {
        baseTheme: 'android-holo',
        rows: 5,
        height: 36,
        showLabel: false,
        selectedLineHeight: true,
        selectedLineBorder: 0,
        useShortLabels: true,
        icon: {
            filled: 'star3',
            empty: 'star'
        },
        btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down6',
        btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up6'
    };
    ms.themes.listview['android-holo-light'] = {
        baseTheme: 'android-holo'
    };

    ms.themes.menustrip['android-holo-light'] = {
        baseTheme: 'android-holo'
    };
})($);
var citySet = {
    init: function(p) {
        var self = this;
        var city = function(option) {

            this.init = function() {
                var _this = this,
                    _cn = {},
                    _search = 'value',
                    _cityCode = option['code'],
                    _cityName = option['name'];
                var address = option.address,
                    _type = option.type,
                    json = {};
                self.clevel = _type;
                if (address.mode) {
                    json = JSON.stringify(address.data);
                    json = json.replace(/k/g, "key").replace(/v/g, "value").replace(/i/g, "invalid").replace(/c/g, "children");
                    json = JSON.parse(json);
                } else {
                    console.log('不支持城市数据')
                    return false;
                }
                if (_cityCode || _cityName) {
                    var c;
                    if (_cityCode) {
                        c = _cityCode.split(",");
                        _search = "n";
                    } else if (_cityName && _cityName.replace(/\s+/g, ' ') != " ") {
                        c = _cityName.replace(/(^\s*)|(\s*$)/g, '').replace(/\s+/g, ',').split(",");
                        _search = "value";
                    }
                    _cn = self.getListCityCodeAll(c, json, Number(_type), _search);
                    console.log(_cn)
                    var _value = _cn.key.join(",");
                    _this.result({
                        'code': _cn.code.join(","),
                        'name': _cn.name.join(","),
                        'value': _value
                    })
                }
                _this.value = _value;
                _this.type = _type;
                _this.Data = json;
                return this;
            }
            this.result = function(r) {
                if (option.result) option.result(r)
            }
            this.Open = function() {
                var _key = [],
                    json = this.Data,
                    _this = this;
                for (var i = 0; i < _this.type; i++) {
                    _key[i] = 0;
                };
                var _cityValue = _this.value;
                if (_cityValue) {
                    _key = _cityValue.split(',');
                }
                var _cityNode = $("<input>", {
                    id: "J_t_city" + (new Date()).getTime()
                })
                // var padArrLengthTo3 = function(arr) {
                //     if (arr && Array.isArray(arr)) {
                //         if (arr.length === 2) {
                //             return arr.concat([''])
                //         }else if(arr.length === 1) {
                //             return arr.concat(['', ''])
                //         }else {
                //             return arr;
                //         }
                //     }
                // }
                //返显
                for (var i = 0; i < _this.type; i++) {
                    if(!_key[i]){
                        _key[i]="0"
                    }
                };
                _cityNode.mobiscroll().treelist({
                    height: 36,
                    rows: 5,
                    theme: "android-holo-light",
                    baseTheme: 'android-holo skin-type-' + _this.type,
                    mode: "scroller",
                    display: "bottom",
                    speedUnit: 0.0025,
                    timeUnit: 0.08,
                    setText: '完成',
                    defaultValue: _key,
                    wheelArray: json,
                    onValueFill: function(d) {
                        var _d = d.split(" "),
                            _a = self.getListCity(_d, json), //城市名称 数组
                            _b = _a.join(""),
                            _c = self.getCode(json, _d).d; //城市code 数组
                        // _a = padArrLengthTo3(_a);
                        // _c = padArrLengthTo3(_c);
                        // _d = padArrLengthTo3(_d);
                        var _value = _d.join(",");
                        _this.result({
                            'code': _c.join(","),
                            'name': _a.join(","),
                            'value': _value
                        })
                        _this.value = _value;
                    },
                    onHide: function(a, b) {
                        _cityNode.remove()
                    }
                }).trigger('click');
            };
            return this;
        }
        return new city(p).init();
    },
    getCode: function(_j, _d) {
        var data = {
                d: []
            },
            obj = _j,
            t = t || false,
        str = "";
        for (var i = 0; i < _d.length; i++) {
            obj = obj[_d[i]];
            data.d[i] = obj['n'];
            if (i > 0) str += ",";
            str += obj['n'];
            obj = obj["children"];

        };
        data.str = str;
        return data;
    },
    getListCityCodeAll: function(wv, arr, l, v) {
        var self = this;
        var n = 0,
            cj = 0,
            w = [],
            name = [],
            k = [];
        for (var i = 0; i < l; i++) {
            w[i] = 0;
            k[i] = 0;
        };
        var _d = {
            code: [],
            key: k,
            name: []
        };
        var vLen = wv.length;
        if (wv) {
            while (n < vLen) {
                var _v = wv[n];
                var i, len = arr.length;
                for (i = 0; i < arr.length; i++) {
                    var _ar = arr[i][v];
                    if (_v && (_ar == _v || _v.indexOf(_ar) >= 0 || _ar.indexOf(_v) >= 0)) {
                        var _a = arr[i];
                        k[n] = _a.key;
                        w[n] = _a.n;
                        name[n] = _a.value;
                        if (_a.children) {
                            arr = _a.children;
                        }
                        cj++;
                        break;
                    }
                };
                n++;
                if (i >= len) {
                    break;
                }
            }
        }
        if (cj >= vLen) {
            return {
                code: w,
                key: k,
                name: name
            };
        } else {
            return _d;
        }
    },
    getListCity: function(wv, j) {
        var self = this;
        var i = 0,
            w = [];
        var arr = j;
        while (i < wv.length) {
            var n = wv[i];
            var _a = arr[n];
            w[i] = _a.value;
            if (_a.children) {
                arr = _a.children;
                i++;
            } else {
                break;
            }
        }
        return w;
    }
}
export
default citySet;