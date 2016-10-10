(function(b, a, c) {
    (function(d) {
        typeof define == "function" && define.amd ? define(["jquery"], d) : jQuery && !jQuery.fn.qtip && d(jQuery);
    })(function(ag) {
        function ax(d) {
            V = {
                pageX: d.pageX,
                pageY: d.pageY,
                type: "mousemove",
                scrollX: b.pageXOffset || a.body.scrollLeft || a.documentElement.scrollLeft,
                scrollY: b.pageYOffset || a.body.scrollTop || a.documentElement.scrollTop
            };
        }

        function W(f) {
            var d = function(h) {
                    return h === aj || "object" != typeof h;
                },
                g = function(h) {
                    return !ag.isFunction(h) && (!h && !h.attr || h.length < 1 || "object" == typeof h && !h.jquery && !h.then);
                };
            if (!f || "object" != typeof f) {
                return af;
            }
            d(f.metadata) && (f.metadata = {
                type: f.metadata
            });
            if ("content" in f) {
                if (d(f.content) || f.content.jquery) {
                    f.content = {
                        text: f.content
                    };
                }
                g(f.content.text || af) && (f.content.text = af), "title" in f.content && (d(f.content.title) && (f.content.title = {
                    text: f.content.title
                }), g(f.content.title.text || af) && (f.content.title.text = af));
            }
            return "position" in f && d(f.position) && (f.position = {
                my: f.position,
                at: f.position
            }), "show" in f && d(f.show) && (f.show = f.show.jquery ? {
                target: f.show
            } : {
                event: f.show
            }), "hide" in f && d(f.hide) && (f.hide = f.hide.jquery ? {
                target: f.hide
            } : {
                event: f.hide
            }), "style" in f && d(f.style) && (f.style = {
                classes: f.style
            }), ag.each(ac, function() {
                this.sanitize && this.sanitize(f);
            }), f;
        }

        function t(N, aD, aC, az) {
            function S(l) {
                var g = 0,
                    m, j = aD,
                    f = l.split(".");
                while (j = j[f[g++]]) {
                    g < f.length && (m = j);
                }
                return [m || aD, f.pop()];
            }

            function p(f) {
                return e.concat("").join(f ? "-" + f + " " : " ");
            }

            function o() {
                var g = aD.style.widget,
                    f = E.hasClass(aA);
                E.removeClass(aA), aA = g ? "ui-state-disabled" : "qtip-disabled", E.toggleClass(aA, f), E.toggleClass("ui-helper-reset " + p(), g).toggleClass(X, aD.style.def && !g), M.content && M.content.toggleClass(p("content"), g), M.titlebar && M.titlebar.toggleClass(p("header"), g), M.button && M.button.toggleClass(n + "-icon", !g);
            }

            function w(f) {
                M.title && (M.titlebar.remove(), M.titlebar = M.title = M.button = aj, f !== af && ay.reposition());
            }

            function i() {
                var g = aD.content.title.button,
                    f = typeof g == "string",
                    j = f ? g : "Close tooltip";
                M.button && M.button.remove(), g.jquery ? M.button = g : M.button = ag("<a />", {
                    "class": "qtip-close " + (aD.style.widget ? "" : n + "-icon"),
                    title: j,
                    "aria-label": j
                }).prepend(ag("<span />", {
                    "class": "ui-icon ui-icon-close",
                    html: "&times;"
                })), M.button.appendTo(M.titlebar || E).attr("role", "button").click(function(l) {
                    return E.hasClass(aA) || ay.hide(l), af;
                });
            }

            function h() {
                var f = x + "-title";
                M.titlebar && w(), M.titlebar = ag("<div />", {
                    "class": n + "-titlebar " + (aD.style.widget ? p("header") : "")
                }).append(M.title = ag("<div />", {
                    id: f,
                    "class": n + "-title",
                    "aria-atomic": ao
                })).insertBefore(M.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function(g) {
                    ag(this).toggleClass("ui-state-active ui-state-focus", g.type.substr(-4) === "down");
                }).delegate(".qtip-close", "mouseover mouseout", function(g) {
                    ag(this).toggleClass("ui-state-hover", g.type === "mouseover");
                }), aD.content.title.button && i();
            }

            function k(g) {
                var f = M.button;
                if (!ay.rendered) {
                    return af;
                }
                g ? i() : f.remove();
            }

            function C(g, f) {
                var j = M.title;
                if (!ay.rendered || !g) {
                    return af;
                }
                ag.isFunction(g) && (g = g.call(N, D.event, ay));
                if (g === af || !g && g !== "") {
                    return w(af);
                }
                g.jquery && g.length > 0 ? j.empty().append(g.css({
                    display: "block"
                })) : j.html(g), f !== af && ay.rendered && E[0].offsetWidth > 0 && ay.reposition(D.event);
            }

            function v(f) {
                f && ag.isFunction(f.done) && f.done(function(g) {
                    r(g, null, af);
                });
            }

            function r(m, j, g) {
                function l(B) {
                    function f(u) {
                        u && (delete y[u.src], clearTimeout(ay.timers.img[u.src]), ag(u).unbind(O)), ag.isEmptyObject(y) && (j !== af && ay.reposition(D.event), B());
                    }
                    var A, y = {};
                    if ((A = q.find("img[src]:not([height]):not([width])")).length === 0) {
                        return f();
                    }
                    A.each(function(I, F) {
                        if (y[F.src] !== c) {
                            return;
                        }
                        var u = 0,
                            H = 3;
                        (function P() {
                            if (F.height || F.width || u > H) {
                                return f(F);
                            }
                            u += 1, ay.timers.img[F.src] = setTimeout(P, 700);
                        })(), ag(F).bind("error" + O + " load" + O, function() {
                            f(this);
                        }), y[F.src] = F;
                    });
                }
                var q = M.content;
                return !ay.rendered || !m ? af : (ag.isFunction(m) && (m = m.call(N, D.event, ay) || ""), g !== af && v(aD.content.deferred), m.jquery && m.length > 0 ? q.empty().append(m.css({
                    display: "block"
                })) : q.html(m), ay.rendered < 0 ? E.queue("fx", l) : (s = 0, l(ag.noop)), ay);
            }

            function L() {
                function j(B) {
                    if (E.hasClass(aA)) {
                        return af;
                    }
                    clearTimeout(ay.timers.show), clearTimeout(ay.timers.hide);
                    var l = function() {
                        ay.toggle(ao, B);
                    };
                    aD.show.delay > 0 ? ay.timers.show = setTimeout(l, aD.show.delay) : l();
                }

                function m(I) {
                    if (E.hasClass(aA) || T || s) {
                        return af;
                    }
                    var F = ag(I.relatedTarget || I.target),
                        B = F.closest(G)[0] === E[0],
                        l = F[0] === q.show[0];
                    clearTimeout(ay.timers.show), clearTimeout(ay.timers.hide);
                    if (A.target === "mouse" && B || aD.hide.fixed && /mouse(out|leave|move)/.test(I.type) && (B || l)) {
                        try {
                            I.preventDefault(), I.stopImmediatePropagation();
                        } catch (H) {}
                        return;
                    }
                    aD.hide.delay > 0 ? ay.timers.hide = setTimeout(function() {
                        ay.hide(I);
                    }, aD.hide.delay) : ay.hide(I);
                }

                function u(l) {
                    if (E.hasClass(aA)) {
                        return af;
                    }
                    clearTimeout(ay.timers.inactive), ay.timers.inactive = setTimeout(function() {
                        ay.hide(l);
                    }, aD.hide.inactive);
                }

                function g(l) {
                    ay.rendered && E[0].offsetWidth > 0 && ay.reposition(l);
                }
                var A = aD.position,
                    q = {
                        show: aD.show.target,
                        hide: aD.hide.target,
                        viewport: ag(A.viewport),
                        document: ag(a),
                        body: ag(a.body),
                        window: ag(b)
                    },
                    f = {
                        show: ag.trim("" + aD.show.event).split(" "),
                        hide: ag.trim("" + aD.hide.event).split(" ")
                    },
                    y = ag.browser.msie && parseInt(ag.browser.version, 10) === 6;
                E.bind("mouseenter" + O + " mouseleave" + O, function(B) {
                    var l = B.type === "mouseenter";
                    l && ay.focus(B), E.toggleClass(K, l);
                }), /mouse(out|leave)/i.test(aD.hide.event) && aD.hide.leave === "window" && q.window.bind("mouseout" + O + " blur" + O, function(l) {
                    !/select|option/.test(l.target.nodeName) && !l.relatedTarget && ay.hide(l);
                }), aD.hide.fixed ? (q.hide = q.hide.add(E), E.bind("mouseover" + O, function() {
                    E.hasClass(aA) || clearTimeout(ay.timers.hide);
                })) : /mouse(over|enter)/i.test(aD.show.event) && q.hide.bind("mouseleave" + O, function(l) {
                    clearTimeout(ay.timers.show);
                }), ("" + aD.hide.event).indexOf("unfocus") > -1 && A.container.closest("html").bind("mousedown" + O + " touchstart" + O, function(F) {
                    var B = ag(F.target),
                        H = ay.rendered && !E.hasClass(aA) && E[0].offsetWidth > 0,
                        l = B.parents(G).filter(E[0]).length > 0;
                    B[0] !== N[0] && B[0] !== E[0] && !l && !N.has(B[0]).length && !B.attr("disabled") && ay.hide(F);
                }), "number" == typeof aD.hide.inactive && (q.show.bind("qtip-" + aC + "-inactive", u), ag.each(av.inactiveEvents, function(B, l) {
                    q.hide.add(M.tooltip).bind(l + O + "-inactive", u);
                })), ag.each(f.hide, function(F, B) {
                    var H = ag.inArray(B, f.show),
                        l = ag(q.hide);
                    H > -1 && l.add(q.show).length === l.length || B === "unfocus" ? (q.show.bind(B + O, function(I) {
                        E[0].offsetWidth > 0 ? m(I) : j(I);
                    }), delete f.show[H]) : q.hide.bind(B + O, m);
                }), ag.each(f.show, function(B, l) {
                    q.show.bind(l + O, j);
                }), "number" == typeof aD.hide.distance && q.show.add(E).bind("mousemove" + O, function(F) {
                    var l = D.origin || {},
                        H = aD.hide.distance,
                        B = Math.abs;
                    (B(F.pageX - l.pageX) >= H || B(F.pageY - l.pageY) >= H) && ay.hide(F);
                }), A.target === "mouse" && (q.show.bind("mousemove" + O, ax), A.adjust.mouse && (aD.hide.event && (E.bind("mouseleave" + O, function(l) {
                    (l.relatedTarget || l.target) !== q.show[0] && ay.hide(l);
                }), M.target.bind("mouseenter" + O + " mouseleave" + O, function(l) {
                    D.onTarget = l.type === "mouseenter";
                })), q.document.bind("mousemove" + O, function(l) {
                    ay.rendered && D.onTarget && !E.hasClass(aA) && E[0].offsetWidth > 0 && ay.reposition(l || V);
                }))), (A.adjust.resize || q.viewport.length) && (ag.event.special.resize ? q.viewport : q.window).bind("resize" + O, g), q.window.add(A.container).bind("scroll" + O, g);
            }

            function d() {
                var f = [aD.show.target[0], aD.hide.target[0], ay.rendered && M.tooltip[0], aD.position.container[0], aD.position.viewport[0], aD.position.container.closest("html")[0], b, a];
                ay.rendered ? ag([]).pushStack(ag.grep(f, function(g) {
                    return typeof g == "object";
                })).unbind(O) : aD.show.target.unbind(O + "-create");
            }
            var ay = this,
                aB = a.body,
                x = n + "-" + aC,
                T = 0,
                s = 0,
                E = ag(),
                O = ".qtip-" + aC,
                aA = "qtip-disabled",
                M, D;
            ay.id = aC, ay.rendered = af, ay.destroyed = af, ay.elements = M = {
                target: N
            }, ay.timers = {
                img: {}
            }, ay.options = aD, ay.checks = {}, ay.plugins = {}, ay.cache = D = {
                event: {},
                target: ag(),
                disabled: af,
                attr: az,
                onTarget: af,
                lastClass: ""
            }, ay.checks.builtin = {
                "^id$": function(j, g, m) {
                    var l = m === ao ? av.nextid : m,
                        f = n + "-" + l;
                    l !== af && l.length > 0 && !ag("#" + f).length && (E[0].id = f, M.content[0].id = f + "-content", M.title[0].id = f + "-title");
                },
                "^content.text$": function(g, f, j) {
                    r(aD.content.text);
                },
                "^content.deferred$": function(g, f, j) {
                    v(aD.content.deferred);
                },
                "^content.title.text$": function(g, f, j) {
                    if (!j) {
                        return w();
                    }!M.title && j && h(), C(j);
                },
                "^content.title.button$": function(g, f, j) {
                    k(j);
                },
                "^position.(my|at)$": function(g, f, j) {
                    "string" == typeof j && (g[f] = new ac.Corner(j));
                },
                "^position.container$": function(g, f, j) {
                    ay.rendered && E.appendTo(j);
                },
                "^show.ready$": function() {
                    ay.rendered ? ay.toggle(ao) : ay.render(1);
                },
                "^style.classes$": function(g, f, j) {
                    E.attr("class", n + " qtip " + j);
                },
                "^style.width|height": function(g, f, j) {
                    E.css(f, j);
                },
                "^style.widget|content.title": o,
                "^events.(render|show|move|hide|focus|blur)$": function(g, f, j) {
                    E[(ag.isFunction(j) ? "" : "un") + "bind"]("tooltip" + f, j);
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
                    var f = aD.position;
                    E.attr("tracking", f.target === "mouse" && f.adjust.mouse), d(), L();
                }
            }, ag.extend(ay, {
                _triggerEvent: function(j, g, l) {
                    var f = ag.Event("tooltip" + j);
                    return f.originalEvent = (l ? ag.extend({}, l) : aj) || D.event || aj, E.trigger(f, [ay].concat(g || [])), !f.isDefaultPrevented();
                },
                render: function(g) {
                    if (ay.rendered) {
                        return ay;
                    }
                    var f = aD.content.text,
                        l = aD.content.title,
                        j = aD.position;
                    return ag.attr(N[0], "aria-describedby", x), E = M.tooltip = ag("<div/>", {
                        id: x,
                        "class": [n, X, aD.style.classes, n + "-pos-" + aD.position.my.abbrev()].join(" "),
                        width: aD.style.width || "",
                        height: aD.style.height || "",
                        tracking: j.target === "mouse" && j.adjust.mouse,
                        role: "alert",
                        "aria-live": "polite",
                        "aria-atomic": af,
                        "aria-describedby": x + "-content",
                        "aria-hidden": ao
                    }).toggleClass(aA, D.disabled).data("qtip", ay).appendTo(aD.position.container).append(M.content = ag("<div />", {
                        "class": n + "-content",
                        id: x + "-content",
                        "aria-atomic": ao
                    })), ay.rendered = -1, T = 1, l.text ? (h(), ag.isFunction(l.text) || C(l.text, af)) : l.button && i(), (!ag.isFunction(f) || f.then) && r(f, af), ay.rendered = ao, o(), ag.each(aD.events, function(q, m) {
                        ag.isFunction(m) && E.bind(q === "toggle" ? "tooltipshow tooltiphide" : "tooltip" + q, m);
                    }), ag.each(ac, function() {
                        this.initialize === "render" && this(ay);
                    }), L(), E.queue("fx", function(m) {
                        ay._triggerEvent("render"), T = 0, (aD.show.ready || g) && ay.toggle(ao, D.event, af), m();
                    }), ay;
                },
                get: function(g) {
                    var f, j;
                    switch (g.toLowerCase()) {
                        case "dimensions":
                            f = {
                                height: E.outerHeight(af),
                                width: E.outerWidth(af)
                            };
                            break;
                        case "offset":
                            f = ac.offset(E, aD.position.container);
                            break;
                        default:
                            j = S(g.toLowerCase()), f = j[0][j[1]], f = f.precedance ? f.string() : f;
                    }
                    return f;
                },
                set: function(A, m) {
                    function q(H, l) {
                        var I, u, f;
                        for (I in g) {
                            for (u in g[I]) {
                                if (f = (new RegExp(u, "i")).exec(H)) {
                                    l.push(f), g[I][u].apply(ay, l);
                                }
                            }
                        }
                    }
                    var F = /^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,
                        j = /^content\.(title|attr)|style/i,
                        y = af,
                        g = ay.checks,
                        B;
                    return "string" == typeof A ? (B = A, A = {}, A[B] = m) : A = ag.extend(ao, {}, A), ag.each(A, function(l, f) {
                        var u = S(l.toLowerCase()),
                            H;
                        H = u[0][u[1]], u[0][u[1]] = "object" == typeof f && f.nodeType ? ag(f) : f, A[l] = [u[0], u[1], f, H], y = F.test(l) || y;
                    }), W(aD), T = 1, ag.each(A, q), T = 0, ay.rendered && E[0].offsetWidth > 0 && y && ay.reposition(aD.position.target === "mouse" ? aj : D.event), ay;
                },
                toggle: function(F, m) {
                    function aE() {
                        F ? (ag.browser.msie && E[0].style.removeAttribute("filter"), E.css("overflow", ""), "string" == typeof aG.autofocus && ag(aG.autofocus, E).focus(), aG.target.trigger("qtip-" + aC + "-inactive")) : E.css({
                            display: "",
                            visibility: "",
                            opacity: "",
                            left: "",
                            top: ""
                        }), ay._triggerEvent(F ? "visible" : "hidden");
                    }
                    if (m) {
                        if (/over|enter/.test(m.type) && /out|leave/.test(D.event.type) && aD.show.target.add(m.target).length === aD.show.target.length && E.has(m.relatedTarget).length) {
                            return ay;
                        }
                        D.event = ag.extend({}, m);
                    }
                    if (!ay.rendered) {
                        return F ? ay.render(1) : ay;
                    }
                    var j = F ? "show" : "hide",
                        aG = aD[j],
                        q = aD[F ? "hide" : "show"],
                        I = aD.position,
                        A = aD.content,
                        f = E[0].offsetWidth > 0,
                        H = F || aG.target.length === 1,
                        aF = !m || aG.target.length < 2 || D.target[0] === m.target,
                        B, P;
                    return (typeof F).search("boolean|number") && (F = !f), !E.is(":animated") && f === F && aF ? ay : ay._triggerEvent(j, [90]) ? (ag.attr(E[0], "aria-hidden", !F), F ? (D.origin = ag.extend({}, V), ay.focus(m), ag.isFunction(A.text) && r(A.text, af), ag.isFunction(A.title.text) && C(A.title.text, af), !J && I.target === "mouse" && I.adjust.mouse && (ag(a).bind("mousemove.qtip", ax), J = ao), ay.reposition(m, arguments[2]), !aG.solo || (typeof aG.solo == "string" ? ag(aG.solo) : ag(G, aG.solo)).not(E).not(aG.target).qtip("hide", ag.Event("tooltipsolo"))) : (clearTimeout(ay.timers.show), delete D.origin, J && !ag(G + '[tracking="true"]:visible', aG.solo).not(E).length && (ag(a).unbind("mousemove.qtip"), J = af), ay.blur(m)), aG.effect === af || H === af ? (E[j](), aE.call(E)) : ag.isFunction(aG.effect) ? (E.stop(1, 1), aG.effect.call(E, ay), E.queue("fx", function(g) {
                        aE(), g();
                    })) : E.fadeTo(90, F ? 1 : 0, aE), F && aG.target.trigger("qtip-" + aC + "-inactive"), ay) : ay;
                },
                show: function(f) {
                    return ay.toggle(ao, f);
                },
                hide: function(f) {
                    return ay.toggle(af, f);
                },
                focus: function(l) {
                    if (!ay.rendered) {
                        return ay;
                    }
                    var g = ag(G),
                        q = parseInt(E[0].style.zIndex, 10),
                        f = av.zindex + g.length,
                        j = ag.extend({}, l),
                        m;
                    return E.hasClass(am) || ay._triggerEvent("focus", [f], j) && (q !== f && (g.each(function() {
                        this.style.zIndex > q && (this.style.zIndex = this.style.zIndex - 1);
                    }), g.filter("." + am).qtip("blur", j)), E.addClass(am)[0].style.zIndex = f), ay;
                },
                blur: function(f) {
                    return E.removeClass(am), ay._triggerEvent("blur", [E.css("zIndex")], f), ay;
                },
                reposition: function(aJ, aM) {
                    if (!ay.rendered || T) {
                        return ay;
                    }
                    T = 1;
                    var aI = aD.position.target,
                        aF = aD.position,
                        aO = aF.my,
                        aK = aF.at,
                        aN = aF.adjust,
                        I = aN.method.split(" "),
                        aP = E.outerWidth(af),
                        m = E.outerHeight(af),
                        aE = 0,
                        j = 0,
                        B = E.css("position"),
                        aH = aF.viewport,
                        aL = {
                            left: 0,
                            top: 0
                        },
                        H = aF.container,
                        A = E[0].offsetWidth > 0,
                        F = aJ && aJ.type === "scroll",
                        aQ = ag(b),
                        aG, q;
                    if (ag.isArray(aI) && aI.length === 2) {
                        aK = {
                            x: ap,
                            y: au
                        }, aL = {
                            left: aI[0],
                            top: aI[1]
                        };
                    } else {
                        if (aI === "mouse" && (aJ && aJ.pageX || D.event.pageX)) {
                            aK = {
                                x: ap,
                                y: au
                            }, aJ = V && V.pageX && (aN.mouse || !aJ || !aJ.pageX) ? {
                                pageX: V.pageX,
                                pageY: V.pageY
                            } : (!aJ || aJ.type !== "resize" && aJ.type !== "scroll" ? aJ && aJ.pageX && aJ.type === "mousemove" ? aJ : (!aN.mouse || aD.show.distance) && D.origin && D.origin.pageX ? D.origin : aJ : D.event) || aJ || D.event || V || {}, B !== "static" && (aL = H.offset()), aL = {
                                left: aJ.pageX - aL.left,
                                top: aJ.pageY - aL.top
                            }, aN.mouse && F && (aL.left -= V.scrollX - aQ.scrollLeft(), aL.top -= V.scrollY - aQ.scrollTop());
                        } else {
                            aI === "event" && aJ && aJ.target && aJ.type !== "scroll" && aJ.type !== "resize" ? D.target = ag(aJ.target) : aI !== "event" && (D.target = ag(aI.jquery ? aI : M.target)), aI = D.target, aI = ag(aI).eq(0);
                            if (aI.length === 0) {
                                return ay;
                            }
                            aI[0] === a || aI[0] === b ? (aE = ac.iOS ? b.innerWidth : aI.width(), j = ac.iOS ? b.innerHeight : aI.height(), aI[0] === b && (aL = {
                                top: (aH || aI).scrollTop(),
                                left: (aH || aI).scrollLeft()
                            })) : ac.imagemap && aI.is("area") ? aG = ac.imagemap(ay, aI, aK, ac.viewport ? I : af) : ac.svg && aI[0].ownerSVGElement ? aG = ac.svg(ay, aI, aK, ac.viewport ? I : af) : (aE = aI.outerWidth(af), j = aI.outerHeight(af), aL = ac.offset(aI, H)), aG && (aE = aG.width, j = aG.height, q = aG.offset, aL = aG.position);
                            if (ac.iOS > 3.1 && ac.iOS < 4.1 || ac.iOS >= 4.3 && ac.iOS < 4.33 || !ac.iOS && B === "fixed") {
                                aL.left -= aQ.scrollLeft(), aL.top -= aQ.scrollTop();
                            }
                            aL.left += aK.x === at ? aE : aK.x === ad ? aE / 2 : 0, aL.top += aK.y === ai ? j : aK.y === ad ? j / 2 : 0;
                        }
                    }
                    return aL.left += aN.x + (aO.x === at ? -aP : aO.x === ad ? -aP / 2 : 0), aL.top += aN.y + (aO.y === ai ? -m : aO.y === ad ? -m / 2 : 0), ac.viewport ? (aL.adjusted = ac.viewport(ay, aL, aF, aE, j, aP, m), q && aL.adjusted.left && (aL.left += q.left), q && aL.adjusted.top && (aL.top += q.top)) : aL.adjusted = {
                        left: 0,
                        top: 0
                    }, ay._triggerEvent("move", [aL, aH.elem || aH], aJ) ? (delete aL.adjusted, aM === af || !A || isNaN(aL.left) || isNaN(aL.top) || aI === "mouse" || !ag.isFunction(aF.effect) ? E.css(aL) : ag.isFunction(aF.effect) && (aF.effect.call(E, ay, ag.extend({}, aL)), E.queue(function(f) {
                        ag(this).css({
                            opacity: "",
                            height: ""
                        }), ag.browser.msie && this.style.removeAttribute("filter"), f();
                    })), T = 0, ay) : ay;
                },
                disable: function(f) {
                    return "boolean" != typeof f && (f = !E.hasClass(aA) && !D.disabled), ay.rendered ? (E.toggleClass(aA, f), ag.attr(E[0], "aria-disabled", f)) : D.disabled = !!f, ay;
                },
                enable: function() {
                    return ay.disable(af);
                },
                destroy: function() {
                    var g = N[0],
                        f = ag.attr(g, z),
                        j = N.data("qtip");
                    ay.destroyed = ao, ay.rendered && (E.stop(1, 0).remove(), ag.each(ay.plugins, function() {
                        this.destroy && this.destroy();
                    })), clearTimeout(ay.timers.show), clearTimeout(ay.timers.hide), d();
                    if (!j || ay === j) {
                        ag.removeData(g, "qtip"), aD.suppress && f && (ag.attr(g, "title", f), N.removeAttr(z)), N.removeAttr("aria-describedby");
                    }
                    return N.unbind(".qtip-" + aC), delete ab[ay.id], N;
                }
            });
        }

        function R(w, j) {
            var E, C, s, o, A, q = ag(this),
                i = ag(a.body),
                x = this === a ? i : q,
                D = q.metadata ? q.metadata(j.metadata) : aj,
                k = j.metadata.type === "html5" && D ? D[j.metadata.name] : aj,
                r = q.data(j.metadata.name || "qtipopts");
            try {
                r = typeof r == "string" ? ag.parseJSON(r) : r;
            } catch (B) {}
            o = ag.extend(ao, {}, av.defaults, j, typeof r == "object" ? W(r) : aj, W(k || D)), C = o.position, o.id = w;
            if ("boolean" == typeof o.content.text) {
                s = q.attr(o.content.attr);
                if (o.content.attr === af || !s) {
                    return af;
                }
                o.content.text = s;
            }
            C.container.length || (C.container = i), C.target === af && (C.target = x), o.show.target === af && (o.show.target = x), o.show.solo === ao && (o.show.solo = C.container.closest("body")), o.hide.target === af && (o.hide.target = x), o.position.viewport === ao && (o.position.viewport = C.container), C.container = C.container.eq(0), C.at = new ac.Corner(C.at), C.my = new ac.Corner(C.my);
            if (ag.data(this, "qtip")) {
                if (o.overwrite) {
                    q.qtip("destroy");
                } else {
                    if (o.overwrite === af) {
                        return af;
                    }
                }
            }
            return o.suppress && (A = ag.attr(this, "title")) && ag(this).removeAttr("title").attr(z, A).attr("title", ""), E = new t(q, o, w, !!s), ag.data(this, "qtip", E), q.bind("remove.qtip-" + w + " removeqtip.qtip-" + w, function() {
                E.destroy();
            }), E;
        }

        function Y(m) {
            var s = this,
                g = m.elements.tooltip,
                d = m.options.content.ajax,
                r = av.defaults.content.ajax,
                q = ".qtip-ajax",
                k = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                i = ao,
                p = af,
                j;
            m.checks.ajax = {
                "^content.ajax": function(l, h, f) {
                    h === "ajax" && (d = f), h === "once" ? s.init() : d && d.url ? s.load() : g.unbind(q);
                }
            }, ag.extend(s, {
                init: function() {
                    return d && d.url && g.unbind(q)[d.once ? "one" : "bind"]("tooltipshow" + q, s.load), s;
                },
                load: function(h) {
                    function o() {
                        var v;
                        if (m.destroyed) {
                            return;
                        }
                        i = af, B && (p = ao, m.show(h.originalEvent)), (v = r.complete || d.complete) && ag.isFunction(v) && v.apply(d.context || m, arguments);
                    }

                    function w(y, D, v) {
                        var C;
                        if (m.destroyed) {
                            return;
                        }
                        u && "string" == typeof y && (y = ag("<div/>").append(y.replace(k, "")).find(u)), (C = r.success || d.success) && ag.isFunction(C) ? C.call(d.context || m, y, D, v) : m.set("content.text", y);
                    }

                    function x(v, C, y) {
                        if (m.destroyed || v.status === 0) {
                            return;
                        }
                        m.set("content.text", C + ": " + y);
                    }
                    if (p) {
                        p = af;
                        return;
                    }
                    var A = d.url.lastIndexOf(" "),
                        f = d.url,
                        u, B = !d.loading && i;
                    if (B) {
                        try {
                            h.preventDefault();
                        } catch (l) {}
                    } else {
                        if (h && h.isDefaultPrevented()) {
                            return s;
                        }
                    }
                    j && j.abort && j.abort(), A > -1 && (u = f.substr(A), f = f.substr(0, A)), j = ag.ajax(ag.extend({
                        error: r.error || x,
                        context: m
                    }, d, {
                        url: f,
                        success: w,
                        complete: o
                    }));
                },
                destroy: function() {
                    j && j.abort && j.abort(), m.destroyed = ao;
                }
            }), s.init();
        }

        function an(j, f, k) {
            var h = Math.ceil(f / 2),
                d = Math.ceil(k / 2),
                g = {
                    bottomright: [
                        [0, 0],
                        [f, k],
                        [f, 0]
                    ],
                    bottomleft: [
                        [0, 0],
                        [f, 0],
                        [0, k]
                    ],
                    topright: [
                        [0, k],
                        [f, 0],
                        [f, k]
                    ],
                    topleft: [
                        [0, 0],
                        [0, k],
                        [f, k]
                    ],
                    topcenter: [
                        [0, k],
                        [h, 0],
                        [f, k]
                    ],
                    bottomcenter: [
                        [0, 0],
                        [f, 0],
                        [h, k]
                    ],
                    rightcenter: [
                        [0, 0],
                        [f, d],
                        [0, k]
                    ],
                    leftcenter: [
                        [f, 0],
                        [f, k],
                        [0, d]
                    ]
                };
            return g.lefttop = g.bottomright, g.righttop = g.bottomleft, g.leftbottom = g.topright, g.rightbottom = g.topleft, g[j.string()];
        }

        function U(aD, v) {
            function az(k) {
                var g = u.is(":visible");
                u.show(), k(), u.toggle(g);
            }

            function i() {
                p.width = aC.height, p.height = aC.width;
            }

            function l() {
                p.width = aC.width, p.height = aC.height;
            }

            function aF(S, g, A, H) {
                if (!aE.tip) {
                    return;
                }
                var B = aA.corner.clone(),
                    P = A.adjusted,
                    aG = aD.options.position.adjust.method.split(" "),
                    O = aG[0],
                    F = aG[1] || aG[0],
                    I = {
                        left: af,
                        top: af,
                        x: 0,
                        y: 0
                    },
                    m, D = {},
                    M;
                aA.corner.fixed !== ao && (O === aa && B.precedance === ae && P.left && B.y !== ad ? B.precedance = B.precedance === ae ? aw : ae : O !== aa && P.left && (B.x = B.x === ad ? P.left > 0 ? ap : at : B.x === ap ? at : ap), F === aa && B.precedance === aw && P.top && B.x !== ad ? B.precedance = B.precedance === aw ? ae : aw : F !== aa && P.top && (B.y = B.y === ad ? P.top > 0 ? au : ai : B.y === au ? ai : au), B.string() !== f.corner.string() && (f.top !== P.top || f.left !== P.left) && aA.update(B, af)), m = aA.position(B, P), m[B.x] += h(B, B.x), m[B.y] += h(B, B.y), m.right !== c && (m.left = -m.right), m.bottom !== c && (m.top = -m.bottom), m.user = Math.max(0, aC.offset);
                if (I.left = O === aa && !!P.left) {
                    B.x === ad ? D["margin-left"] = I.x = m["margin-left"] : (M = m.right !== c ? [P.left, -m.left] : [-P.left, m.left], (I.x = Math.max(M[0], M[1])) > M[0] && (A.left -= P.left, I.left = af), D[m.right !== c ? at : ap] = I.x);
                }
                if (I.top = F === aa && !!P.top) {
                    B.y === ad ? D["margin-top"] = I.y = m["margin-top"] : (M = m.bottom !== c ? [P.top, -m.top] : [-P.top, m.top], (I.y = Math.max(M[0], M[1])) > M[0] && (A.top -= P.top, I.top = af), D[m.bottom !== c ? ai : au] = I.y);
                }
                aE.tip.css(D).toggle(!(I.x && I.y || B.x === ad && I.y || B.y === ad && I.x)), A.left -= m.left.charAt ? m.user : O !== aa || I.top || !I.left && !I.top ? m.left : 0, A.top -= m.top.charAt ? m.user : F !== aa || I.left || !I.left && !I.top ? m.top : 0, f.left = P.left, f.top = P.top, f.corner = B.clone();
            }

            function w() {
                var g = aC.corner,
                    x = aD.options.position,
                    k = x.at,
                    m = x.my.string ? x.my.string() : x.my;
                return g === af || m === af && k === af ? af : (g === ao ? aA.corner = new ac.Corner(m) : g.string || (aA.corner = new ac.Corner(g), aA.corner.fixed = ao), f.corner = new ac.Corner(aA.corner.string()), aA.corner.string() !== "centercenter");
            }

            function h(B, m, D) {
                m = m ? m : B[B.precedance];
                var A = aE.titlebar && B.y === au,
                    k = A ? aE.titlebar : u,
                    x = "border-" + m + "-width",
                    C = function(E) {
                        return parseInt(E.css(x), 10);
                    },
                    g;
                return az(function() {
                    g = (D ? C(D) : C(aE.content) || C(k) || C(u)) || 0;
                }), g;
            }

            function r(A) {
                var D = aE.titlebar && A.y === au,
                    k = D ? aE.titlebar : aE.content,
                    m = ag.browser.mozilla,
                    E = m ? "-moz-" : ag.browser.webkit ? "-webkit-" : "",
                    g = "border-radius-" + A.y + A.x,
                    C = "border-" + A.y + "-" + A.x + "-radius",
                    B = function(F) {
                        return parseInt(k.css(F), 10) || parseInt(u.css(F), 10);
                    },
                    x;
                return az(function() {
                    x = B(C) || B(E + C) || B(E + g) || B(g) || 0;
                }), x;
            }

            function ay(E) {
                function D(S, N, T) {
                    var P = S.css(N) || g;
                    return T && P === S.css(T) ? af : C.test(P) ? af : P;
                }
                var O, m, k, M = aE.tip.css("cssText", ""),
                    I = E || aA.corner,
                    C = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,
                    x = "border-" + I[I.precedance] + "-color",
                    B = "background-color",
                    g = "transparent",
                    F = " !important",
                    H = aE.titlebar,
                    L = H && (I.y === au || I.y === ad && M.position().top + p.height / 2 + aC.offset < H.outerHeight(ao)),
                    A = L ? H : aE.content;
                az(function() {
                    d.fill = D(M, B) || D(A, B) || D(aE.content, B) || D(u, B) || M.css(B), d.border = D(M, x, "color") || D(A, x, "color") || D(aE.content, x, "color") || D(u, x, "color") || u.css(x), ag("*", M).add(M).css("cssText", B + ":" + g + F + ";border:0" + F + ";");
                });
            }

            function s(E) {
                var L = E.precedance === aw,
                    A = p[L ? ar : al],
                    g = p[L ? al : ar],
                    C = E.string().indexOf(ad) > -1,
                    M = A * (C ? 0.5 : 1),
                    x = Math.pow,
                    I = Math.round,
                    H, D, k, F = Math.sqrt(x(M, 2) + x(g, 2)),
                    B = [j / M * F, j / g * F];
                return B[2] = Math.sqrt(x(B[0], 2) - x(j, 2)), B[3] = Math.sqrt(x(B[1], 2) - x(j, 2)), H = F + B[2] + B[3] + (C ? 0 : B[0]), D = H / F, k = [I(D * g), I(D * A)], {
                    height: k[L ? 0 : 1],
                    width: k[L ? 1 : 0]
                };
            }

            function q(k, g, m) {
                return "<qvml:" + k + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (g || "") + ' style="behavior: url(#default#VML); ' + (m || "") + '" />';
            }
            var aA = this,
                aC = aD.options.style.tip,
                aE = aD.elements,
                u = aE.tooltip,
                f = {
                    top: 0,
                    left: 0
                },
                p = {
                    width: aC.width,
                    height: aC.height
                },
                d = {},
                j = aC.border || 0,
                y = ".qtip-tip",
                aB = !!(ag("<canvas />")[0] || {}).getContext,
                o;
            aA.corner = aj, aA.mimic = aj, aA.border = j, aA.offset = aC.offset, aA.size = p, aD.checks.tip = {
                "^position.my|style.tip.(corner|mimic|border)$": function() {
                    aA.init() || aA.destroy(), aD.reposition();
                },
                "^style.tip.(height|width)$": function() {
                    p = {
                        width: aC.width,
                        height: aC.height
                    }, aA.create(), aA.update(), aD.reposition();
                },
                "^content.title.text|style.(classes|widget)$": function() {
                    aE.tip && aE.tip.length && aA.update();
                }
            }, ag.extend(aA, {
                init: function() {
                    var g = w() && (aB || ag.browser.msie);
                    return g && (aA.create(), aA.update(), u.unbind(y).bind("tooltipmove" + y, aF)), g;
                },
                create: function() {
                    var k = p.width,
                        g = p.height,
                        m;
                    aE.tip && aE.tip.remove(), aE.tip = ag("<div />", {
                        "class": "qtip-tip"
                    }).css({
                        width: k,
                        height: g
                    }).prependTo(u), aB ? ag("<canvas />").appendTo(aE.tip)[0].getContext("2d").save() : (m = q("shape", 'coordorigin="0,0"', "position:absolute;"), aE.tip.html(m + m), ag("*", aE.tip).bind("click mousedown", function(x) {
                        x.stopPropagation();
                    }));
                },
                update: function(I, S) {
                    var B = aE.tip,
                        F = B.children(),
                        E = p.width,
                        N = p.height,
                        m = aC.mimic,
                        M = Math.round,
                        x, P, g, O, k;
                    I || (I = f.corner || aA.corner), m === af ? m = I : (m = new ac.Corner(m), m.precedance = I.precedance, m.x === "inherit" ? m.x = I.x : m.y === "inherit" ? m.y = I.y : m.x === m.y && (m[I.precedance] = I[I.precedance])), x = m.precedance, I.precedance === ae ? i() : l(), aE.tip.css({
                        width: E = p.width,
                        height: N = p.height
                    }), ay(I), d.border !== "transparent" ? (j = h(I, aj), aC.border === 0 && j > 0 && (d.fill = d.border), aA.border = j = aC.border !== ao ? aC.border : j) : aA.border = j = 0, g = an(m, E, N), aA.size = k = s(I), B.css(k).css("line-height", k.height + "px"), I.precedance === aw ? O = [M(m.x === ap ? j : m.x === at ? k.width - E - j : (k.width - E) / 2), M(m.y === au ? k.height - N : 0)] : O = [M(m.x === ap ? k.width - E : 0), M(m.y === au ? j : m.y === ai ? k.height - N - j : (k.height - N) / 2)], aB ? (F.attr(k), P = F[0].getContext("2d"), P.restore(), P.save(), P.clearRect(0, 0, 3000, 3000), P.fillStyle = d.fill, P.strokeStyle = d.border, P.lineWidth = j * 2, P.lineJoin = "miter", P.miterLimit = 100, P.translate(O[0], O[1]), P.beginPath(), P.moveTo(g[0][0], g[0][1]), P.lineTo(g[1][0], g[1][1]), P.lineTo(g[2][0], g[2][1]), P.closePath(), j && (u.css("background-clip") === "border-box" && (P.strokeStyle = d.fill, P.stroke()), P.strokeStyle = d.border, P.stroke()), P.fill()) : (g = "m" + g[0][0] + "," + g[0][1] + " l" + g[1][0] + "," + g[1][1] + " " + g[2][0] + "," + g[2][1] + " xe", O[2] = j && /^(r|b)/i.test(I.string()) ? parseFloat(ag.browser.version, 10) === 8 ? 2 : 1 : 0, F.css({
                        coordsize: E + j + " " + (N + j),
                        antialias: "" + (m.string().indexOf(ad) > -1),
                        left: O[0],
                        top: O[1],
                        width: E + j,
                        height: N + j
                    }).each(function(C) {
                        var A = ag(this);
                        A[A.prop ? "prop" : "attr"]({
                            coordsize: E + j + " " + (N + j),
                            path: g,
                            fillcolor: d.fill,
                            filled: !!C,
                            stroked: !C
                        }).toggle(!!j || !!C), !C && A.html() === "" && A.html(q("stroke", 'weight="' + j * 2 + 'px" color="' + d.border + '" miterlimit="1000" joinstyle="miter"'));
                    })), S !== af && aA.position(I);
                },
                position: function(x) {
                    var k = aE.tip,
                        C = {},
                        g = Math.max(0, aC.offset),
                        B, m, A;
                    return aC.corner === af || !k ? af : (x = x || aA.corner, B = x.precedance, m = s(x), A = [x.x, x.y], B === ae && A.reverse(), ag.each(A, function(E, H) {
                        var F, D, I;
                        H === ad ? (F = B === aw ? ap : au, C[F] = "50%", C["margin-" + F] = -Math.round(m[B === aw ? ar : al] / 2) + g) : (F = h(x, H), D = h(x, H, aE.content), I = r(x), C[H] = E ? D : g + (I > F ? I : -F));
                    }), C[x[B]] -= m[B === ae ? ar : al], k.css({
                        top: "",
                        bottom: "",
                        left: "",
                        right: "",
                        margin: ""
                    }).css(C), C);
                },
                destroy: function() {
                    aE.tip && aE.tip.remove(), aE.tip = !1, u.unbind(y);
                }
            }), aA.init();
        }

        function Q(k) {
            function C() {
                q = ag(H, x).not("[disabled]").map(function() {
                    return typeof this.focus == "function" ? this : null;
                });
            }

            function D(d) {
                q.length < 1 && d.length ? d.not("body").blur() : q.first().focus();
            }

            function L(g) {
                var f = ag(g.target),
                    h = f.closest(".qtip"),
                    d;
                d = h.length < 1 ? af : parseInt(h[0].style.zIndex, 10) > parseInt(x[0].style.zIndex, 10), !d && ag(g.target).closest(G)[0] !== x[0] && D(f);
            }
            var j = this,
                I = k.options.show.modal,
                F = k.elements,
                x = F.tooltip,
                r = "#qtip-overlay",
                B = ".qtipmodal",
                s = B + k.id,
                i = "is-modal-qtip",
                A = ag(a.body),
                H = ac.modal.focusable.join(","),
                q = {},
                w;
            k.checks.modal = {
                "^show.modal.(on|blur)$": function() {
                    j.init(), F.overlay.toggle(x.is(":visible"));
                },
                "^content.text$": function() {
                    C();
                }
            }, ag.extend(j, {
                init: function() {
                    return I.on ? (w = j.create(), x.attr(i, ao).css("z-index", ac.modal.zindex + ag(G + "[" + i + "]").length).unbind(B).unbind(s).bind("tooltipshow" + B + " tooltiphide" + B, function(h, f, l) {
                        var d = h.originalEvent;
                        if (h.target === x[0]) {
                            if (d && h.type === "tooltiphide" && /mouse(leave|enter)/.test(d.type) && ag(d.relatedTarget).closest(w[0]).length) {
                                try {
                                    h.preventDefault();
                                } catch (g) {}
                            } else {
                                (!d || d && !d.solo) && j[h.type.replace("tooltip", "")](h, l);
                            }
                        }
                    }).bind("tooltipfocus" + B, function(h) {
                        if (h.isDefaultPrevented() || h.target !== x[0]) {
                            return;
                        }
                        var f = ag(G).filter("[" + i + "]"),
                            l = ac.modal.zindex + f.length,
                            d = parseInt(x[0].style.zIndex, 10);
                        w[0].style.zIndex = l - 2, f.each(function() {
                            this.style.zIndex > d && (this.style.zIndex -= 1);
                        }), f.end().filter("." + am).qtip("blur", h.originalEvent), x.addClass(am)[0].style.zIndex = l;
                        try {
                            h.preventDefault();
                        } catch (g) {}
                    }).bind("tooltiphide" + B, function(d) {
                        d.target === x[0] && ag("[" + i + "]").filter(":visible").not(x).last().qtip("focus", d);
                    }), I.escape && ag(a).unbind(s).bind("keydown" + s, function(d) {
                        d.keyCode === 27 && x.hasClass(am) && k.hide(d);
                    }), I.blur && F.overlay.unbind(s).bind("click" + s, function(d) {
                        x.hasClass(am) && k.hide(d);
                    }), C(), j) : j;
                },
                create: function() {
                    function f() {
                        w.css({
                            height: g.height(),
                            width: g.width()
                        });
                    }
                    var d = ag(r),
                        g = ag(b);
                    return d.length ? F.overlay = d.insertAfter(ag(G).last()) : (w = F.overlay = ag("<div />", {
                        id: r.substr(1),
                        html: "<div></div>",
                        mousedown: function() {
                            return af;
                        }
                    }).hide().insertAfter(ag(G).last()), g.unbind(B).bind("resize" + B, f), f(), w);
                },
                toggle: function(p, o, y) {
                    if (p && p.isDefaultPrevented()) {
                        return j;
                    }
                    var g = I.effect,
                        f = o ? "show" : "hide",
                        u = w.is(":visible"),
                        h = ag("[" + i + "]").filter(":visible").not(x),
                        d;
                    return w || (w = j.create()), w.is(":animated") && u === o && w.data("toggleState") !== af || !o && h.length ? j : (o ? (w.css({
                        left: 0,
                        top: 0
                    }), w.toggleClass("blurs", I.blur), I.stealfocus !== af && (A.bind("focusin" + s, L), D(ag("body :focus")))) : A.unbind("focusin" + s), w.stop(ao, af).data("toggleState", o), ag.isFunction(g) ? g.call(w, o) : g === af ? w[f]() : w.fadeTo(parseInt(y, 10) || 90, o ? 1 : 0, function() {
                        o || ag(this).hide();
                    }), o || w.queue(function(l) {
                        w.css({
                            left: "",
                            top: ""
                        }).removeData("toggleState"), l();
                    }), j);
                },
                show: function(f, d) {
                    return j.toggle(f, ao, d);
                },
                hide: function(f, d) {
                    return j.toggle(f, af, d);
                },
                destroy: function() {
                    var d = w;
                    return d && (d = ag("[" + i + "]").not(x).length < 1, d ? (F.overlay.remove(), ag(a).unbind(B)) : F.overlay.unbind(B + k.id), A.unbind("focusin" + s)), x.removeAttr(i).unbind(B);
                }
            }), j.init();
        }

        function ah(i) {
            var g = this,
                w = i.elements,
                r = i.options,
                q = w.tooltip,
                k = ".ie6-" + i.id,
                f = ag("select, object").length < 1,
                l = 0,
                s = af,
                j;
            i.checks.ie6 = {
                "^content|style$": function(h, d, m) {
                    redraw();
                }
            }, ag.extend(g, {
                init: function() {
                    var h = ag(b),
                        d;
                    f && (w.bgiframe = ag('<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'), w.bgiframe.appendTo(q), q.bind("tooltipmove" + k, g.adjustBGIFrame)), j = ag("<div/>", {
                        id: "qtip-rcontainer"
                    }).appendTo(a.body), g.redraw(), w.overlay && !s && (d = function() {
                        w.overlay[0].style.top = h.scrollTop() + "px";
                    }, h.bind("scroll.qtip-ie6, resize.qtip-ie6", d), d(), w.overlay.addClass("qtipmodal-ie6fix"), s = ao);
                },
                adjustBGIFrame: function() {
                    var p = i.get("dimensions"),
                        h = i.plugins.tip,
                        o = w.tip,
                        d, m;
                    m = parseInt(q.css("border-left-width"), 10) || 0, m = {
                        left: -m,
                        top: -m
                    }, h && o && (d = h.corner.precedance === "x" ? ["width", "left"] : ["height", "top"], m[d[1]] -= o[d[0]]()), w.bgiframe.css(m).css(p);
                },
                redraw: function() {
                    if (i.rendered < 1 || l) {
                        return g;
                    }
                    var v = r.style,
                        m = r.position.container,
                        p, h, o, d;
                    return l = 1, v.height && q.css(al, v.height), v.width ? q.css(ar, v.width) : (q.css(ar, "").appendTo(j), h = q.width(), h % 2 < 1 && (h += 1), o = q.css("max-width") || "", d = q.css("min-width") || "", p = (o + d).indexOf("%") > -1 ? m.width() / 100 : 0, o = (o.indexOf("%") > -1 ? p : 1) * parseInt(o, 10) || h, d = (d.indexOf("%") > -1 ? p : 1) * parseInt(d, 10) || 0, h = o + d ? Math.min(Math.max(h, d), o) : h, q.css(ar, Math.round(h)).appendTo(m)), l = 0, g;
                },
                destroy: function() {
                    f && w.bgiframe.remove(), q.unbind(k);
                }
            }), g.init();
        }
        var ao = !0,
            af = !1,
            aj = null,
            ae = "x",
            aw = "y",
            ar = "width",
            al = "height",
            au = "top",
            ap = "left",
            ai = "bottom",
            at = "right",
            ad = "center",
            ak = "flip",
            aq = "flipinvert",
            aa = "shift",
            av, ac, V, n = "qtip",
            ab = {},
            e = ["ui-widget", "ui-tooltip"],
            G = "div.qtip." + n,
            X = n + "-default",
            am = n + "-focus",
            K = n + "-hover",
            Z = "_replacedByqTip",
            z = "oldtitle",
            J;
        av = ag.fn.qtip = function(o, j, i) {
            var g = ("" + o).toLowerCase(),
                m = aj,
                d = ag.makeArray(arguments).slice(1),
                p = d[d.length - 1],
                k = this[0] ? ag.data(this[0], "qtip") : aj;
            if (!arguments.length && k || g === "api") {
                return k;
            }
            if ("string" == typeof o) {
                return this.each(function() {
                    var f = ag.data(this, "qtip");
                    if (!f) {
                        return ao;
                    }
                    p && p.timeStamp && (f.cache.event = p);
                    if (g !== "option" && g !== "options" || !j) {
                        f[g] && f[g].apply(f[g], d);
                    } else {
                        if (!ag.isPlainObject(j) && i === c) {
                            return m = f.get(j), af;
                        }
                        f.set(j, i);
                    }
                }), m !== aj ? m : this;
            }
            if ("object" == typeof o || !arguments.length) {
                return k = W(ag.extend(ao, {}, o)), av.bind.call(this, k, p);
            }
        }, av.bind = function(f, d) {
            return this.each(function(r) {
                function q(l) {
                    function h() {
                        s.render(typeof l == "object" || j.show.ready), i.show.add(i.hide).unbind(g);
                    }
                    if (s.cache.disabled) {
                        return af;
                    }
                    s.cache.event = ag.extend({}, l), s.cache.target = l ? ag(l.target) : [c], j.show.delay > 0 ? (clearTimeout(s.timers.show), s.timers.show = setTimeout(h, j.show.delay), m.show !== m.hide && i.hide.bind(m.hide, function() {
                        clearTimeout(s.timers.show);
                    })) : h();
                }
                var j, i, m, g, s, k;
                k = ag.isArray(f.id) ? f.id[r] : f.id, k = !k || k === af || k.length < 1 || ab[k] ? av.nextid++ : ab[k] = k, g = ".qtip-" + k + "-create", s = R.call(this, k, f);
                if (s === af) {
                    return ao;
                }
                j = s.options, ag.each(ac, function() {
                    this.initialize === "initialize" && this(s);
                }), i = {
                    show: j.show.target,
                    hide: j.hide.target
                }, m = {
                    show: ag.trim("" + j.show.event).replace(/ /g, g + " ") + g,
                    hide: ag.trim("" + j.hide.event).replace(/ /g, g + " ") + g
                }, /mouse(over|enter)/i.test(m.show) && !/mouse(out|leave)/i.test(m.hide) && (m.hide += " mouseleave" + g), i.show.bind("mousemove" + g, function(h) {
                    ax(h), s.cache.onTarget = ao;
                }), i.show.bind(m.show, q), (j.show.ready || j.prerender) && q(d);
            }).attr("data-hasqtip", ao);
        }, ac = av.plugins = {
            Corner: function(f) {
                f = ("" + f).replace(/([A-Z])/, " $1").replace(/middle/gi, ad).toLowerCase(), this.x = (f.match(/left|right/i) || f.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (f.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase();
                var d = f.charAt(0);
                this.precedance = d === "t" || d === "b" ? aw : ae, this.string = function() {
                    return this.precedance === aw ? this.y + this.x : this.x + this.y;
                }, this.abbrev = function() {
                    var h = this.x.substr(0, 1),
                        g = this.y.substr(0, 1);
                    return h === g ? h : this.precedance === aw ? g + h : h + g;
                }, this.invertx = function(g) {
                    this.x = this.x === ap ? at : this.x === at ? ap : g || this.x;
                }, this.inverty = function(g) {
                    this.y = this.y === au ? ai : this.y === ai ? au : g || this.y;
                }, this.clone = function() {
                    return {
                        x: this.x,
                        y: this.y,
                        precedance: this.precedance,
                        string: this.string,
                        abbrev: this.abbrev,
                        clone: this.clone,
                        invertx: this.invertx,
                        inverty: this.inverty
                    };
                };
            },
            offset: function(m, g) {
                function p(i, f) {
                    j.left += f * i.scrollLeft(), j.top += f * i.scrollTop();
                }
                var j = m.offset(),
                    v = m.closest("body"),
                    d = ag.browser.msie && a.compatMode !== "CSS1Compat",
                    r = g,
                    q, k, h;
                if (r) {
                    do {
                        r.css("position") !== "static" && (k = r.position(), j.left -= k.left + (parseInt(r.css("borderLeftWidth"), 10) || 0) + (parseInt(r.css("marginLeft"), 10) || 0), j.top -= k.top + (parseInt(r.css("borderTopWidth"), 10) || 0) + (parseInt(r.css("marginTop"), 10) || 0), !q && (h = r.css("overflow")) !== "hidden" && h !== "visible" && (q = r));
                    } while ((r = ag(r[0].offsetParent)).length);
                    (q && q[0] !== v[0] || d) && p(q || v, 1);
                }
                return j;
            },
            iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || af,
            fn: {
                attr: function(h, f) {
                    if (this.length) {
                        var j = this[0],
                            d = "title",
                            g = ag.data(j, "qtip");
                        if (h === d && g && "object" == typeof g && g.options.suppress) {
                            return arguments.length < 2 ? ag.attr(j, z) : (g && g.options.content.attr === d && g.cache.attr && g.set("content.text", f), this.attr(z, f));
                        }
                    }
                    return ag.fn["attr" + Z].apply(this, arguments);
                },
                clone: function(g) {
                    var f = ag([]),
                        h = "title",
                        d = ag.fn["clone" + Z].apply(this, arguments);
                    return g || d.filter("[" + z + "]").attr("title", function() {
                        return ag.attr(this, z);
                    }).removeAttr(z), d;
                }
            }
        }, ag.each(ac.fn, function(f, d) {
            if (!d || ag.fn[f + Z]) {
                return ao;
            }
            var g = ag.fn[f + Z] = ag.fn[f];
            ag.fn[f] = function() {
                return d.apply(this, arguments) || g.apply(this, arguments);
            };
        }), ag.ui || (ag["cleanData" + Z] = ag.cleanData, ag.cleanData = function(h) {
            for (var f = 0, d;
                (d = h[f]) !== c; f++) {
                try {
                    ag(d).triggerHandler("removeqtip");
                } catch (g) {}
            }
            ag["cleanData" + Z](h);
        }), av.version = "2.0.1-4-g", av.nextid = 0, av.inactiveEvents = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), av.zindex = 15000, av.defaults = {
            prerender: af,
            id: af,
            overwrite: ao,
            suppress: ao,
            content: {
                text: ao,
                attr: "title",
                deferred: af,
                title: {
                    text: af,
                    button: af
                }
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: af,
                container: af,
                viewport: af,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: ao,
                    resize: ao,
                    method: "flipinvert flipinvert"
                },
                effect: function(f, d, g) {
                    ag(this).animate(d, {
                        duration: 200,
                        queue: af
                    });
                }
            },
            show: {
                target: af,
                event: "mouseenter",
                effect: ao,
                delay: 90,
                solo: af,
                ready: af,
                autofocus: af
            },
            hide: {
                target: af,
                event: "mouseleave",
                effect: ao,
                delay: 0,
                fixed: af,
                inactive: af,
                leave: "window",
                distance: af
            },
            style: {
                classes: "",
                widget: af,
                width: af,
                height: af,
                def: ao
            },
            events: {
                render: aj,
                move: aj,
                show: aj,
                hide: aj,
                toggle: aj,
                visible: aj,
                hidden: aj,
                focus: aj,
                blur: aj
            }
        }, ac.svg = function(v, j, m, A) {
            var g = ag(a),
                y = j[0],
                x = {
                    width: 0,
                    height: 0,
                    position: {
                        top: 10000000000,
                        left: 10000000000
                    }
                },
                r, k, w, q, d;
            while (!y.getBBox) {
                y = y.parentNode;
            }
            if (y.getBBox && y.parentNode) {
                r = y.getBBox(), k = y.getScreenCTM(), w = y.farthestViewportElement || y;
                if (!w.createSVGPoint) {
                    return x;
                }
                q = w.createSVGPoint(), q.x = r.x, q.y = r.y, d = q.matrixTransform(k), x.position.left = d.x, x.position.top = d.y, q.x += r.width, q.y += r.height, d = q.matrixTransform(k), x.width = d.x - x.position.left, x.height = d.y - x.position.top, x.position.left += g.scrollLeft(), x.position.top += g.scrollTop();
            }
            return x;
        }, ac.ajax = function(f) {
            var d = f.plugins.ajax;
            return "object" == typeof d ? d : f.plugins.ajax = new Y(f);
        }, ac.ajax.initialize = "render", ac.ajax.sanitize = function(f) {
            var d = f.content,
                g;
            d && "ajax" in d && (g = d.ajax, typeof g != "object" && (g = f.content.ajax = {
                url: g
            }), "boolean" != typeof g.once && g.once && (g.once = !!g.once));
        }, ag.extend(ao, av.defaults, {
            content: {
                ajax: {
                    loading: ao,
                    once: ao
                }
            }
        }), ac.tip = function(f) {
            var d = f.plugins.tip;
            return "object" == typeof d ? d : f.plugins.tip = new U(f);
        }, ac.tip.initialize = "render", ac.tip.sanitize = function(f) {
            var d = f.style,
                g;
            d && "tip" in d && (g = f.style.tip, typeof g != "object" && (f.style.tip = {
                corner: g
            }), /string|boolean/i.test(typeof g.corner) || (g.corner = ao), typeof g.width != "number" && delete g.width, typeof g.height != "number" && delete g.height, typeof g.border != "number" && g.border !== ao && delete g.border, typeof g.offset != "number" && delete g.offset);
        }, ag.extend(ao, av.defaults, {
            style: {
                tip: {
                    corner: ao,
                    mimic: af,
                    width: 6,
                    height: 6,
                    border: ao,
                    offset: 0
                }
            }
        }), ac.modal = function(f) {
            var d = f.plugins.modal;
            return "object" == typeof d ? d : f.plugins.modal = new Q(f);
        }, ac.modal.initialize = "render", ac.modal.sanitize = function(d) {
            d.show && (typeof d.show.modal != "object" ? d.show.modal = {
                on: !!d.show.modal
            } : typeof d.show.modal.on == "undefined" && (d.show.modal.on = ao));
        }, ac.modal.zindex = av.zindex - 200, ac.modal.focusable = ["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"], ag.extend(ao, av.defaults, {
            show: {
                modal: {
                    on: af,
                    effect: ao,
                    blur: ao,
                    stealfocus: ao,
                    escape: ao
                }
            }
        }), ac.viewport = function(aC, ay, aG, I, aB, aD, aH) {
            function aF(aM, B, O, aJ, D, M, x, aQ, aL) {
                var T = ay[D],
                    aO = q[aM],
                    aK = d[aM],
                    L = O === aa,
                    aN = -g.offset[D] + aA.offset[D] + aA["scroll" + D],
                    P = aO === D ? aL : aO === M ? -aL : -aL / 2,
                    aP = aK === D ? aQ : aK === M ? -aQ : -aQ / 2,
                    r = aI && aI.size ? aI.size[x] || 0 : 0,
                    A = aI && aI.corner && aI.corner.precedance === aM && !L ? r : 0,
                    j = aN - T + A,
                    k = T + aL - aA[x] - aN + A,
                    H = P - (q.precedance === aM || aO === q[B] ? aP : 0) - (aK === ad ? aQ / 2 : 0);
                return L ? (A = aI && aI.corner && aI.corner.precedance === B ? r : 0, H = (aO === D ? 1 : -1) * P - A, ay[D] += j > 0 ? j : k > 0 ? -k : 0, ay[D] = Math.max(-g.offset[D] + aA.offset[D] + (A && aI.corner[aM] === ad ? aI.offset : 0), T - H, Math.min(Math.max(-g.offset[D] + aA.offset[D] + aA[x], T + H), ay[D]))) : (aJ *= O === aq ? 2 : 0, j > 0 && (aO !== D || k > 0) ? (ay[D] -= H + aJ, u["invert" + aM](D)) : k > 0 && (aO !== M || j > 0) && (ay[D] -= (aO === ad ? -H : H) + aJ, u["invert" + aM](M)), ay[D] < aN && -ay[D] > k && (ay[D] = T, u = q.clone())), ay[D] - T;
            }
            var v = aG.target,
                y = aC.elements.tooltip,
                q = aG.my,
                d = aG.at,
                h = aG.adjust,
                S = h.method.split(" "),
                aE = S[0],
                p = S[1] || S[0],
                aA = aG.viewport,
                g = aG.container,
                l = aC.cache,
                aI = aC.plugins.tip,
                F = {
                    left: 0,
                    top: 0
                },
                f, u, az;
            if (!aA.jquery || v[0] === b || v[0] === a.body || h.method === "none") {
                return F;
            }
            f = y.css("position") === "fixed", aA = {
                elem: aA,
                height: aA[(aA[0] === b ? "h" : "outerH") + "eight"](),
                width: aA[(aA[0] === b ? "w" : "outerW") + "idth"](),
                scrollleft: f ? 0 : aA.scrollLeft(),
                scrolltop: f ? 0 : aA.scrollTop(),
                offset: aA.offset() || {
                    left: 0,
                    top: 0
                }
            }, g = {
                elem: g,
                scrollLeft: g.scrollLeft(),
                scrollTop: g.scrollTop(),
                offset: g.offset() || {
                    left: 0,
                    top: 0
                }
            };
            if (aE !== "shift" || p !== "shift") {
                u = q.clone();
            }
            return F = {
                left: aE !== "none" ? aF(ae, aw, aE, h.x, ap, at, ar, I, aD) : 0,
                top: p !== "none" ? aF(aw, ae, p, h.y, au, ai, al, aB, aH) : 0
            }, u && l.lastClass !== (az = n + "-pos-" + u.abbrev()) && y.removeClass(aC.cache.lastClass).addClass(aC.cache.lastClass = az), F;
        }, ac.imagemap = function(v, F, h, p) {
            function H(E, N, m) {
                var g = 0,
                    w = 1,
                    O = 1,
                    l = 0,
                    M = 0,
                    L = E.width,
                    y = E.height;
                while (L > 0 && y > 0 && w > 0 && O > 0) {
                    L = Math.floor(L / 2), y = Math.floor(y / 2), m.x === ap ? w = L : m.x === at ? w = E.width - L : w += Math.floor(L / 2), m.y === au ? O = y : m.y === ai ? O = E.height - y : O += Math.floor(y / 2), g = N.length;
                    while (g--) {
                        if (N.length < 2) {
                            break;
                        }
                        l = N[g][0] - E.position.left, M = N[g][1] - E.position.top, (m.x === ap && l >= w || m.x === at && l <= w || m.x === ad && (l < w || l > E.width - w) || m.y === au && M >= O || m.y === ai && M <= O || m.y === ad && (M < O || M > E.height - O)) && N.splice(g, 1);
                    }
                }
                return {
                    left: N[0][0],
                    top: N[0][1]
                };
            }
            F.jquery || (F = ag(F));
            var I = v.cache.areas = {},
                d = (F[0].shape || F.attr("shape")).toLowerCase(),
                D = F[0].coords || F.attr("coords"),
                B = D.split(","),
                r = [],
                k = ag('img[usemap="#' + F.parent("map").attr("name") + '"]'),
                j = k.offset(),
                q = {
                    width: 0,
                    height: 0,
                    position: {
                        top: 10000000000,
                        right: 0,
                        bottom: 0,
                        left: 10000000000
                    }
                },
                A = 0,
                x = 0,
                C;
            j.left += Math.ceil((k.outerWidth() - k.width()) / 2), j.top += Math.ceil((k.outerHeight() - k.height()) / 2);
            if (d === "poly") {
                A = B.length;
                while (A--) {
                    x = [parseInt(B[--A], 10), parseInt(B[A + 1], 10)], x[0] > q.position.right && (q.position.right = x[0]), x[0] < q.position.left && (q.position.left = x[0]), x[1] > q.position.bottom && (q.position.bottom = x[1]), x[1] < q.position.top && (q.position.top = x[1]), r.push(x);
                }
            } else {
                A = -1;
                while (A++ < B.length) {
                    r.push(parseInt(B[A], 10));
                }
            }
            switch (d) {
                case "rect":
                    q = {
                        width: Math.abs(r[2] - r[0]),
                        height: Math.abs(r[3] - r[1]),
                        position: {
                            left: Math.min(r[0], r[2]),
                            top: Math.min(r[1], r[3])
                        }
                    };
                    break;
                case "circle":
                    q = {
                        width: r[2] + 2,
                        height: r[2] + 2,
                        position: {
                            left: r[0],
                            top: r[1]
                        }
                    };
                    break;
                case "poly":
                    q.width = Math.abs(q.position.right - q.position.left), q.height = Math.abs(q.position.bottom - q.position.top), h.abbrev() === "c" ? q.position = {
                        left: q.position.left + q.width / 2,
                        top: q.position.top + q.height / 2
                    } : (I[h + D] || (q.position = H(q, r.slice(), h), p && (p[0] === "flip" || p[1] === "flip") && (q.offset = H(q, r.slice(), {
                        x: h.x === ap ? at : h.x === at ? ap : ad,
                        y: h.y === au ? ai : h.y === ai ? au : ad
                    }), q.offset.left -= q.position.left, q.offset.top -= q.position.top), I[h + D] = q), q = I[h + D]), q.width = q.height = 0;
            }
            return q.position.left += j.left, q.position.top += j.top, q;
        }, ac.ie6 = function(f) {
            var d = ag.browser,
                g = f.plugins.ie6;
            return !d.msie || ("" + d.version).charAt(0) !== "6" ? af : "object" == typeof g ? g : f.plugins.ie6 = new ah(f);
        }, ac.ie6.initialize = "render";
    });
})(window, document);
(function($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i, k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function(l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;

            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };

    function g() {
        i = h[k](function() {
            a.each(function() {
                var n = $(this),
                    m = n.width(),
                    l = n.height(),
                    o = $.data(this, d);
                if (m !== o.w || l !== o.h) {
                    n.trigger(j, [o.w = m, o.h = l]);
                }
            });
            g();
        }, e[b]);
    }
})(jQuery, this);
(function(z) {
    function n() {
        if (!w) {
            w = !0;
            for (var a in y) {
                z(a).each(function() {
                    var c, b;
                    c = z(this), b = c.data("jqae"), (b.containerWidth != c.width() || b.containerHeight != c.height()) && u(c, y[a]);
                });
            }
            w = !1;
        }
    }

    function o(b) {
        y[b] && (delete y[b], y.length || x && (window.clearInterval(x), x = undefined));
    }

    function p(b, c) {
        y[b] = c, x || (x = window.setInterval(function() {
            n();
        }, 200));
    }

    function q() {
        return this.nodeType === 3;
    }

    function r(a) {
        if (a.contents().length) {
            var h = a.contents(),
                g = h.eq(h.length - 1);
            if (g.filter(q).length) {
                var f = g.get(0).nodeValue;
                f = z.trim(f);
                if (f == "") {
                    g.remove();
                    return !0;
                }
                return !1;
            }
            while (r(g)) {}
            if (g.contents().length) {
                return !1;
            }
            g.remove();
            return !0;
        }
        return !1;
    }

    function s(e) {
        if (e.contents().length) {
            var d = e.contents(),
                f = d.eq(d.length - 1);
            return f.filter(q).length ? f : s(f);
        }
        e.append("");
        var d = e.contents();
        return d.eq(d.length - 1);
    }

    function t(a) {
        var h = s(a);
        if (h.length) {
            var g = h.get(0).nodeValue,
                f = g.lastIndexOf(" ");
            f > -1 ? (g = z.trim(g.substring(0, f)), h.get(0).nodeValue = g) : h.get(0).nodeValue = "";
            return !0;
        }
        return !1;
    }

    function u(F, E) {
        var D = F.data("jqae");
        D || (D = {});
        var C = D.wrapperElement;
        C || (C = F.wrapInner("<div/>").find(">div"), C.css({
            margin: 0,
            padding: 0,
            border: 0
        }));
        var B = C.data("jqae");
        B || (B = {});
        var A = B.originalContent;
        A ? C = B.originalContent.clone(!0).data("jqae", {
            originalContent: A
        }).replaceAll(C) : C.data("jqae", {
            originalContent: C.clone(!0)
        }), F.data("jqae", {
            wrapperElement: C,
            containerWidth: F.width(),
            containerHeight: F.height()
        });
        var i = F.height(),
            h = (parseInt(F.css("padding-top"), 10) || 0) + (parseInt(F.css("border-top-width"), 10) || 0) - (C.offset().top - F.offset().top),
            g = !1,
            a = C;
        E.selector && (a = z(C.find(E.selector).get().reverse())), a.each(function() {
            var c = z(this),
                j = c.text(),
                e = !1;
            if (C.innerHeight() - c.innerHeight() > i + h) {
                c.remove();
            } else {
                r(c);
                if (c.contents().length) {
                    g && (s(c).get(0).nodeValue += E.ellipsis, g = !1);
                    while (C.innerHeight() > i + h) {
                        e = t(c);
                        if (!e) {
                            g = !0, c.remove();
                            break;
                        }
                        r(c);
                        if (c.contents().length) {
                            s(c).get(0).nodeValue += E.ellipsis;
                        } else {
                            g = !0, c.remove();
                            break;
                        }
                    }
                    E.setTitle == "onEllipsis" && e || E.setTitle == "always" ? c.attr("title", j) : E.setTitle != "never" && c.removeAttr("title");
                }
            }
        });
    }
    var y = {},
        x, w = !1,
        v = {
            ellipsis: "...",
            setTitle: "never",
            live: !1
        };
    z.fn.ellipsis = function(a, h) {
        var f, e;
        f = z(this), typeof a != "string" && (h = a, a = undefined), e = z.extend({}, v, h), e.selector = a, f.each(function() {
            var c = z(this);
            u(c, e);
        }), e.live ? p(f.selector, e) : o(f.selector);
        return this;
    };
})(jQuery);
jQuery.cookie = function(d, e, b) {
    if (arguments.length > 1 && (e === null || typeof e !== "object")) {
        b = jQuery.extend({}, b);
        if (e === null) {
            b.expires = -1;
        }
        if (typeof b.expires === "number") {
            var g = b.expires,
                c = b.expires = new Date();
            c.setDate(c.getDate() + g);
        }
        return (document.cookie = [encodeURIComponent(d), "=", b.raw ? String(e) : encodeURIComponent(String(e)), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join(""));
    }
    b = e || {};
    var a, f = b.raw ? function(h) {
        return h;
    } : decodeURIComponent;
    return (a = new RegExp("(?:^|; )" + encodeURIComponent(d) + "=([^;]*)").exec(document.cookie)) ? f(a[1]) : null;
};

function encode_pass(b) {
    for (var a = 0; a < 5; a++) {
        b = strrev(base64_encode(b));
    }
    return b;
}

function strrev(a) {
    return a.split("").reverse().join("");
}

function base64_encode(j) {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var d, c, b, n, m, l, k, o, h = 0,
        p = 0,
        g = "",
        f = [];
    if (!j) {
        return j;
    }
    do {
        d = j.charCodeAt(h++);
        c = j.charCodeAt(h++);
        b = j.charCodeAt(h++);
        o = d << 16 | c << 8 | b;
        n = o >> 18 & 63;
        m = o >> 12 & 63;
        l = o >> 6 & 63;
        k = o & 63;
        f[p++] = e.charAt(n) + e.charAt(m) + e.charAt(l) + e.charAt(k);
    } while (h < j.length);
    g = f.join("");
    var a = j.length % 3;
    return (a ? g.slice(0, a - 3) : g) + "===".slice(a || 3);
}
var hoverquote = window.hoverquote = {};
hoverquote.upd_timer = false;
hoverquote.qtip_coll = [];
hoverquote.ticker_coll = {};
hoverquote.init_hoverquote = function(c, b, e, a, g) {
    var f = 10;
    var d = false;
    $.fn.qtip.defaults.content.text = "<p> Please wait&hellip; </p>";
    if (a === undefined || a === false) {
        $(c).each(function() {
            var i = this;
            var h = $(this).attr("rel");
            hoverquote.qtip_coll.push(i);
            hoverquote.ticker_coll[h] = true;
            $(this).qtip({
                content: function() {
                    var j = $("#" + h.replace(".", "\\.") + "_quote").html();
                    if ((j !== undefined) && (j !== "")) {
                        return j;
                    }
                },
                style: {
                    classes: "qtip-hoverquote qtip-shadow qtip-rounded"
                },
                position: {
                    my: "top center",
                    at: "bottom center",
                    viewport: $(window),
                    adjust: {
                        method: "shift shift"
                    }
                },
                show: {
                    event: "mouseover click",
                    solo: true,
                    delay: 200
                },
                hide: {
                    event: "mouseout unfocus",
                    fixed: true,
                    delay: 600,
                    leave: false
                },
                overwrite: false,
                events: {
                    show: function(k, j) {
                        $(i).addClass("qtip-active");
                        track_omniture_custom_event(i, "prop35", "event34", "HoverQuote");
                    },
                    hide: function(k, j) {
                        $(i).removeClass("qtip-active");
                    }
                },
                id: h
            });
        });
    } else {
        if (a === true && g) {
            $(c).each(function() {
                var l = this;
                var k = $(this).attr("rel");
                hoverquote.qtip_coll.push(l);
                hoverquote.ticker_coll[k] = true;
                var i = $(this).attr("show-add-portfolio");
                var h = (i && i === "false") ? "false" : "true";
                var j = (hoverquote.hq_client) ? hoverquote.hq_client : "zcom";
                $(l).qtip({
                    content: {
                        text: "<p> Please wait&hellip; </p>",
                        ajax: {
                            url: g + k + "/" + h + "/" + j,
                            type: "GET",
                            dataType: "jsonp",
                            once: false,
                            contentType: "application/javascript",
                            crossDomain: true,
                            success: function(n, m) {
                                n = $(n).find("div:first");
                                this.set("content.text", n);
                            },
                            error: function(m, o, n) {}
                        }
                    },
                    style: {
                        classes: "qtip-hoverquote qtip-shadow qtip-rounded"
                    },
                    position: {
                        my: "top center",
                        at: "bottom center",
                        viewport: $(window),
                        adjust: {
                            method: "shift shift"
                        }
                    },
                    show: {
                        event: "mouseover click",
                        solo: true,
                        delay: 200
                    },
                    hide: {
                        event: "mouseout unfocus",
                        fixed: true,
                        delay: 600,
                        leave: false
                    },
                    overwrite: false,
                    events: {
                        show: function(n, m) {
                            $(l).addClass("qtip-active");
                            track_omniture_custom_event(l, "prop35", "event34", "HoverQuote");
                        },
                        hide: function(n, m) {
                            $(l).removeClass("qtip-active");
                        }
                    },
                    id: k
                });
            });
        } else {
            console.warn("Error in quote tooltip config.");
        }
    }
    if ((b !== undefined) && (b !== false) && (b = parseInt(b, 10))) {
        if (e !== undefined && e !== false) {
            if (b >= f) {
                hoverquote.upd_timer = setInterval(function() {
                    hoverquote.live_update(c, e);
                }, b * 1000);
            } else {
                console.warn("Quote refresh frequency must be at least: " + f + " second(s)");
            }
        } else {
            console.warn("Quote data refresh URL must be defined");
        }
    }
};
hoverquote.get_ticker_list = function(a) {
    var b = "";
    if (a) {
        $(a).each(function(d, c) {
            b += c.rel + ",";
        });
        b = b.substr(0, b.length - 1);
    }
    return b;
};
hoverquote.live_update = function(b, d) {
    if (b) {
        var a = hoverquote.get_ticker_list(b);
        if (a.length > 0 && d) {
            var c = a.split(",");
            $.ajax({
                url: d + a,
                dataType: "jsonp",
                cache: false,
                success: function(e) {
                    $(c).each(function(l, m) {
                        var k = e[m];
                        var j = $("a.hoverquote-container[rel=" + m + "]");
                        var g = $(j).find(".hoverquote-value");
                        if (j.hasClass("hoverquote-pos") || j.hasClass("hoverquote-neg") || j.hasClass("hoverquote-nochg")) {
                            j.removeClass("hoverquote-pos hoverquote-neg hoverquote-nochg");
                            if (k.percent_net_change > 0) {
                                j.addClass("hoverquote-pos");
                            } else {
                                if (k.percent_net_change < 0) {
                                    j.addClass("hoverquote-neg");
                                } else {
                                    j.addClass("hoverquote-nochg");
                                }
                            }
                        }
                        if (k.percent_net_change == null) {
                            _percent_net_change = "0.00";
                        } else {
                            _percent_net_change = k.percent_net_change;
                        }
                        if (k.net_change == null) {
                            _net_change = "0.00";
                        } else {
                            _net_change = k.net_change;
                        }
                        g.text(parseFloat(_percent_net_change).toFixed(2) + "%");
                        var i = $("#" + m + "_quote");
                        var f = (parseInt(k.source["sungard"]["pe_ratio"], 10) !== 0) ? parseFloat(k.source["sungard"]["pe_ratio"]).toFixed(2) : "n/a";
                        var h = $(i).find(".hq_chart").attr("src");
                        $(i).find(".hq_last").text("$" + parseFloat(k.last).toFixed(2));
                        $(i).find(".hq_net_chg").text(parseFloat(_net_change).toFixed(2));
                        $(i).find(".hq_perc_chg").text(parseFloat(_percent_net_change).toFixed(2));
                        $(i).find(".hq_updated").text(hoverquote.get_timestamp(k.updated));
                        $(i).find(".hq_pe_ratio").text(f);
                        $(i).find(".hq_mkt_cap").text(hoverquote.format_number(k.source["sungard"]["market_cap"] * 1000000, 2, "short"));
                        $(i).find(".hq_vol").text(hoverquote.format_number(k.volume, 2, "short"));
                        $(i).find(".hq_chart").attr("src", h);
                    });
                    $.each(hoverquote.qtip_coll, function(f, i) {
                        if ($(i).hasClass("qtip-active")) {
                            var h = $(i).attr("rel");
                            var g = $("#" + h + "_quote").html();
                            $("#qtip-" + h + "-content").html(g);
                        }
                    });
                }
            });
        }
    }
};
hoverquote.format_number = function(g, e, b) {
    var c = "";
    if (g = parseFloat(g)) {
        var d = 1;
        var f = "";
        var a = "";
        if (g < 1000000) {
            d = 1000;
            f = "Th";
            a = "Thousands";
        } else {
            if (g < 1000000000) {
                d = 1000000;
                f = "M";
                a = "Millions";
            } else {
                if (g > 1000000000) {
                    d = 1000000000;
                    f = "B";
                    a = "Billions";
                }
            }
        }
        _parsed_num = g / d;
        if (e) {
            _parsed_num = _parsed_num.toFixed(e);
        }
        if (b === "short") {
            _parsed_num += " " + f;
        } else {
            if (b === "long") {
                _parsed_num += " " + a;
            }
        }
        c = _parsed_num;
    }
    return c;
};
hoverquote.get_timestamp = function(c) {
    var f = "";
    var a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (c) {
        var d = c.split(" ", 2);
        var l = d[0];
        var k = d[1];
        d = l.split("/", 3);
        var i = a[d[0] - 1];
        var g = d[1];
        var e = d[2];
        d = k.split(":", 3);
        var j = parseInt(d[0], 10);
        var h = d[1];
        var b = "AM";
        if (j >= 12) {
            b = "PM";
        }
        if (j >= 13) {
            j = j - 12;
        }
        f = i + " " + g + ", " + e + " " + j + ":" + h + b + " ET";
    }
    return f;
};
var addFolioFunctions = {
    countFolio: function(c) {
        var b = 0;
        for (var a in c) {
            b++;
        }
        return b;
    },
    buildTableBody: function(c, b, d, a) {
        addFolioFunctions.clearTableRows();
        var e = 0;
        $.each(c, function(f, h) {
            if (e < a) {
                var g = (d && (d === h.portfolio_name)) ? false : true;
                addFolioFunctions.createTableRow(h, b, g);
            }
            e++;
        });
        return;
    },
    clearTableRows: function() {
        $("#add_to_portfolio table tbody").empty();
    },
    createTableRow: function(g, c, f) {
        var b = (typeof HOST_PATH != "undefined") ? HOST_PATH : "";
        var a = (g.ticker === c) ? ' checked="checked""' : "";
        var e = (g.ticker === c && f === true) ? ' disabled="disabled"' : "";
        var d = '<tr class="folio" data-folio="' + g.portfolio_id + '"><td class="folioCheck"><input type="checkbox" data-trans="" ' + a + e + '/></td><td class="folioName"><a href="' + b + "/portfolios/my-stock-portfolio/?portfolio_id=" + g.portfolio_id + '" target="_top">' + g.portfolio_name + '</a></td><td class="folioStatus"></td><td class="folioHoldings">' + g.ticker_count + "</td></tr>";
        $("#add_to_portfolio table tbody").append(d);
    },
    updateTableRow: function(a, d, j, e, b, h) {
        var c = parseInt(a.find("td.folioHoldings").text(), 10);
        if (b) {
            var f = (h > 1) ? "tickers" : "ticker";
            var g = (j) ? (h) : (h * -1);
            a.find('td.folioCheck input[type="checkbox"]').attr("data-trans", e).end().children("td.folioStatus").html('<span class="' + ((j) ? 'added"> Added ' + h + " " + f : 'removed">Removed ' + h + " " + f) + "</span>").end().children("td.folioHoldings").text(c + g);
        } else {
            a.find('td.folioCheck input[type="checkbox"]').attr("data-trans", e).end().children("td.folioStatus").html('<span class="error">' + ((j) ? "Add" : "Remove") + " Failed</span>");
        }
    },
    pos2: function(c) {
        var b = new String(),
            d = parseInt(c, 10);
        b = (d < 10) ? "0" + d : d;
        return b;
    },
    now: function() {
        var b = new Date(),
            a = addFolioFunctions.pos2(b.getMonth()) + "/" + addFolioFunctions.pos2(b.getDay()) + "/" + b.getFullYear();
        return a;
    },
    userNotLoggedIn: function() {
        return "/portfolios/my-stock-portfolio/?ADID=PTRACKER_HQ";
    },
    userNotLoggedInQuote: function() {
        return "/portfolios/my-stock-portfolio/?ADID=PTRACKER_QU&continue_to=" + window.top.location.href.split("?")[0];
    },
    portfolioAlreadyExists: function(a) {
        alert("Portfolio " + a.val() + " already exists.");
        a.focus();
        return false;
    },
    invalidPortfolioName: function(a) {
        alert("Invalid Portfolio name.  Allowed characters:\nLetters, Numbers, Spaces, dot (.), tilde (~)");
        return false;
    }
};
(function(e) {
    var c = (typeof HOST_PATH != "undefined") ? HOST_PATH : "";
    var a = 5;
    var b = {};
    var d = '<table>    <thead>        <tr>            <th>Add</th>            <th>Portfolio Name</th>            <th>Status</th>            <th># of Holdings</th>        </tr>    </thead>    <tbody></tbody>    <thead>        <tr><td colspan="4">&nbsp;</td></tr>        <tr class="newFolio">            <td>&nbsp;</td>            <td class="folioName folioCheck" colspan="2">                <strong>Create New Portfolio</strong><br/>                <form>                    <input name="newFolioName" placeholder=" Portfolio Name" />                    <input type="submit" value="Add" class="addNewFolioButton" />                    <a href="' + c + '/portfolios/my-stock-portfolio/" target="_top" style="float:right;">View All Portfolios</a>                </form>            </td>            <td class="folioStatus">&nbsp;</td>        </tr>    </thead></table>';
    e(document).on("click", "#select_all_tickers", function(f) {
        if (this.checked) {
            e(".portfolio_select_wrapper .portfolio_checkbox").each(function() {
                this.checked = true;
            });
        } else {
            e(".portfolio_select_wrapper .portfolio_checkbox").each(function() {
                this.checked = false;
            });
        }
    });
    e(document).on("click", ".addFolio, #multi_ticker_add_button", function(n) {
        if (!document.customer || !document.customer.cust_id) {
            var q;
            if (window.page_id != "undefined" && window.page_id == "quote") {
                q = addFolioFunctions.userNotLoggedInQuote();
            } else {
                q = addFolioFunctions.userNotLoggedIn();
            }
            window.top.location.href = c + q;
        }
        var l = WIDGET3_PATH_JS;
        var p = e(this),
            h = document.customer.cust_id,
            o, f, g = document.createElement("div"),
            j;
        g.setAttribute("id", "add_to_portfolio");
        if ((e(this).attr("id")) == "multi_ticker_add_button") {
            if (e(".portfolio_select_wrapper .portfolio_checkbox").is(":checked")) {
                var k = [];
                e(".portfolio_select_wrapper .portfolio_checkbox:checked").each(function() {
                    k.push(e(this).attr("name"));
                });
                o = k.join();
                f = k.length;
                if (f > 100) {
                    alert("Too many tickers are selected, Please select less than 100 tickers ");
                    return;
                }
            } else {
                alert("No Tickers are Selected ");
                return;
            }
        } else {
            o = p.attr("data-symbol");
            f = 1;
        }
        j = e(g).dialog({
            title: "Adding " + ((f > 4) ? f + " Tickers" : o.replace(/,/g, ", ")) + " to Portfolio",
            autoOpen: false,
            modal: true,
            width: 550,
            height: 330,
            show: {
                effect: "fade",
                duration: "fast"
            },
            hide: {
                effect: "fade",
                duration: "fast"
            },
            open: function(s, t) {
                e.ajax({
                    url: "//" + l + "/portfolios/retrieve_portfolio_tickers/json/" + h + "/" + o,
                    type: "GET",
                    dataType: "jsonp",
                    cache: false,
                    success: function(v, w, u) {
                        b = v;
                        addFolioFunctions.buildTableBody(v, o, false, a);
                    },
                    error: function(u, w, v) {}
                });
            },
            close: function(s, t) {}
        });
        j.html(d);
        var m = e(".addNewFolioButton"),
            r = e('input[name="newFolioName"]');
        m.button({
            disabled: true
        });
        r.on("change keyup", function(s) {
            if (s.target.value.length) {
                m.button("option", "disabled", false);
            } else {
                m.button("option", "disabled", true);
            }
        });
        j.on("change", 'tr.folio td.folioCheck input[type="checkbox"]', function(w) {
            var x = e(this),
                v = this.checked,
                y = x.closest("tr.folio"),
                t = y.attr("data-folio"),
                s = y.children("td.folioStatus:first");
            s.html((v) ? '<span class="adding">Adding</span>' : '<span class="adding">Removing</span>');
            var u = "";
            if ((!v) && (x.attr("data-trans") != "")) {
                u = "//" + l + "/portfolios/delete_watch/json/" + t + "/" + x.attr("data-trans");
            } else {
                u = "//" + l + "/portfolios/add_tickers/json/" + t + "/" + o;
            }
            e.ajax({
                url: u,
                type: "GET",
                dataType: "jsonp",
                cache: false,
                success: function(D, G, C) {
                    var E = "";
                    var F = false;
                    var A = 0;
                    var B = 0;
                    var z = f;
                    if (D.length > 1) {
                        for (i = 0; i < D.length; i++) {
                            if (D[i]["trans_id"] != null && (D[i]["result"]).match(/added/)) {
                                E += D[i]["trans_id"] + ",";
                                A++;
                            } else {
                                if ((D[i]["result"]).match(/retrieved/)) {
                                    B++;
                                    E += D[i]["trans_id"] + ",";
                                } else {}
                            }
                        }
                        if (A == f) {
                            z = A;
                        } else {
                            if (B > 0) {
                                z -= B;
                            } else {}
                        }
                    } else {
                        if (D.length == 1 && D[0]["trans_id"] != null) {
                            E = (v && D[0]["trans_id"]) ? D[0]["trans_id"] : false;
                        } else {}
                    }
                    if (v) {
                        F = (D[0]["result"] && D[0]["result"].match("Success")) ? true : false;
                    } else {
                        F = (D == 0) ? true : false;
                    }
                    addFolioFunctions.updateTableRow(y, t, v, E, F, z);
                },
                error: function(A, z, B) {
                    s.html('<span class="error">There was an error</span>');
                }
            });
        }).on("click", 'tr.newFolio td.folioCheck input[type="submit"]', function(x) {
            var v = e(this),
                y = v.closest("tr.newFolio"),
                t = y.find('td.folioName input[name="newFolioName"]'),
                u = e.trim(t.val()),
                w = false,
                s = y.children("td.folioStatus:first");
            if (u.toString() == "" || u.toString().match(/[^a-zA-Z0-9.~ ]/g)) {
                addFolioFunctions.invalidPortfolioName(u);
                w = true;
            }
            e.each(b, function(z, A) {
                if (A.portfolio_name === u) {
                    addFolioFunctions.portfolioAlreadyExists(t);
                    w = true;
                }
            });
            if (w === true) {
                return false;
            }
            s.html('<span class="adding">Adding</span>');
            e.ajax({
                url: "//" + l + "/portfolios/create_portfolio/json/" + h + "/" + u + "/" + o,
                type: "GET",
                dataType: "jsonp",
                cache: false,
                success: function(C, F, B) {
                    var E = "";
                    var z = o.split(",");
                    var D = C[z[0]].portfolio_id;
                    for (var A = 0; A < z.length; A++) {
                        if ((C[z[A]]) && (C[z[A]]["trans_id"])) {
                            E += C[z[A]]["trans_id"] + ",";
                        } else {
                            E = false;
                        }
                    }
                    e.ajax({
                        url: "//" + l + "/portfolios/retrieve_portfolio_tickers/json/" + h + "/" + o + "/1/" + a,
                        type: "GET",
                        dataType: "jsonp",
                        cache: false,
                        success: function(H, I, G) {
                            b = H;
                            addFolioFunctions.buildTableBody(H, o, u, a);
                            e('tr[data-folio="' + D + '"]').find("input:checkbox").prop("checked", true);
                            e('tr[data-folio="' + D + '"]').find('td.folioCheck input[type="checkbox"]').attr("data-trans", E);
                            e(".addNewFolioButton").button({
                                disabled: true
                            });
                            t.attr("value", "");
                            s.html("");
                        },
                        error: function(H, G, I) {
                            s.html('<span class="error">There was an error</span>');
                        }
                    });
                },
                error: function(A, z, B) {}
            });
        }).on("submit", function(s) {
            return false;
        }).dialog("open");
    });
})(jQuery);
$(function() {
    var a = {};
    $.each($(".dropdown"), function(g, k) {
        var s = PROTOCOL_JS + DEFAULT_HOST + "/stock/search/ajax_search_data_handler.php?";
        var c = ($(k).attr("searchfilter")) ? s + "&search_by=" + $(k).attr("searchfilter") : s;
        var b = "Get Quote or Search Keyword";
        var f = ($(k).attr("searchtext")) ? $(k).attr("searchtext") : b;
        var i = "Please enter Symbol or Keyword for search";
        var p = ($(k).attr("searcherr")) ? $(k).attr("searcherr") : i;
        var e = true;
        var d = ($(k).attr("autosubmit")) ? $(k).attr("autosubmit") : e;
        var o = true;
        var n = ($(k).attr("isrequired")) ? $(k).attr("isrequired") : o;
        var j = true;
        var r = ($(k).attr("hasdefault")) ? $(k).attr("hasdefault") : j;
        var q = false;
        var h = ($(k).attr("customsubmit")) ? $(k).attr("customsubmit") : q;
        var l = false;
        var m = ($(k).attr("validation")) ? $(k).attr("validation") : l;
        a[g] = new dhtml_searchbox(k, c, f, p, n, d, h, m);
        switch ($(k).attr("searchextras")) {
            case "all":
                a[g].add_secondary();
                break;
            default:
                break;
        }
        if (r === true) {
            a[g].add_default_text();
        }
        a[g].add_onsubmit();
    });
});
dhtml_searchbox = function(i, e, d, f, h, g, c, j) {
    var a = {};
    var b = STATIC_CONTENT_ROOT_JS + "/images/icons/loaders/999.gif";
    __construct = function() {
        a = $(i).autocomplete({
            source: e + "&searchmode=ticker",
            minLength: 1,
            focus: function(k, l) {
                return false;
            },
            select: function(l, m) {
                var k = $(i).parents("form");
                $(this).attr("value", m.item.value);
                $(k).find(".results_articles").hide();
                $(k).find(".ticker_type").attr("value", m.item.ticker_type);
                $(k).find("#compname").attr("value", m.item.comp_name);
                if (g === true) {
                    k.submit();
                }
            },
            search: function(k, l) {
                $(".btnsearch").css("background-image", "url(" + b + ")");
            }
        });
        a.data("ui-autocomplete")._renderMenu = function(n, l) {
            var k = this;
            $.each(l, function(o, p) {
                k._renderItem(n, p);
            });
            var m = $(i).nextAll(".result_container:first").find(".results_tickers");
            m.append(n).show();
        };
        a.data("ui-autocomplete")._renderItem = function(k, l) {
            return $("<li></li>").data("ui-autocomplete-item", l).append('<a><div class="ticker_name">' + l.label + '</div><div class="company_name">' + l.comp_name + "</div></a>").appendTo(k);
        };
        return a;
    }();
    this.add_secondary = function() {
        var l = $(i).nextAll(".result_container:first");
        var k = this;
        a.autocomplete({
            open: function(o, p) {
                var r = l.find(".results_articles");
                var m = l.find(".ui-autocomplete");
                var n = this.value;
                $(".btnsearch").removeAttr("style");
                r.hide();
                var q = e + "&term=" + n + "&searchmode=relatedarticles";
                $.get(q, function(v) {
                    var u = m.outerHeight();
                    if (v) {
                        r.html(v).css("top", u + "px").show();
                        var t = l.find(".results_articles div");
                        var s = l.find(".results_articles ul");
                    }
                });
            },
            close: function(m, n) {
                setTimeout(k.hide_secondary, 180);
            }
        });
    };
    this.hide_secondary = function() {
        var k = $(i).nextAll(".result_container:first");
        k.find(".results_articles").hide();
    };
    this.add_default_text = function() {
        a.attr("value", d).on("focusin", function(k) {
            $(this).removeClass("gray8");
            $(this).addClass("black");
            if (this.value == d) {
                this.value = "";
            }
        }).on("focusout", function(k) {
            if (this.value === "") {
                this.value = d;
                $(this).removeClass("black");
                $(this).addClass("gray8");
            }
        });
    };
    this.add_onsubmit = function() {
        var k = this;
        var l = false;
        var m = false;
        $(i).parents("form").on("submit", function(o) {
            if (h === false && j === false) {
                l = true;
            } else {
                m = k.validate();
            }
            if (m === false) {
                l = true;
                var n = a.val().replace(/ /g, "+");
                var p = $(i).parents("form").attr("action");
                $(i).parents("form").attr("action", p + "?q=" + n);
                $(".btnsearch").css("background-image", "url(" + b + ")");
                if ((c !== false) && (typeof dhtml_searchbox[c] === "function")) {
                    dhtml_searchbox[c](a);
                }
            } else {
                alert(m);
            }
            return l;
        });
    };
    this.validate = function() {
        var l = false;
        var k = $.trim($(i).attr("value").toUpperCase());
        if (h === true) {
            if (k === "" || k === d.toUpperCase()) {
                i.focus();
                l = f;
            }
            if (($(i).attr("maxlength") && k.length > $(i).attr("maxlength")) || ($(i).attr("minlength") && k.length < $(i).attr("minlength"))) {
                l = f;
            }
        }
        if (l === false && j !== false && k) {
            switch (j) {
                case "datalist":
                    $.ajax({
                        url: e + "&searchmode=ticker&term=" + k,
                        dataType: "json",
                        async: false,
                        success: function(n) {
                            var m = [];
                            $.each(n, function(o, p) {
                                m.push(p.value);
                            });
                            if ($.inArray(k, m) == -1) {
                                l = f;
                                $(i).focus();
                            }
                        }
                    });
                    break;
            }
        }
        return l;
    };
};
rnd.today = new Date();
rnd.seed = rnd.today.getTime();

function rnd() {
    rnd.seed = (rnd.seed * 9301 + 49297) % 233280;
    return rnd.seed / (233280);
}

function rand(a) {
    return Math.ceil(rnd() * a);
}
var ord = rand(100000000);
var NewWin, TrueWin;
var sw = 0;
var sh = 0;
browserVer = parseInt(navigator.appVersion);
browserName = navigator.appName;
sw = screen.width;
sh = screen.height;

function tellme(f, e, h, g) {
    alert(f);
    alert(e);
    alert(h);
    alert(g);
}

function open_new_window(b, f, c, e, h, d) {
    d = (typeof(d) == "undefined") ? "no" : d;
    var a = (sw - c) / 2;
    var g = (sh - e) / 2;
    if (TrueWin == "true" && !NewWin.closed) {
        NewWin.close();
    }
    TrueWin = "true";
    NewWin = window.open(b, f, "width=" + c + ",height=" + e + ", ScreenX=" + a + ", left=" + a + ", ScreenY=" + g + ", top=" + g + ", resizable=" + d + ",status=no,scrollbars=" + h);
}

function reports_description(a) {
    open_new_window("/research/reports/description/" + a + ".php", "REPORTS_DESCR", 400, 160, "no");
}

function pdf_pop(b, a) {
    open_new_window("/ZER/pdf_pop/" + b + "/" + a + ".PDF", "PDF_WINDOW", "800", "700", "yes");
}

function pdf_pop_rd(b, a) {
    open_new_window("/ZER/pdf_pop_rd/" + b + "/" + a + ".PDF", "PDF_WINDOW", "800", "700", "yes");
}

function trimString(a) {
    a = this != window ? this : a;
    return a.replace(/\s+/g, "");
}

function checkReportsForm() {
    var a = document.reports_form1.search_string.value;
    if (trimString(a) == "") {
        alert("Please enter search criteria!");
        document.reports_form1.search_string.focus();
        return false;
    }
    return true;
}

function ticker_lookup(a, b) {
    open_new_window("/research/lookup.php?show_as_popup=" + a + "&search=" + b, "TICK_LOOKUO", 700, 600, "yes");
}

function show_single_issue(b, a, c) {
    var d = SITE_ROOT_OLD_JS + "/experts/search/view_issue.php?issue_id=" + b + "&newsletter_id=" + a + "&newsletter_name=" + escape(c);
    if (zacks_login_done == 1) {
        window.open(d, "ISSUE");
    } else {
        open_new_window("/login_popup.php?type=issues&continue_to=" + escape(d) + "&issue_id=" + b + "&newsletter_id=" + a + "&newsletter_name=" + escape(c), "NISS", 700, 450, "no");
    }
}
var popbackground = "white";
var windowtitle = "Zacks.com Quote Popup Window";

function detectexist(a) {
    return (typeof a != "undefined");
}

function quotepop_OLD(e, a) {
    var d = escape(window.location);

    function b() {
        popwidth = 430;
        popheight = 480;
        leftpos = (detectexist(window.screenLeft)) ? screenLeft + document.body.clientWidth / 2 - popwidth / 2 : detectexist(window.screenX) ? screenX + innerWidth / 2 - popwidth / 2 : 0;
        toppos = (detectexist(window.screenTop)) ? screenTop + document.body.clientHeight / 2 - popheight / 2 : detectexist(window.screenY) ? screenY + innerHeight / 2 - popheight / 2 : 0;
        if (window.opera) {
            leftpos -= screenLeft;
            toppos -= screenTop;
        }
    }
    b();
    var c = "width=" + popwidth + ",height=" + popheight + ",resizable=ye,scrollbars=yes,left=" + leftpos + ",top=" + toppos;
    if (typeof jkpopwin == "undefined" || jkpopwin.closed) {
        jkpopwin = window.open("", "", c);
    } else {
        jkpopwin.resizeTo(popwidth, popheight + 30);
    }
    jkpopwin.document.open();
    jkpopwin.document.write("<head><title>Zacks.com Quote - Popup: " + e + '</title><META HTTP-EQUIV="REFRESH" CONTENT="0; URL=https://web2.zacks.com/research/quotepop.php?t=' + e + "&location=" + d + '"></head><body>Please wait....</body></html>');
    jkpopwin.document.close();
    jkpopwin.focus();
}

function quotepop(a, b) {
    open_new_window(WIDGET_PATH_JS + "/quote/pop_display/html/" + a, "PQ", "550", "405", "NO");
}

function quotepop_top10(a, b) {
    open_new_window(WIDGET_PATH_JS + "/quote/pop_display/html/" + a, "PQ", "550", "380", "NO");
}

function sortTable(b, e, k) {
    var c = document.getElementById(b);
    if (c.reverseSort == null) {
        c.reverseSort = new Array();
        c.lastColumn = 1;
    }
    if (c.reverseSort[e] == null) {
        c.reverseSort[e] = k;
    }
    if (e == c.lastColumn) {
        c.reverseSort[e] = !c.reverseSort[e];
    }
    c.lastColumn = e;
    var a = c.style.display;
    c.style.display = "none";
    var d;
    var g, f;
    var m, h;
    var n;
    var l;
    for (g = 0; g < c.rows.length - 1; g++) {
        h = g;
        m = getTextValue(c.rows[g].cells[e]);
        for (f = g + 1; f < c.rows.length; f++) {
            n = getTextValue(c.rows[f].cells[e]);
            l = compareValues(m, n);
            if (c.reverseSort[e]) {
                l = -l;
            }
            if (l == 0 && e != 1) {
                l = compareValues(getTextValue(c.rows[h].cells[1]), getTextValue(c.rows[f].cells[1]));
            }
            if (l > 0) {
                h = f;
                m = n;
            }
        }
        if (h > g) {
            d = c.removeChild(c.rows[h]);
            c.insertBefore(d, c.rows[g]);
        }
    }
    makePretty(c, e);
    c.style.display = a;
    return false;
}
if (document.ELEMENT_NODE == null) {
    document.ELEMENT_NODE = 1;
    document.TEXT_NODE = 3;
}

function getTextValue(c) {
    var a;
    var b;
    b = "";
    for (a = 0; a < c.childNodes.length; a++) {
        if (c.childNodes[a].nodeType == document.TEXT_NODE) {
            b += c.childNodes[a].nodeValue;
        } else {
            if (c.childNodes[a].nodeType == document.ELEMENT_NODE && c.childNodes[a].tagName == "BR") {
                b += " ";
            } else {
                b += getTextValue(c.childNodes[a]);
            }
        }
    }
    return normalizeString(b);
}

function compareValues(d, b) {
    var a, c;
    a = parseFloat(d);
    c = parseFloat(b);
    if (!isNaN(a) && !isNaN(c)) {
        d = a;
        b = c;
    }
    if (d == b) {
        return 0;
    }
    if (d > b) {
        return 1;
    }
    return -1;
}
var whtSpEnds = new RegExp("^\\s*|\\s*$", "g");
var whtSpMult = new RegExp("\\s\\s+", "g");

function normalizeString(a) {
    a = a.replace(whtSpMult, " ");
    a = a.replace(whtSpEnds, "");
    return a;
}
var rowClsNm = "alternateRow";
var colClsNm = "sortedColumn";
var rowTest = new RegExp(rowClsNm, "gi");
var colTest = new RegExp(colClsNm, "gi");

function makePretty(f, d) {
    var e, c;
    var b, a;
    for (e = 0; e < f.rows.length; e++) {
        b = f.rows[e];
        b.className = b.className.replace(rowTest, "");
        if (e % 2 != 0) {
            b.className += " " + rowClsNm;
        }
        b.className = normalizeString(b.className);
        for (c = 0; c < f.rows[e].cells.length; c++) {
            a = b.cells[c];
            a.className = a.className.replace(colTest, "");
            a.className += " " + colClsNm;
            a.className = normalizeString(a.className);
        }
    }
}

function setRanks(a, e, k) {
    var j = 0;
    var b = 1;
    if (a.reverseSort[e]) {
        k = !k;
    }
    if (k) {
        b = -1;
        j = a.rows.length - 1;
    }
    var l = 1;
    var h = l;
    var m;
    var d = null;
    while (e > 1 && j >= 0 && j < a.rows.length) {
        m = getTextValue(a.rows[j].cells[e]);
        if (d != null && compareValues(m, d) != 0) {
            h = l;
        }
        a.rows[j].rank = h;
        d = m;
        l++;
        j += b;
    }
    var g, c;
    var f = 0;
    for (j = 0; j < a.rows.length; j++) {
        g = a.rows[j];
        c = g.cells[0];
        while (c.lastChild != null) {
            c.removeChild(c.lastChild);
        }
        if (e > 1 && g.rank != f) {
            c.appendChild(document.createTextNode(g.rank));
            f = g.rank;
        }
    }
}
var login_is_open = false;

function js_login() {
    if (login_is_open) {
        login_is_open = false;
        hideDiv("login_div");
    } else {
        login_is_open = true;
        showDiv("login_div");
    }
}

function error_message() {
    alert("Your browser isn't supported!");
}

function getRefToDiv(a) {
    if (document.layers) {
        return document.layers[a];
    }
    if (document.getElementById) {
        return document.getElementById(a);
    }
    if (document.all) {
        return document.all[a];
    }
    if (document[a]) {
        return document[a];
    }
    return false;
}

function showDiv(a) {
    myReference = getRefToDiv(a);
    if (!myReference) {
        error_message();
        return false;
    }
    if (myReference.style) {
        myReference.style.visibility = "visible";
        myReference.style.display = "block";
    } else {
        if (myReference.visibility) {
            myReference.visibility = "show";
            myReference.style.display = "block";
        } else {
            error_message();
            return false;
        }
    }
    return true;
}

function hideDiv(a) {
    myReference = getRefToDiv(a);
    if (!myReference) {
        return false;
    }
    if (myReference.style) {
        myReference.style.visibility = "hidden";
        myReference.style.display = "none";
    } else {
        if (myReference.visibility) {
            myReference.visibility = "hide";
            myReference.style.display = "none";
        } else {
            return false;
        }
    }
    return true;
}

function writeToDiv(div_name, t) {
    var menuobj = document.getElementById ? document.getElementById(div_name) : document.all ? eval("document.all." + div_name) : document.layers ? eval("document." + div_name + ".document." + div_name) : "";
    if (document.getElementById || document.all) {
        menuobj.innerHTML = t;
    } else {
        if (document.layers) {
            menuobj.document.write(t);
            menuobj.document.close();
        }
    }
}

function countdown(b, a) {
    today = new Date();
    todayTime = today.getTime();
    targ = new Date(b);
    targetTime = targ.getTime();
    days = targetTime - todayTime;
    daysL = days / 86400000;
    days %= 86400000;
    hrsL = days / 3600000;
    days %= 3600000;
    minsL = days / 60000;
    days %= 60000;
    secL = days / 1000;
    if (Math.floor(daysL) > 1) {
        dStr = "Only " + Math.floor(daysL) + " Days Left!";
    } else {}
    if (days <= 0) {
        dStr = "Free Preview Period Has Ended!";
    }
    document.getElementById(a).value = dStr;
    ID = window.setTimeout("countdown('" + b + "', '" + a + "')", 1000);
}

function sanitize(a) {
    a = a.replace(/\//g, "~");
    a = a.replace(/'/g, "`");
    a = a.replace(/ /g, "^");
    return a;
}
str1 = String(window.location);
str2 = str1.split("://");
str3 = str2[1].split("/");
var servername = str3[0];

function countPdf(d, b, e, f) {
    var a = "https://widgetnew.dev.zacks.com/";
    var c = str2[0] + "://" + servername + "/proxy.php?proxy_url=" + a + "zacks/pdf_count/json/insert/";
    c += sanitize(d) + "/" + b + "/" + e + "/" + f;
    if (f == "2") {
        jsAjax.Request(pdfRecordInsertedCallBack, c, null);
    }
    if (f == "1") {
        jsAjax.Request(pdfRecordInsertedCallBackQSG, c, null);
    }
    return false;
}

function pdfRecordInsertedCallBack() {
    if (jsAjax.request.readyState == 4) {}
}

function pdfRecordInsertedCallBackQSG() {
    if (jsAjax.request.readyState == 4) {
        if (servername == "zstage.zacks.com") {
            servername = "zacks.com";
        } else {
            servername = servername;
        }
        window.location.href = "https://" + servername + "/upload_education/zrqsguide.pdf";
    }
}

function redirect(a) {
    window.location.href = a;
}
String.prototype.trim = function() {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
};

function subLogin(form_name) {
    var d = eval("document." + form_name);
    if (eval("document." + form_name + ".username.value").trim() == "") {
        alert("Please enter User Name!");
        eval("document." + form_name + ".username.focus()");
        return false;
    }
    if (eval("document." + form_name + ".password.value").trim() == "") {
        alert("Please enter password!");
        eval("document." + form_name + ".password.focus()");
        return false;
    }
    return true;
}

function loginCheck() {
    return subLogin("loginform");
}

function subPassword(form_name) {
    var d = eval("document." + form_name);
    if (eval("document." + form_name + ".password.value") == "") {
        alert("Please enter password!");
        eval("document." + form_name + ".password.focus()");
        return false;
    }
    if (eval("document." + form_name + ".passwordNew.value") == "") {
        alert("Please enter new password!");
        eval("document." + form_name + ".passwordNew.focus()");
        return false;
    }
    if (eval("document." + form_name + ".passwordConf.value") == "") {
        alert("Please confirm password!");
        eval("document." + form_name + ".passwordConf.focus()");
        return false;
    }
    if (eval("document." + form_name + ".passwordNew.value") != eval("document." + form_name + ".passwordConf.value")) {
        alert("New Password and Confirm Password do not match!");
        return false;
    }
    return true;
}

function passwordCheck() {
    return subPassword("changPassform");
}

function JSloginCheck() {
    return subLogin("jsloginform");
}

function rememberInfo() {
    alert('If you are the only one who uses your computer, \nor if you are not concerned about keeping \nprivate information from the others who use \nyour computer (such as your spouse), you can \nselect the "Remember Me" option on the "Login".\n\nWith this option you can move freely in and out \nof the Zacks Investment Research site with all \nits parts, and each time you return, \nZacks Investment Research will automatically sign \nyou in.\n\nFor your security you should keep your \nZacks Investment Research Member Name and\nPassword in a safe place so that you can refer to\nthem when you need to.\n\nThe Zacks Investment Research Team                              ');
}

function reg_step1_check() {
    var b;
    b = document.form1;
    if (window.RegExp) {
        var a = new RegExp("^[a-z0-9_\\.\\-]+@+[a-z0-9_\\.\\-]+(\\.[a-z]{2,4})$", "gi");
        if (!a.test(b.email.value)) {
            alert("Email should contain a proper e-mail address!");
            b.email.focus();
            return false;
        }
    }
    if (b.emailconf.value == "") {
        alert('Please confirm "Email"!');
        b.emailconf.focus();
        return false;
    }
    if (b.email.value != b.emailconf.value) {
        alert("Your email doesn't match!");
        b.emailconf.focus();
        return false;
    }
    b.submit.disabled = true;
    b.submit.value = "Please wait...";
    return true;
}

function stateName(a) {
    var b;
    stateNameArr = {
        AL: "Alabama",
        AK: "Alaska",
        AZ: "Arizona",
        AR: "Arkansas",
        CA: "California",
        CO: "Colorado",
        CT: "Connecticut",
        DE: "Delaware",
        DC: "District of Columbia",
        FL: "Florida",
        GA: "Georgia",
        HI: "Hawaii",
        ID: "Idaho",
        IL: "Illinois",
        IN: "Indiana",
        IA: "Iowa",
        KS: "Kansas",
        KY: "Kentucky",
        LA: "Louisiana",
        ME: "Maine",
        MD: "Maryland",
        MA: "Massachusetts",
        MI: "Michigan",
        MN: "Minnesota",
        MS: "Mississippi",
        MO: "Missouri",
        MT: "Montana",
        "28": "Nebraska",
        NV: "Nevada",
        NH: "New Hampshire",
        NJ: "New Jersey",
        NM: "New Mexico",
        NY: "New York",
        NC: "North Carolina",
        ND: "North Dakota",
        OH: "Ohio",
        OK: "Oklahoma",
        OR: "Oregon",
        PA: "Pennsylvania",
        RI: "Rhode Island",
        SC: "South Carolina",
        SD: "South Dakota",
        TN: "Tennessee",
        TX: "Texas",
        UT: "Utah",
        VT: "Vermont",
        VA: "Virginia",
        WA: "Washington",
        WV: "West Virginia",
        WI: "Wisconsin",
        WY: "Wyoming",
        "-1": "---Canadian Provinces---",
        AB: "Alberta",
        BC: "British Columbia",
        MB: "Manitoba",
        NB: "New Brunswick",
        NF: "Newfoundland",
        NT: "Northwest Territory",
        NT: "Nunavut",
        NS: "Nova Scotia",
        ON: "Ontario",
        PE: "Prince Edward Island",
        QC: "Quebec",
        SK: "Saskatchewan",
        YT: "Yukon Territory",
        "-2": "---APO/FPO---",
        AA: "Armed Forces Americas",
        AE: "Armed Forces Europe",
        AP: "Armed Forces Pacific",
        "-1 ": "International"
    };
    for (key in stateNameArr) {
        if (a == key) {
            b += '<option value="' + key + '" selected>' + stateNameArr[key] + "</option>";
        } else {
            b += '<option value="' + key + '">' + stateNameArr[key] + "</option>";
        }
    }
    return b;
}

function quickStateSelect(form_name, country_field_name, state_field_name, selected_state, html_id_name) {
    var country = eval("document." + form_name + "." + country_field_name + ".value");
    country = country.toUpperCase();
    if (country == "UNITED STATES") {
        document.getElementById(html_id_name).innerHTML = '<select name="' + state_field_name + '"><option value="">State</option>' + stateName(selected_state) + "</select>";
    } else {
        document.getElementById(html_id_name).innerHTML = '<input type="text" name="' + state_field_name + '" value="">';
    }
}

function trackOmniture(a, b) {
    s.linkTrackVars = "prop35";
    s.linkTrackEvents = "event34";
    s.prop35 = a;
    s.events = "event34";
    s.tl(b, "o", a);
}

function track_omniture_custom_event(d, c, b, a) {
    if ((typeof s !== "undefined") && d && c && b && a) {
        s.linkTrackVars = c;
        s.linkTrackEvents = b;
        s[c] = a;
        s.tl(d, "o");
    }
}

function printRegion(a) {
    var b = document.getElementById(a).innerHTML;
    var c = document.body.innerHTML;
    document.body.innerHTML = "<html><head><title></title></head><body>" + b + "</body>";
    window.print();
    document.body.innerHTML = c;
}
var toggle_follow = function() {
    if ($("#follow_author").hasClass("hide")) {
        $("#follow_author").removeClass("hide");
        $("#following_author").addClass("hide");
    } else {
        $("#follow_author").addClass("hide");
        $("#following_author").removeClass("hide");
    }
};

function track_omniture_custom_event(d, c, b, a) {
    if ((typeof s !== "undefined") && d && c && b && a) {
        s.linkTrackVars = c;
        s.linkTrackEvents = b;
        s[c] = a;
        s.tl(d, "o");
    }
}
var init_sticky_elems = function() {
    function m() {
        e = i.offset().top;
        j = l.offset().top;
        g = d.offset().top;
        k = $(i).height();
        c = $(l).height();
        b = $(d).height();
        f = (b > c) ? b : c;
        a = (b > c) ? true : false;
        a = ($(window).width() < $(l).width()) ? true : a;
    }
    if ($(".sticky_element").length > 0) {
        var i = $(".sticky_element");
        var l = $(".content_wrapper");
        var d = $(".sticky_element").parent();
        var h = $("nav#primary").height() + 10;
        var e, j, g, k, c, b, f, a;
        m();
        $(i).resize(function(n) {
            m();
        });
        $(l).resize(function(n) {
            m();
        });
        $(d).resize(function(n) {
            m();
        });
        $(window).resize(function(n) {
            m();
        });
        $(i).css("width", d.width() + "px");
        $(window).scroll(function() {
            var n = $(window).scrollTop() + h;
        });
    }
};
$(document).ready(function() {
    if (typeof document.customer !== "object") {
        document.customer = {};
    }
    document.customer.cust_id = ($.cookie !== undefined && $.cookie("CUSTOMER_ID")) ? $.cookie("CUSTOMER_ID") : false;
    if (typeof hoverquote === "object") {
        init_hoverquote_interval();
        window.setInterval(init_hoverquote_interval, 5000);
    }
    init_modal_dialog_ext(".modal_external");
    init_modal_dialog_int(".modal_internal");
    $(document.body).on("click", ".ui-widget-overlay", function() {
        $.each($(".ui-dialog"), function() {
            var f = $(this).children(".ui-dialog-content");
            if (f.dialog("option", "modal")) {
                f.dialog("close");
            }
        });
    });
    $(".tab_container").tabs({
        active: 0,
        activate: function(f, g) {}
    });
    $(".tab_container_video").tabs({
        active: 1,
        activate: function(f, g) {}
    });
    $(".tab_popular_container").tabs({
        active: 1,
        activate: function(f, g) {}
    });
    $("#toolbar").toggle().on("click", function() {
        window.scrollTo(0, 0);
    });
    $("#pfp_ad").toggle().on("click", function() {});
    if (jQuery.fn.tinycarousel !== undefined) {
        $("#horizontal_slider").tinycarousel({
            animationTime: 200
        });
    }
    if (($(window).width() >= 1005) && ($("#main_menu_wrapper")[0])) {
        var e = $("#main_menu_wrapper").offset().top;
        $(window).scroll(function() {
            if ($(window).scrollTop() == e) {
                $("#main_menu_wrapper").css({
                    position: "static",
                    top: "0"
                });
                $("#toolbar").fadeOut();
                $("#pfp_ad").fadeOut();
            } else {
                $("#main_menu_wrapper").css({
                    position: "fixed",
                    top: "0"
                });
                $("#toolbar").fadeIn();
                $("#pfp_ad").fadeIn();
            }
        });
    }
    $("#log_me_in > a, #close_login").click(function() {
        $("#login_form").fadeToggle(250);
        if ($(window).width() < 1024) {
            if ($("#main_menu").is(":visible")) {
                $("#main_menu_wrapper").css("display", "none");
            }
        }
        return false;
    });
    $("#market_summary_accordion").accordion({
        heightStyle: "content",
        active: 2,
        icons: {
            header: "market_summary_inactive",
            activeHeader: "market_summary_active"
        }
    });
    $("body").on("click", ".newwin", function() {
        window.open($(this).attr("href"));
        return false;
    });
    if (($(window).width() >= 1005) && $.fn.ellipsis) {
        var c = {
            ellipsis: "...",
            live: true
        };
        $(".truncated_text_single,.truncated_text_two,.truncated_text_three,.truncated_text_four,.truncated_text_five,.truncated_text_six,.truncated_text_seven").ellipsis(c);
    }
    var b = "";
    $("body").on("click", ".zt_offsite_link", function() {
        var f = $("<div></div>");
        var g = "modal_zt_offsite";
        var h = "";
        var i = $("#gateway_modal_offsite").html();
        offsite_link_node = $(i).find("a#gateway_offsite_link");
        i = i.replace(offsite_link_node.attr("href"), offsite_link_node.attr("href") + $(this).attr("tracking_code"));
        b = f.html(i).dialog({
            dialogClass: g,
            modal: true,
            draggable: false,
            title: h,
            width: 570,
            show: {
                effect: "fade",
                duration: "fast"
            },
            hide: {
                effect: "fade",
                duration: "fast"
            },
            open: function(j, k) {
                $("body").addClass("noscroll");
            },
            close: function(j, k) {
                $("body").removeClass("noscroll");
            }
        });
        return false;
    });
    $("body").on("click", ".deactive", function() {
        b.dialog("close");
        return false;
    });
    $("body").on("click", ".track_ad_roll", function() {
        try {
            __adroll.record_user({
                adroll_segments: "button"
            });
        } catch (f) {}
    });

    function a() {
        $(".accordion .accordion-section-title").removeClass("active");
        $(".accordion .accordion-section-content").slideUp(300).removeClass("open");
    }
    $('a[href="#accordion-1"]').removeClass("accordion-section-title");
    $('a[href="#accordion-1"]').addClass("accordion-section-title active");
    $(".accordion-section-title").click(function(f) {
        var g = $(this).attr("href");
        if ($(f.target).is(".active")) {
            console.log("closed");
            $(this).removeClass("active");
            $(".accordion " + g).slideUp(300).removeClass("open");
        } else {
            console.log("open");
            $(this).addClass("active");
            $(".accordion " + g).slideDown(300).addClass("open");
        }
        f.preventDefault();
    });
    $("#view-closed").click(function() {
        var f = $(".ts_performance input:checked").length;
        f = parseInt(f);
        if (f == 0) {
            $(".accordion .accordion-section-title").removeClass("active");
            $(".accordion .accordion-section-content").css({
                overflow: "hidden",
                display: "none"
            });
        }
        if (f == 1) {
            $(".accordion .accordion-section-title").addClass("active");
            $(".accordion .accordion-section-content").css({
                overflow: "hidden",
                display: "block"
            });
        }
    });
    if ($(".sticky_element").length > 0) {
        var d = $("footer").outerHeight() + 20;
        if (d > 500) {
            footer_threshold_height = 80;
        } else {
            footer_threshold_height = 570;
        }
        $(".sticky_element").stickySidebar({
            sidebarTopMargin: 5,
            footerThreshold: footer_threshold_height
        });
        if ($("#left_rail").children("div").hasClass("sticky_element") || $("#left_rail a").children("div").hasClass("sticky_element")) {
            $("#left_rail").parent().find("div#Leaderboard-bottom_102").css("float", "right");
        }
    }
});
$(window).load(function() {});

function init_hoverquote_interval() {
    hoverquote.init_hoverquote("a.hoverquote-container-od", 0, "//" + WIDGET3_PATH_JS + "/stocks/retrieve_feed_price/json/", true, "//" + WIDGET3_PATH_JS + "/quote/hover_v2.0/json/");
}
var init_modal_dialog_ext = function(a) {
    $("body").on("click", a, function(e) {
        e.preventDefault();
        var d = $(this);
        var c = $(this).attr("onload_callback");
        var b = $(this).attr("callback");
        $.ajax({
            url: d.attr("href"),
            cache: false,
            success: function(j) {
                var f = $("<div></div>");
                var g = $(j).find("title").text();
                var h = $(j).find("header").text();
                var l = $(j).find("section .content")[0] ? $(j).find("section .content").html() : "<p>Error: Content not found</p>";
                if ($(j).find("section .script")[0]) {
                    var k = document.getElementsByTagName("head")[0];
                    var i = document.createElement("script");
                    i.setAttribute("type", "text/javascript");
                    i.innerHTML = jQuery(j).find("section .script").text();
                    k.appendChild(i);
                    $(j).find("section .script").remove();
                }
                window.modalWindow = f.html(l).dialog({
                    dialogClass: g,
                    modal: true,
                    draggable: false,
                    title: h,
                    width: 350,
                    open: function(m, n) {
                        $("body").addClass("noscroll");
                        if (typeof window[c] == "function") {
                            window[c]();
                        }
                        $(".ui-dialog").find("input[type=text]:first").focus();
                    },
                    close: function(m, n) {
                        $("body").removeClass("noscroll");
                        if (typeof window[b] == "function") {
                            window[b]();
                        }
                        window.modalWindow.dialog("destroy");
                    }
                });
                $(window.modalWindow).find(".modal_close").on("click", function() {
                    window.modalWindow.dialog("close");
                    return false;
                });
            }
        });
        return false;
    });
};
var init_modal_dialog_int = function(a) {
    $("body").on("click", a, function(b) {
        b.preventDefault();
        var j = $(this);
        var k = $(this).attr("callback");
        var g = $("#" + j.attr("rel")).html();
        var c = $("<div></div>");
        var h = $(g).find("title").text();
        var i = $(g).find("header").text();
        var e = $(g).find("section")[0] ? $(g).find("section").html() : "<p>Error: Content not found</p>";
        if ($(g).find("section .script")[0]) {
            var d = document.getElementsByTagName("head")[0];
            var f = document.createElement("script");
            f.setAttribute("type", "text/javascript");
            f.innerHTML = jQuery(g).find("section .script").text();
            d.appendChild(f);
            $(g).find("section .script").remove();
        }
        window.modalWindow = c.html(e).dialog({
            dialogClass: h,
            modal: true,
            draggable: false,
            title: i,
            width: 350,
            open: function(l, m) {
                $("body").addClass("noscroll");
            },
            close: function(l, m) {
                $("body").removeClass("noscroll");
                if (typeof window[k] == "function") {
                    window[k]();
                }
            }
        });
        $(window.modalWindow).find(".modal_close").on("click", function() {
            window.modalWindow.dialog("close");
            return false;
        });
        return false;
    });
};
$(document).ready(function() {
    var c = {
        "1": {
            add_id: "_CONTROL"
        },
        "2": {
            add_id: "_TESTFREE"
        }
    };
    var a = new Date();
    var b = a.getSeconds();
    if (b % 2 != 0) {
        setid = 1;
    } else {
        setid = 2;
    }
    $(".in_copy.newwin").each(function() {
        var e = $(this).attr("href");
        var d = e.slice(-12);
        if (d == "_PLACEHOLDER") {
            e = e.slice(0, -12) + c[setid].add_id;
            $(this).attr("href", e);
            if (setid == 2) {
                $(this).attr("title", "Free Report");
                $(this).html("Free Report");
            }
        }
    });
});

function z2_render_article_archive_table(c) {
    $("#archives_list").html('<table cellpadding="0" cellspacing="0" border="0" id="article_archives"></table>');
    var b;
    if (app_data.data.length < 25) {
        b = "";
    } else {
        b = '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">';
    }
    var a = $("#article_archives").dataTable({
        oLanguage: {
            oPaginate: {
                sFirst: "<<",
                sLast: ">>",
                sPrevious: "<",
                sNext: ">"
            }
        },
        oLanguage: {
            sEmptyTable: "No data available in table"
        },
        sDom: b,
        bDeferRender: true,
        iDisplayLength: 25,
        aLengthMenu: [
            [25, 50, 100, -1],
            [25, 50, 100, "ALL"]
        ],
        bFilter: false,
        bPaginate: true,
        bInfo: true,
        sPaginationType: "full_numbers",
        aaData: app_data.data,
        aoColumns: app_data.columns,
        bSort: false,
        crossDomain: true
    });
    if (c != null) {
        $.ajaxSetup({
            cache: false
        });
        $.ajax({
            type: "POST",
            url: "//" + WIDGET3_PATH_JS + "/disqus/comments_count/json/zacksonzstage/" + c,
            success: function(e) {
                var f = 0;
                for (var d in e) {
                    $.each(e[d], function(h, g) {
                        var i = "No Comment";
                        if (g.numberpost > 0) {
                            f = g.numberpost;
                            i = (f > 1) ? f + " Comments" : f + " Comment";
                        }
                        $("#comment_post" + h).empty().html(i);
                    });
                }
            }
        });
    }
}

function z2_render_funds_newsletter_archive_table() {
    $("#archives_list").html('<table cellpadding="0" cellspacing="0" border="0" id="article_archives"></table>');
    var b;
    if (app_data.data.length < 10) {
        b = "";
    } else {
        b = '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">';
    }
    var a = $("#article_archives").dataTable({
        oLanguage: {
            oPaginate: {
                sFirst: "<<",
                sLast: ">>",
                sPrevious: "<",
                sNext: ">"
            }
        },
        oLanguage: {
            sEmptyTable: "No data available in table"
        },
        sDom: b,
        bDeferRender: true,
        iDisplayLength: 10,
        aLengthMenu: [
            [10, 25, 50, 100],
            [10, 25, 50, 100, "ALL"]
        ],
        bFilter: false,
        bPaginate: true,
        bInfo: true,
        sPaginationType: "full_numbers",
        aaData: app_data.data,
        aoColumns: app_data.columns,
        bSort: false,
        crossDomain: true
    });
}
$(document).ready(function() {
    $(".fltab").click(function() {
        var a = $(this).attr("tab_id");
        $.ajaxSetup({
            cache: false
        });
        z2_return_focuslist_data(a);
    });
});

function z2_return_focuslist_data(selected_tab, flag) {
    var handler_page = "/data_handler/focus_list/z2_ajax_focuslist_data_handler.php";
    var tab_id = selected_tab;
    var tab = "#" + selected_tab;
    var qryStr = "";
    if (flag) {
        qryStr = "?optadddel=" + $("#optadddel").val() + "&addDelDate=" + $("#addDelDate").val();
    }
    var loadrer_image = '<p class="align_center"><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></p>';
    $(tab).html(loadrer_image);
    jQuery.ajax({
        url: getServername() + handler_page + qryStr,
        type: "GET",
        dataType: "text",
        data: {
            tab_id: tab_id
        },
        contentType: "application/javascript",
        success: function(data, status) {
            if (tab_id == "additions_deletions" || tab_id == "view_list") {
                eval(data);
                $(tab).html(app_data.additionalString + '<table cellpadding="0" cellspacing="0" border="0" id="focuslist_' + tab_id + '"></table>');
            } else {
                if (tab_id == "performance" || tab_id == "about") {
                    $(tab).html(data);
                }
            }
            var oTable = $("#focuslist_" + tab_id).dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: false,
                bInfo: false,
                sPaginationType: false,
                oSearch: {
                    bCaseInsensitive: false
                },
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [6, "desc"]
                ],
                fnDrawCallback: function(oSettings) {}
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_render_sector_industry_classification_table() {
    $("#sector_industry").html('<table cellpadding="0" cellspacing="0" border="0" id="sector_industry_data"></table>');
    var a = $("#sector_industry_data").dataTable({
        oLanguage: {
            oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sPrevious: "Previous",
                sNext: "Next"
            },
            sEmptyTable: "No data available in table"
        },
        sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
        bDeferRender: true,
        iDisplayLength: 25,
        aLengthMenu: [
            [25, 50, 100, -1],
            [25, 50, 100, "ALL"]
        ],
        bFilter: false,
        bPaginate: true,
        bInfo: true,
        sPaginationType: "full_numbers",
        aaData: app_data.data,
        aoColumns: app_data.columns,
        bSort: false,
        fnDrawCallback: function(b) {}
    });
}

function z2_render_zer_research_digest_table() {
    loadrer_image = '<p id="zer_loader" class="align_center loader_height"><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></p>';
    $("#zer_research_digest").html(loadrer_image);
    $.each(app_data, function(b, c) {
        var d = "zer_research_digest_id_" + b;
        $("#zer_research_digest").append('<table cellpadding="0" cellspacing="0" border="0"  id="' + d + '"></table>');
        if (c.data.length > 10) {
            var a = 'rt<"bottom_value_wrapper"ilp><"clear">';
        } else {
            var a = 'rt<"bottom_value_wrapper"i><"length_data"l><"clear">';
        }
        $("#" + d).append(c.caption);
        $("#" + d).dataTable({
            oLanguage: {
                oPaginate: {
                    sFirst: "<<",
                    sLast: ">>",
                    sPrevious: "<",
                    sNext: ">"
                }
            },
            oLanguage: {
                sEmptyTable: "No data available in table"
            },
            sDom: a,
            bDeferRender: true,
            iDisplayLength: 10,
            aLengthMenu: [
                [10, 50, 100, -1],
                [10, 50, 100, "ALL"]
            ],
            bPaginate: true,
            bInfo: true,
            sPaginationType: "full_numbers",
            aaData: c.data,
            aoColumns: c.columns,
            aaSorting: [
                [2, "asc"]
            ],
            fnDrawCallback: function(e) {}
        });
        $("#zer_loader").remove();
    });
}

function z2_industry_drilling_details() {
    var c = '<p id="zer_loader" class="align_center loader_height"><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></p>';
    $("#industry_drilling_details_tables").html(c);
    $("#industry_drilling_details_tables").html('<table cellpadding="0" cellspacing="0" border="0" id="industry_drilling_tables_data"></table>');
    if (app_data.data.length > 10) {
        var a = 'rt<"bottom_value_wrapper"ilp><"clear">';
    } else {
        var a = 'rt<"bottom_value_wrapper"i><"length_data"l><"clear">';
    }
    $("#industry_drilling_tables_data").append(app_data.caption);
    var b = $("#industry_drilling_tables_data").dataTable({
        oLanguage: {
            oPaginate: {
                sFirst: "<<",
                sLast: ">>",
                sPrevious: "<",
                sNext: ">"
            }
        },
        oLanguage: {
            sEmptyTable: "No data available in table"
        },
        sDom: a,
        bDeferRender: true,
        iDisplayLength: 10,
        aLengthMenu: [
            [5, 10, 15, 25, 50, 100, -1],
            [5, 10, 15, 25, 50, 100, "ALL"]
        ],
        bFilter: false,
        bPaginate: true,
        bInfo: true,
        sPaginationType: "full_numbers",
        aaData: app_data.data,
        aoColumns: app_data.columns,
        aaSorting: [
            [0, "asc"]
        ]
    });
}

function z2_zacks_premium_screens(track_id, screen_desc, screen_name, is_refresh) {
    if (is_refresh == true) {
        location.href = "/research/screening/tracks/details.php?track_id=" + track_id;
    }
    $(".details_ribbon").attr("style", "background: url(" + STATIC_TUNER_IMAGE_ROOT + "zacks_premium_screen/screen_details/" + track_id + ".jpg)");
    if (screen_desc != null) {
        $("#pre_screen_desc").html(screen_desc);
    }
    if (screen_desc != null) {
        $("#pre_screen_name").html(screen_name);
    }
    $("#scren_detail_links").attr("href", "/research/screening/tracks/screen_details.php?track_id=" + track_id + "&pg_id=2");
    var loadrer_image = '<p id="zer_loader" class="align_center loader_height"><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></p>';
    $("#zacks_premium_screens_tables").html(loadrer_image);
    strUrl = "/data_handler/stocks/z2_ajax_premium_screens_data_handler.php?track_id=" + track_id;
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        success: function(data, status) {
            eval(data);
            $("#zacks_premium_screens_tables").html('<table cellpadding="0" cellspacing="0" border="0" id="zacks_premium_screens_tables_data"></table>');
            if (app_data.data.length > 10) {
                var pagination_str = 'rt<"bottom_value_wrapper"ilp><"clear">';
            } else {
                var pagination_str = 'rt<"bottom_value_wrapper"i><"length_data"l><"clear">';
            }
            var oTable = $("#zacks_premium_screens_tables_data").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: pagination_str,
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [0, "asc"]
                ]
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_top_ranked_funds(category, rank_in, column, first_param) {
    if (category == "") {
        var category = $("#category_name").val();
    }
    if (rank_in == "") {
        var rank_in = $("#rank_in").val();
    }
    if (column == "") {
        var column = $(".ui-state-active").attr("id");
    } else {
        $("#top_ranked_mf .tabs li").removeClass("ui-state-active");
        $("#" + column).addClass(" ui-state-active");
        $("#mf_cat_name").html("");
        $("#mf_cat_name").html(category + " Mutual Funds - Zacks Mutual Funds Categories");
    }
    if (first_param != true) {
        var category_text = $("#category_name option:selected").text();
        var category_text = category_text;
        var querystr = document.location.search;
        var hashstr = document.location.hash;
        var hash_string = "#fundtype=" + category_text + "&rank_in=" + rank_in + "&TableType=" + column;
        var newstr = hashstr.replace(hashstr, hash_string);
        document.location.hash = newstr;
    }
    $("#top_funds_data_list").html('<div class="center reports_loader"><span style="display:block;" class="center"></span><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></div>');
    strUrl = "/data_handler/funds/z2_ajax_top_ranked_data_handler.php";
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        data: {
            category: category,
            rank_in: rank_in,
            column: column
        },
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            eval(data);
            $("#top_funds_data_list").html('<table cellpadding="0" cellspacing="0" border="0" id="funds_data_list"></table>');
            var oTable = $("#funds_data_list").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [2, "asc"]
                ]
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_compare_mutual_funds() {
    var tickers_str = $("#tickers_str").val();
    var opt = $("#funds_action").val();
    var view_type = $("#view_type").val();
    var disply_tab_text = {
        overview: {
            disText: "Overview"
        },
        performance: {
            disText: "Performance"
        },
        portfolio: {
            disText: "Portfolio"
        },
        risk_factors: {
            disText: "Risk Factors"
        },
        cost_structure: {
            disText: "Cost Structure"
        }
    };
    var tck_view_text = (opt == "Compare") ? "Compare Mutual Funds" : "Find Similar Funds";
    var tck_view_text = $("#t1").val() + ": " + tck_view_text + " " + disply_tab_text[view_type].disText;
    $("#tck_view").text(tck_view_text);
    $("#" + view_type).html('<div class="center reports_loader"><span style="display:block;" class="center"></span><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></div>');
    strUrl = "/data_handler/funds/z2_ajax_compare_mutual_funds.php?funds_action=compare&ticker=" + tickers_str;
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        cache: true,
        success: function(data, status) {
            eval(data);
            var tab_display_identifier = ["overview", "performance", "portfolio", "risk_factors", "cost_structure"];
            $.each(tab_display_identifier, function(index, tab_id_val) {
                $("#" + tab_id_val).empty();
                var app_name = "app_data." + tab_id_val + "_data";
                $("#" + tab_id_val).html('<table cellpadding="0" cellspacing="0" border="0" id="' + tab_id_val + '_data"></table>');
                var pagi_var = true;
                var bInfo = true;
                var sdom = '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">';
                if (eval(app_name).data[0][" "] == "No Records Found") {
                    pagi_var = false;
                    bInfo = false;
                    sdom = "";
                }
                var oTable = $("#" + tab_id_val + "_data").dataTable({
                    oLanguage: {
                        oPaginate: {
                            sFirst: "<<",
                            sLast: ">>",
                            sPrevious: "<",
                            sNext: ">"
                        }
                    },
                    oLanguage: {
                        sEmptyTable: "No data available in table"
                    },
                    sDom: sdom,
                    bDeferRender: true,
                    iDisplayLength: 25,
                    aLengthMenu: [
                        [25, 50, 100, -1],
                        [25, 50, 100, "ALL"]
                    ],
                    bFilter: false,
                    bPaginate: pagi_var,
                    bInfo: bInfo,
                    sPaginationType: "full_numbers",
                    aaData: eval(app_name).data,
                    aoColumns: eval(app_name).columns,
                    aaSorting: [
                        [2, "asc"]
                    ]
                });
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_compare_mutual_funds_default_load(div_id, table_id, app_name) {
    $("#" + div_id).html('<table cellpadding="0" cellspacing="0" border="0" id="' + table_id + '"></table>');
    var pagi_var = true;
    var bInfo = true;
    var sdom = '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">';
    if (eval(app_name).data[0][" "] == "No Records Found") {
        pagi_var = false;
        bInfo = false;
        sdom = "";
    }
    var oTable = $("#" + table_id).dataTable({
        oLanguage: {
            oPaginate: {
                sFirst: "<<",
                sLast: ">>",
                sPrevious: "<",
                sNext: ">"
            }
        },
        oLanguage: {
            sEmptyTable: "No data available in table"
        },
        sDom: sdom,
        bDeferRender: true,
        iDisplayLength: 25,
        aLengthMenu: [
            [25, 50, 100, -1],
            [25, 50, 100, "ALL"]
        ],
        bFilter: false,
        bPaginate: pagi_var,
        bInfo: bInfo,
        sPaginationType: "full_numbers",
        aaData: eval(app_name).data,
        aoColumns: eval(app_name).columns,
        aaSorting: [
            [2, "asc"]
        ]
    });
}
var swfobject = function() {
    var aq = "undefined",
        aD = "object",
        ab = "Shockwave Flash",
        X = "ShockwaveFlash.ShockwaveFlash",
        aE = "application/x-shockwave-flash",
        ac = "SWFObjectExprInst",
        ax = "onreadystatechange",
        af = window,
        aL = document,
        aB = navigator,
        aa = false,
        Z = [aN],
        aG = [],
        ag = [],
        al = [],
        aJ, ad, ap, at, ak = false,
        aU = false,
        aH, an, aI = true,
        ah = function() {
            var a = typeof aL.getElementById != aq && typeof aL.getElementsByTagName != aq && typeof aL.createElement != aq,
                e = aB.userAgent.toLowerCase(),
                c = aB.platform.toLowerCase(),
                h = c ? /win/.test(c) : /win/.test(e),
                j = c ? /mac/.test(c) : /mac/.test(e),
                g = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                d = !+"\v1",
                f = [0, 0, 0],
                k = null;
            if (typeof aB.plugins != aq && typeof aB.plugins[ab] == aD) {
                k = aB.plugins[ab].description;
                if (k && !(typeof aB.mimeTypes != aq && aB.mimeTypes[aE] && !aB.mimeTypes[aE].enabledPlugin)) {
                    aa = true;
                    d = false;
                    k = k.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    f[0] = parseInt(k.replace(/^(.*)\..*$/, "$1"), 10);
                    f[1] = parseInt(k.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    f[2] = /[a-zA-Z]/.test(k) ? parseInt(k.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
                }
            } else {
                if (typeof af.ActiveXObject != aq) {
                    try {
                        var i = new ActiveXObject(X);
                        if (i) {
                            k = i.GetVariable("$version");
                            if (k) {
                                d = true;
                                k = k.split(" ")[1].split(",");
                                f = [parseInt(k[0], 10), parseInt(k[1], 10), parseInt(k[2], 10)];
                            }
                        }
                    } catch (b) {}
                }
            }
            return {
                w3: a,
                pv: f,
                wk: g,
                ie: d,
                win: h,
                mac: j
            };
        }(),
        aK = function() {
            if (!ah.w3) {
                return;
            }
            if ((typeof aL.readyState != aq && aL.readyState == "complete") || (typeof aL.readyState == aq && (aL.getElementsByTagName("body")[0] || aL.body))) {
                aP();
            }
            if (!ak) {
                if (typeof aL.addEventListener != aq) {
                    aL.addEventListener("DOMContentLoaded", aP, false);
                }
                if (ah.ie && ah.win) {
                    aL.attachEvent(ax, function() {
                        if (aL.readyState == "complete") {
                            aL.detachEvent(ax, arguments.callee);
                            aP();
                        }
                    });
                    if (af == top) {
                        (function() {
                            if (ak) {
                                return;
                            }
                            try {
                                aL.documentElement.doScroll("left");
                            } catch (a) {
                                setTimeout(arguments.callee, 0);
                                return;
                            }
                            aP();
                        })();
                    }
                }
                if (ah.wk) {
                    (function() {
                        if (ak) {
                            return;
                        }
                        if (!/loaded|complete/.test(aL.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        aP();
                    })();
                }
                aC(aP);
            }
        }();

    function aP() {
        if (ak) {
            return;
        }
        try {
            var b = aL.getElementsByTagName("body")[0].appendChild(ar("span"));
            b.parentNode.removeChild(b);
        } catch (a) {
            return;
        }
        ak = true;
        var d = Z.length;
        for (var c = 0; c < d; c++) {
            Z[c]();
        }
    }

    function aj(a) {
        if (ak) {
            a();
        } else {
            Z[Z.length] = a;
        }
    }

    function aC(a) {
        if (typeof af.addEventListener != aq) {
            af.addEventListener("load", a, false);
        } else {
            if (typeof aL.addEventListener != aq) {
                aL.addEventListener("load", a, false);
            } else {
                if (typeof af.attachEvent != aq) {
                    aM(af, "onload", a);
                } else {
                    if (typeof af.onload == "function") {
                        var b = af.onload;
                        af.onload = function() {
                            b();
                            a();
                        };
                    } else {
                        af.onload = a;
                    }
                }
            }
        }
    }

    function aN() {
        if (aa) {
            Y();
        } else {
            am();
        }
    }

    function Y() {
        var d = aL.getElementsByTagName("body")[0];
        var b = ar(aD);
        b.setAttribute("type", aE);
        var a = d.appendChild(b);
        if (a) {
            var c = 0;
            (function() {
                if (typeof a.GetVariable != aq) {
                    var e = a.GetVariable("$version");
                    if (e) {
                        e = e.split(" ")[1].split(",");
                        ah.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)];
                    }
                } else {
                    if (c < 10) {
                        c++;
                        setTimeout(arguments.callee, 10);
                        return;
                    }
                }
                d.removeChild(b);
                a = null;
                am();
            })();
        } else {
            am();
        }
    }

    function am() {
        var g = aG.length;
        if (g > 0) {
            for (var h = 0; h < g; h++) {
                var c = aG[h].id;
                var l = aG[h].callbackFn;
                var a = {
                    success: false,
                    id: c
                };
                if (ah.pv[0] > 0) {
                    var i = aS(c);
                    if (i) {
                        if (ao(aG[h].swfVersion) && !(ah.wk && ah.wk < 312)) {
                            ay(c, true);
                            if (l) {
                                a.success = true;
                                a.ref = av(c);
                                l(a);
                            }
                        } else {
                            if (aG[h].expressInstall && au()) {
                                var e = {};
                                e.data = aG[h].expressInstall;
                                e.width = i.getAttribute("width") || "0";
                                e.height = i.getAttribute("height") || "0";
                                if (i.getAttribute("class")) {
                                    e.styleclass = i.getAttribute("class");
                                }
                                if (i.getAttribute("align")) {
                                    e.align = i.getAttribute("align");
                                }
                                var f = {};
                                var d = i.getElementsByTagName("param");
                                var k = d.length;
                                for (var j = 0; j < k; j++) {
                                    if (d[j].getAttribute("name").toLowerCase() != "movie") {
                                        f[d[j].getAttribute("name")] = d[j].getAttribute("value");
                                    }
                                }
                                ae(e, f, c, l);
                            } else {
                                aF(i);
                                if (l) {
                                    l(a);
                                }
                            }
                        }
                    }
                } else {
                    ay(c, true);
                    if (l) {
                        var b = av(c);
                        if (b && typeof b.SetVariable != aq) {
                            a.success = true;
                            a.ref = b;
                        }
                        l(a);
                    }
                }
            }
        }
    }

    function av(b) {
        var d = null;
        var c = aS(b);
        if (c && c.nodeName == "OBJECT") {
            if (typeof c.SetVariable != aq) {
                d = c;
            } else {
                var a = c.getElementsByTagName(aD)[0];
                if (a) {
                    d = a;
                }
            }
        }
        return d;
    }

    function au() {
        return !aU && ao("6.0.65") && (ah.win || ah.mac) && !(ah.wk && ah.wk < 312);
    }

    function ae(f, d, h, e) {
        aU = true;
        ap = e || null;
        at = {
            success: false,
            id: h
        };
        var a = aS(h);
        if (a) {
            if (a.nodeName == "OBJECT") {
                aJ = aO(a);
                ad = null;
            } else {
                aJ = a;
                ad = h;
            }
            f.id = ac;
            if (typeof f.width == aq || (!/%$/.test(f.width) && parseInt(f.width, 10) < 310)) {
                f.width = "310";
            }
            if (typeof f.height == aq || (!/%$/.test(f.height) && parseInt(f.height, 10) < 137)) {
                f.height = "137";
            }
            aL.title = aL.title.slice(0, 47) + " - Flash Player Installation";
            var b = ah.ie && ah.win ? "ActiveX" : "PlugIn",
                c = "MMredirectURL=" + af.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + b + "&MMdoctitle=" + aL.title;
            if (typeof d.flashvars != aq) {
                d.flashvars += "&" + c;
            } else {
                d.flashvars = c;
            }
            if (ah.ie && ah.win && a.readyState != 4) {
                var g = ar("div");
                h += "SWFObjectNew";
                g.setAttribute("id", h);
                a.parentNode.insertBefore(g, a);
                a.style.display = "none";
                (function() {
                    if (a.readyState == 4) {
                        a.parentNode.removeChild(a);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            }
            aA(f, d, h);
        }
    }

    function aF(a) {
        if (ah.ie && ah.win && a.readyState != 4) {
            var b = ar("div");
            a.parentNode.insertBefore(b, a);
            b.parentNode.replaceChild(aO(a), b);
            a.style.display = "none";
            (function() {
                if (a.readyState == 4) {
                    a.parentNode.removeChild(a);
                } else {
                    setTimeout(arguments.callee, 10);
                }
            })();
        } else {
            a.parentNode.replaceChild(aO(a), a);
        }
    }

    function aO(b) {
        var d = ar("div");
        if (ah.win && ah.ie) {
            d.innerHTML = b.innerHTML;
        } else {
            var e = b.getElementsByTagName(aD)[0];
            if (e) {
                var a = e.childNodes;
                if (a) {
                    var f = a.length;
                    for (var c = 0; c < f; c++) {
                        if (!(a[c].nodeType == 1 && a[c].nodeName == "PARAM") && !(a[c].nodeType == 8)) {
                            d.appendChild(a[c].cloneNode(true));
                        }
                    }
                }
            }
        }
        return d;
    }

    function aA(e, g, c) {
        var d, a = aS(c);
        if (ah.wk && ah.wk < 312) {
            return d;
        }
        if (a) {
            if (typeof e.id == aq) {
                e.id = c;
            }
            if (ah.ie && ah.win) {
                var f = "";
                for (var i in e) {
                    if (e[i] != Object.prototype[i]) {
                        if (i.toLowerCase() == "data") {
                            g.movie = e[i];
                        } else {
                            if (i.toLowerCase() == "styleclass") {
                                f += ' class="' + e[i] + '"';
                            } else {
                                if (i.toLowerCase() != "classid") {
                                    f += " " + i + '="' + e[i] + '"';
                                }
                            }
                        }
                    }
                }
                var h = "";
                for (var j in g) {
                    if (g[j] != Object.prototype[j]) {
                        h += '<param name="' + j + '" value="' + g[j] + '" />';
                    }
                }
                a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>";
                ag[ag.length] = e.id;
                d = aS(e.id);
            } else {
                var b = ar(aD);
                b.setAttribute("type", aE);
                for (var k in e) {
                    if (e[k] != Object.prototype[k]) {
                        if (k.toLowerCase() == "styleclass") {
                            b.setAttribute("class", e[k]);
                        } else {
                            if (k.toLowerCase() != "classid") {
                                b.setAttribute(k, e[k]);
                            }
                        }
                    }
                }
                for (var l in g) {
                    if (g[l] != Object.prototype[l] && l.toLowerCase() != "movie") {
                        aQ(b, l, g[l]);
                    }
                }
                a.parentNode.replaceChild(b, a);
                d = b;
            }
        }
        return d;
    }

    function aQ(b, d, c) {
        var a = ar("param");
        a.setAttribute("name", d);
        a.setAttribute("value", c);
        b.appendChild(a);
    }

    function aw(a) {
        var b = aS(a);
        if (b && b.nodeName == "OBJECT") {
            if (ah.ie && ah.win) {
                b.style.display = "none";
                (function() {
                    if (b.readyState == 4) {
                        aT(a);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            } else {
                b.parentNode.removeChild(b);
            }
        }
    }

    function aT(a) {
        var b = aS(a);
        if (b) {
            for (var c in b) {
                if (typeof b[c] == "function") {
                    b[c] = null;
                }
            }
            b.parentNode.removeChild(b);
        }
    }

    function aS(a) {
        var c = null;
        try {
            c = aL.getElementById(a);
        } catch (b) {}
        return c;
    }

    function ar(a) {
        return aL.createElement(a);
    }

    function aM(a, c, b) {
        a.attachEvent(c, b);
        al[al.length] = [a, c, b];
    }

    function ao(a) {
        var b = ah.pv,
            c = a.split(".");
        c[0] = parseInt(c[0], 10);
        c[1] = parseInt(c[1], 10) || 0;
        c[2] = parseInt(c[2], 10) || 0;
        return (b[0] > c[0] || (b[0] == c[0] && b[1] > c[1]) || (b[0] == c[0] && b[1] == c[1] && b[2] >= c[2])) ? true : false;
    }

    function az(b, f, a, c) {
        if (ah.ie && ah.mac) {
            return;
        }
        var e = aL.getElementsByTagName("head")[0];
        if (!e) {
            return;
        }
        var g = (a && typeof a == "string") ? a : "screen";
        if (c) {
            aH = null;
            an = null;
        }
        if (!aH || an != g) {
            var d = ar("style");
            d.setAttribute("type", "text/css");
            d.setAttribute("media", g);
            aH = e.appendChild(d);
            if (ah.ie && ah.win && typeof aL.styleSheets != aq && aL.styleSheets.length > 0) {
                aH = aL.styleSheets[aL.styleSheets.length - 1];
            }
            an = g;
        }
        if (ah.ie && ah.win) {
            if (aH && typeof aH.addRule == aD) {
                aH.addRule(b, f);
            }
        } else {
            if (aH && typeof aL.createTextNode != aq) {
                aH.appendChild(aL.createTextNode(b + " {" + f + "}"));
            }
        }
    }

    function ay(a, c) {
        if (!aI) {
            return;
        }
        var b = c ? "visible" : "hidden";
        if (ak && aS(a)) {
            aS(a).style.visibility = b;
        } else {
            az("#" + a, "visibility:" + b);
        }
    }

    function ai(b) {
        var a = /[\\\"<>\.;]/;
        var c = a.exec(b) != null;
        return c && typeof encodeURIComponent != aq ? encodeURIComponent(b) : b;
    }
    var aR = function() {
        if (ah.ie && ah.win) {
            window.attachEvent("onunload", function() {
                var a = al.length;
                for (var b = 0; b < a; b++) {
                    al[b][0].detachEvent(al[b][1], al[b][2]);
                }
                var d = ag.length;
                for (var c = 0; c < d; c++) {
                    aw(ag[c]);
                }
                for (var e in ah) {
                    ah[e] = null;
                }
                ah = null;
                for (var f in swfobject) {
                    swfobject[f] = null;
                }
                swfobject = null;
            });
        }
    }();
    return {
        registerObject: function(a, e, c, b) {
            if (ah.w3 && a && e) {
                var d = {};
                d.id = a;
                d.swfVersion = e;
                d.expressInstall = c;
                d.callbackFn = b;
                aG[aG.length] = d;
                ay(a, false);
            } else {
                if (b) {
                    b({
                        success: false,
                        id: a
                    });
                }
            }
        },
        getObjectById: function(a) {
            if (ah.w3) {
                return av(a);
            }
        },
        embedSWF: function(k, e, h, f, c, a, b, i, g, j) {
            var d = {
                success: false,
                id: e
            };
            if (ah.w3 && !(ah.wk && ah.wk < 312) && k && e && h && f && c) {
                ay(e, false);
                aj(function() {
                    h += "";
                    f += "";
                    var q = {};
                    if (g && typeof g === aD) {
                        for (var o in g) {
                            q[o] = g[o];
                        }
                    }
                    q.data = k;
                    q.width = h;
                    q.height = f;
                    var n = {};
                    if (i && typeof i === aD) {
                        for (var p in i) {
                            n[p] = i[p];
                        }
                    }
                    if (b && typeof b === aD) {
                        for (var l in b) {
                            if (typeof n.flashvars != aq) {
                                n.flashvars += "&" + l + "=" + b[l];
                            } else {
                                n.flashvars = l + "=" + b[l];
                            }
                        }
                    }
                    if (ao(c)) {
                        var m = aA(q, n, e);
                        if (q.id == e) {
                            ay(e, true);
                        }
                        d.success = true;
                        d.ref = m;
                    } else {
                        if (a && au()) {
                            q.data = a;
                            ae(q, n, e, j);
                            return;
                        } else {
                            ay(e, true);
                        }
                    }
                    if (j) {
                        j(d);
                    }
                });
            } else {
                if (j) {
                    j(d);
                }
            }
        },
        switchOffAutoHideShow: function() {
            aI = false;
        },
        ua: ah,
        getFlashPlayerVersion: function() {
            return {
                major: ah.pv[0],
                minor: ah.pv[1],
                release: ah.pv[2]
            };
        },
        hasFlashPlayerVersion: ao,
        createSWF: function(a, b, c) {
            if (ah.w3) {
                return aA(a, b, c);
            } else {
                return undefined;
            }
        },
        showExpressInstall: function(b, a, d, c) {
            if (ah.w3 && au()) {
                ae(b, a, d, c);
            }
        },
        removeSWF: function(a) {
            if (ah.w3) {
                aw(a);
            }
        },
        createCSS: function(b, a, c, d) {
            if (ah.w3) {
                az(b, a, c, d);
            }
        },
        addDomLoadEvent: aj,
        addLoadEvent: aC,
        getQueryParamValue: function(b) {
            var a = aL.location.search || aL.location.hash;
            if (a) {
                if (/\?/.test(a)) {
                    a = a.split("?")[1];
                }
                if (b == null) {
                    return ai(a);
                }
                var c = a.split("&");
                for (var d = 0; d < c.length; d++) {
                    if (c[d].substring(0, c[d].indexOf("=")) == b) {
                        return ai(c[d].substring((c[d].indexOf("=") + 1)));
                    }
                }
            }
            return "";
        },
        expressInstallCallback: function() {
            if (aU) {
                var a = aS(ac);
                if (a && aJ) {
                    a.parentNode.replaceChild(aJ, a);
                    if (ad) {
                        ay(ad, true);
                        if (ah.ie && ah.win) {
                            aJ.style.display = "block";
                        }
                    }
                    if (ap) {
                        ap(at);
                    }
                }
                aU = false;
            }
        }
    };
}();
(function(d, b, a) {
    var c = function(aQ) {
        function a3(m) {
            var h, s, p = {};
            aQ.each(m, function(t) {
                if ((h = t.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(h[1] + " ")) {
                    s = t.replace(h[0], h[2].toLowerCase()), p[s] = t, "o" === h[1] && a3(m[t]);
                }
            });
            m._hungarianMap = p;
        }

        function bp(m, h, s) {
            m._hungarianMap || a3(m);
            var p;
            aQ.each(h, function(t) {
                p = m._hungarianMap[t];
                if (p !== a && (s || h[p] === a)) {
                    "o" === p.charAt(0) ? (h[p] || (h[p] = {}), aQ.extend(!0, h[p], h[t]), bp(m[p], h[p], s)) : h[p] = h[t];
                }
            });
        }

        function a7(m) {
            var h = aL.defaults.oLanguage,
                p = m.sZeroRecords;
            !m.sEmptyTable && (p && "No data available in table" === h.sEmptyTable) && bs(m, m, "sZeroRecords", "sEmptyTable");
            !m.sLoadingRecords && (p && "Loading..." === h.sLoadingRecords) && bs(m, m, "sZeroRecords", "sLoadingRecords");
            m.sInfoThousands && (m.sThousands = m.sInfoThousands);
            (m = m.sDecimal) && aJ(m);
        }

        function ak(m) {
            bC(m, "ordering", "bSort");
            bC(m, "orderMulti", "bSortMulti");
            bC(m, "orderClasses", "bSortClasses");
            bC(m, "orderCellsTop", "bSortCellsTop");
            bC(m, "order", "aaSorting");
            bC(m, "orderFixed", "aaSortingFixed");
            bC(m, "paging", "bPaginate");
            bC(m, "pagingType", "sPaginationType");
            bC(m, "pageLength", "iDisplayLength");
            bC(m, "searching", "bFilter");
            "boolean" === typeof m.sScrollX && (m.sScrollX = m.sScrollX ? "100%" : "");
            if (m = m.aoSearchCols) {
                for (var h = 0, p = m.length; h < p; h++) {
                    m[h] && bp(aL.models.oSearch, m[h]);
                }
            }
        }

        function l(m) {
            bC(m, "orderable", "bSortable");
            bC(m, "orderData", "aDataSort");
            bC(m, "orderSequence", "asSorting");
            bC(m, "orderDataType", "sortDataType");
            var h = m.aDataSort;
            h && !aQ.isArray(h) && (m.aDataSort = [h]);
        }

        function b7(m) {
            if (!aL.__browser) {
                var h = {};
                aL.__browser = h;
                var t = aQ("<div/>").css({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: 1,
                        width: 1,
                        overflow: "hidden"
                    }).append(aQ("<div/>").css({
                        position: "absolute",
                        top: 1,
                        left: 1,
                        width: 100,
                        overflow: "scroll"
                    }).append(aQ("<div/>").css({
                        width: "100%",
                        height: 10
                    }))).appendTo("body"),
                    s = t.children(),
                    p = s.children();
                h.barWidth = s[0].offsetWidth - s[0].clientWidth;
                h.bScrollOversize = 100 === p[0].offsetWidth && 100 !== s[0].clientWidth;
                h.bScrollbarLeft = 1 !== Math.round(p.offset().left);
                h.bBounding = t[0].getBoundingClientRect().width ? !0 : !1;
                t.remove();
            }
            aQ.extend(m.oBrowser, aL.__browser);
            m.oScroll.iBarWidth = aL.__browser.barWidth;
        }

        function bO(m, h, w, v, u, t) {
            var s, p = !1;
            w !== a && (s = w, p = !0);
            for (; v !== u;) {
                m.hasOwnProperty(v) && (s = p ? h(s, m[v], v, m) : m[v], p = !0, v += t);
            }
            return s;
        }

        function ch(m, h) {
            var s = aL.defaults.column,
                p = m.aoColumns.length,
                s = aQ.extend({}, aL.models.oColumn, s, {
                    nTh: h ? h : b.createElement("th"),
                    sTitle: s.sTitle ? s.sTitle : h ? h.innerHTML : "",
                    aDataSort: s.aDataSort ? s.aDataSort : [p],
                    mData: s.mData ? s.mData : p,
                    idx: p
                });
            m.aoColumns.push(s);
            s = m.aoPreSearchCols;
            s[p] = aQ.extend({}, aL.models.oSearch, s[p]);
            cg(m, p, aQ(h).data());
        }

        function cg(x, w, v) {
            var w = x.aoColumns[w],
                u = x.oClasses,
                t = aQ(w.nTh);
            if (!w.sWidthOrig) {
                w.sWidthOrig = t.attr("width") || null;
                var s = (t.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
                s && (w.sWidthOrig = s[1]);
            }
            v !== a && null !== v && (l(v), bp(aL.defaults.column, v), v.mDataProp !== a && !v.mData && (v.mData = v.mDataProp), v.sType && (w._sManualType = v.sType), v.className && !v.sClass && (v.sClass = v.className), aQ.extend(w, v), bs(w, v, "sWidth", "sWidthOrig"), v.iDataSort !== a && (w.aDataSort = [v.iDataSort]), bs(w, v, "aDataSort"));
            var p = w.mData,
                m = bf(p),
                h = w.mRender ? bf(w.mRender) : null,
                v = function(y) {
                    return "string" === typeof y && -1 !== y.indexOf("@");
                };
            w._bAttrSrc = aQ.isPlainObject(p) && (v(p.sort) || v(p.type) || v(p.filter));
            w.fnGetData = function(z, y, B) {
                var A = m(z, y, a, B);
                return h && y ? h(A, y, z, B) : A;
            };
            w.fnSetData = function(z, y, A) {
                return bd(p)(z, y, A);
            };
            "number" !== typeof p && (x._rowReadObject = !0);
            x.oFeatures.bSort || (w.bSortable = !1, t.addClass(u.sSortableNone));
            x = -1 !== aQ.inArray("asc", w.asSorting);
            v = -1 !== aQ.inArray("desc", w.asSorting);
            !w.bSortable || !x && !v ? (w.sSortingClass = u.sSortableNone, w.sSortingClassJUI = "") : x && !v ? (w.sSortingClass = u.sSortableAsc, w.sSortingClassJUI = u.sSortJUIAscAllowed) : !x && v ? (w.sSortingClass = u.sSortableDesc, w.sSortingClassJUI = u.sSortJUIDescAllowed) : (w.sSortingClass = u.sSortable, w.sSortingClassJUI = u.sSortJUI);
        }

        function a2(m) {
            if (!1 !== m.oFeatures.bAutoWidth) {
                var h = m.aoColumns;
                bV(m);
                for (var s = 0, p = h.length; s < p; s++) {
                    h[s].nTh.style.width = h[s].sWidth;
                }
            }
            h = m.oScroll;
            ("" !== h.sY || "" !== h.sX) && a0(m);
            aC(m, null, "column-sizing", [m]);
        }

        function bW(m, h) {
            var p = bN(m, "bVisible");
            return "number" === typeof p[h] ? p[h] : null;
        }

        function bg(m, h) {
            var p = bN(m, "bVisible"),
                p = aQ.inArray(h, p);
            return -1 !== p ? p : null;
        }

        function aK(h) {
            return bN(h, "bVisible").length;
        }

        function bN(m, h) {
            var p = [];
            aQ.map(m.aoColumns, function(s, t) {
                s[h] && p.push(t);
            });
            return p;
        }

        function by(C) {
            var B = C.aoColumns,
                A = C.aoData,
                z = aL.ext.type.detect,
                y, x, w, u, t, v, s, m, p;
            y = 0;
            for (x = B.length; y < x; y++) {
                if (s = B[y], p = [], !s.sType && s._sManualType) {
                    s.sType = s._sManualType;
                } else {
                    if (!s.sType) {
                        w = 0;
                        for (u = z.length; w < u; w++) {
                            t = 0;
                            for (v = A.length; t < v; t++) {
                                p[t] === a && (p[t] = bB(C, t, y, "type"));
                                m = z[w](p[t], C);
                                if (!m && w !== z.length - 1) {
                                    break;
                                }
                                if ("html" === m) {
                                    break;
                                }
                            }
                            if (m) {
                                s.sType = m;
                                break;
                            }
                        }
                        s.sType || (s.sType = "string");
                    }
                }
            }
        }

        function bk(A, z, y, x) {
            var w, v, u, t, s, m, p = A.aoColumns;
            if (z) {
                for (w = z.length - 1; 0 <= w; w--) {
                    m = z[w];
                    var h = m.targets !== a ? m.targets : m.aTargets;
                    aQ.isArray(h) || (h = [h]);
                    v = 0;
                    for (u = h.length; v < u; v++) {
                        if ("number" === typeof h[v] && 0 <= h[v]) {
                            for (; p.length <= h[v];) {
                                ch(A);
                            }
                            x(h[v], m);
                        } else {
                            if ("number" === typeof h[v] && 0 > h[v]) {
                                x(p.length + h[v], m);
                            } else {
                                if ("string" === typeof h[v]) {
                                    t = 0;
                                    for (s = p.length; t < s; t++) {
                                        ("_all" == h[v] || aQ(p[t].nTh).hasClass(h[v])) && x(t, m);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (y) {
                w = 0;
                for (A = y.length; w < A; w++) {
                    x(w, y[w]);
                }
            }
        }

        function bi(x, w, v, u) {
            var t = x.aoData.length,
                s = aQ.extend(!0, {}, aL.models.oRow, {
                    src: v ? "dom" : "data",
                    idx: t
                });
            s._aData = w;
            x.aoData.push(s);
            for (var p = x.aoColumns, m = 0, h = p.length; m < h; m++) {
                p[m].sType = null;
            }
            x.aiDisplayMaster.push(t);
            w = x.rowIdFn(w);
            w !== a && (x.aIds[w] = s);
            (v || !x.oFeatures.bDeferRender) && aU(x, t, v, u);
            return t;
        }

        function bU(m, h) {
            var p;
            h instanceof aQ || (h = aQ(h));
            return h.map(function(s, t) {
                p = ar(m, t);
                return bi(m, p.data, t, p.cells);
            });
        }

        function bB(m, h, w, v) {
            var u = m.iDraw,
                t = m.aoColumns[w],
                s = m.aoData[h]._aData,
                p = t.sDefaultContent,
                w = t.fnGetData(s, v, {
                    settings: m,
                    row: h,
                    col: w
                });
            if (w === a) {
                return m.iDrawError != u && null === p && (bl(m, 0, "Requested unknown parameter " + ("function" == typeof t.mData ? "{function}" : "'" + t.mData + "'") + " for row " + h, 4), m.iDrawError = u), p;
            }
            if ((w === s || null === w) && null !== p) {
                w = p;
            } else {
                if ("function" === typeof w) {
                    return w.call(s);
                }
            }
            return null === w && "display" == v ? "" : w;
        }

        function aM(m, h, s, p) {
            m.aoColumns[s].fnSetData(m.aoData[h]._aData, p, {
                settings: m,
                row: h,
                col: s
            });
        }

        function T(h) {
            return aQ.map(h.match(/(\\.|[^\.])+/g) || [""], function(m) {
                return m.replace(/\\./g, ".");
            });
        }

        function bf(m) {
            if (aQ.isPlainObject(m)) {
                var h = {};
                aQ.each(m, function(s, t) {
                    t && (h[s] = bf(t));
                });
                return function(s, w, v, u) {
                    var t = h[w] || h._;
                    return t !== a ? t(s, w, v, u) : s;
                };
            }
            if (null === m) {
                return function(s) {
                    return s;
                };
            }
            if ("function" === typeof m) {
                return function(s, v, u, t) {
                    return m(s, v, u, t);
                };
            }
            if ("string" === typeof m && (-1 !== m.indexOf(".") || -1 !== m.indexOf("[") || -1 !== m.indexOf("("))) {
                var p = function(t, s, x) {
                    var w, v;
                    if ("" !== x) {
                        v = T(x);
                        for (var u = 0, y = v.length; u < y; u++) {
                            x = v[u].match(al);
                            w = v[u].match(a6);
                            if (x) {
                                v[u] = v[u].replace(al, "");
                                "" !== v[u] && (t = t[v[u]]);
                                w = [];
                                v.splice(0, u + 1);
                                v = v.join(".");
                                if (aQ.isArray(t)) {
                                    u = 0;
                                    for (y = t.length; u < y; u++) {
                                        w.push(p(t[u], s, v));
                                    }
                                }
                                t = x[0].substring(1, x[0].length - 1);
                                t = "" === t ? w : w.join(t);
                                break;
                            } else {
                                if (w) {
                                    v[u] = v[u].replace(a6, "");
                                    t = t[v[u]]();
                                    continue;
                                }
                            }
                            if (null === t || t[v[u]] === a) {
                                return a;
                            }
                            t = t[v[u]];
                        }
                    }
                    return t;
                };
                return function(s, t) {
                    return p(s, t, m);
                };
            }
            return function(s) {
                return s[m];
            };
        }

        function bd(m) {
            if (aQ.isPlainObject(m)) {
                return bd(m._);
            }
            if (null === m) {
                return function() {};
            }
            if ("function" === typeof m) {
                return function(p, t, s) {
                    m(p, "set", t, s);
                };
            }
            if ("string" === typeof m && (-1 !== m.indexOf(".") || -1 !== m.indexOf("[") || -1 !== m.indexOf("("))) {
                var h = function(p, x, w) {
                    var w = T(w),
                        v;
                    v = w[w.length - 1];
                    for (var u, t, s = 0, y = w.length - 1; s < y; s++) {
                        u = w[s].match(al);
                        t = w[s].match(a6);
                        if (u) {
                            w[s] = w[s].replace(al, "");
                            p[w[s]] = [];
                            v = w.slice();
                            v.splice(0, s + 1);
                            u = v.join(".");
                            if (aQ.isArray(x)) {
                                t = 0;
                                for (y = x.length; t < y; t++) {
                                    v = {}, h(v, x[t], u), p[w[s]].push(v);
                                }
                            } else {
                                p[w[s]] = x;
                            }
                            return;
                        }
                        t && (w[s] = w[s].replace(a6, ""), p = p[w[s]](x));
                        if (null === p[w[s]] || p[w[s]] === a) {
                            p[w[s]] = {};
                        }
                        p = p[w[s]];
                    }
                    if (v.match(a6)) {
                        p[v.replace(a6, "")](x);
                    } else {
                        p[v.replace(al, "")] = x;
                    }
                };
                return function(s, p) {
                    return h(s, p, m);
                };
            }
            return function(p, s) {
                p[m] = s;
            };
        }

        function cl(h) {
            return bx(h.aoData, "_aData");
        }

        function bv(h) {
            h.aoData.length = 0;
            h.aiDisplayMaster.length = 0;
            h.aiDisplay.length = 0;
            h.aIds = {};
        }

        function aT(m, h, u) {
            for (var t = -1, s = 0, p = m.length; s < p; s++) {
                m[s] == h ? t = s : m[s] > h && m[s]--;
            } - 1 != t && u === a && m.splice(t, 1);
        }

        function n(m, h, w, v) {
            var u = m.aoData[h],
                t, s = function(y, x) {
                    for (; y.childNodes.length;) {
                        y.removeChild(y.firstChild);
                    }
                    y.innerHTML = bB(m, h, x, "display");
                };
            if ("dom" === w || (!w || "auto" === w) && "dom" === u.src) {
                u._aData = ar(m, u, v, v === a ? a : u._aData).data;
            } else {
                var p = u.anCells;
                if (p) {
                    if (v !== a) {
                        s(p[v], v);
                    } else {
                        w = 0;
                        for (t = p.length; w < t; w++) {
                            s(p[w], w);
                        }
                    }
                }
            }
            u._aSortData = null;
            u._aFilterData = null;
            s = m.aoColumns;
            if (v !== a) {
                s[v].sType = null;
            } else {
                w = 0;
                for (t = s.length; w < t; w++) {
                    s[w].sType = null;
                }
                b0(m, u);
            }
        }

        function ar(C, B, A, z) {
            var y = [],
                x = B.firstChild,
                w, v, u = 0,
                s, t = C.aoColumns,
                h = C._rowReadObject,
                z = z !== a ? z : h ? {} : [],
                m = function(G, F) {
                    if ("string" === typeof G) {
                        var H = G.indexOf("@"); - 1 !== H && (H = G.substring(H + 1), bd(G)(z, F.getAttribute(H)));
                    }
                },
                D = function(F) {
                    if (A === a || A === u) {
                        v = t[u], s = aQ.trim(F.innerHTML), v && v._bAttrSrc ? (bd(v.mData._)(z, s), m(v.mData.sort, F), m(v.mData.type, F), m(v.mData.filter, F)) : h ? (v._setter || (v._setter = bd(v.mData)), v._setter(z, s)) : z[u] = s;
                    }
                    u++;
                };
            if (x) {
                for (; x;) {
                    w = x.nodeName.toUpperCase();
                    if ("TD" == w || "TH" == w) {
                        D(x), y.push(x);
                    }
                    x = x.nextSibling;
                }
            } else {
                y = B.anCells;
                w = 0;
                for (var p = y.length; w < p; w++) {
                    D(y[w]);
                }
            }
            if (B = x ? B : B.nTr) {
                (B = B.getAttribute("id")) && bd(C.rowId)(z, B);
            }
            return {
                data: z,
                cells: y
            };
        }

        function aU(B, A, z, y) {
            var x = B.aoData[A],
                w = x._aData,
                v = [],
                t, s, u, p, m;
            if (null === x.nTr) {
                t = z || b.createElement("tr");
                x.nTr = t;
                x.anCells = v;
                t._DT_RowIndex = A;
                b0(B, x);
                p = 0;
                for (m = B.aoColumns.length; p < m; p++) {
                    u = B.aoColumns[p];
                    s = z ? y[p] : b.createElement(u.sCellType);
                    v.push(s);
                    if (!z || u.mRender || u.mData !== p) {
                        s.innerHTML = bB(B, A, p, "display");
                    }
                    u.sClass && (s.className += " " + u.sClass);
                    u.bVisible && !z ? t.appendChild(s) : !u.bVisible && z && s.parentNode.removeChild(s);
                    u.fnCreatedCell && u.fnCreatedCell.call(B.oInstance, s, bB(B, A, p), w, A, p);
                }
                aC(B, "aoRowCreatedCallback", null, [t, w, A]);
            }
            x.nTr.setAttribute("role", "row");
        }

        function b0(m, h) {
            var t = h.nTr,
                s = h._aData;
            if (t) {
                var p = m.rowIdFn(s);
                p && (t.id = p);
                s.DT_RowClass && (p = s.DT_RowClass.split(" "), h.__rowc = h.__rowc ? ap(h.__rowc.concat(p)) : p, aQ(t).removeClass(h.__rowc.join(" ")).addClass(s.DT_RowClass));
                s.DT_RowAttr && aQ(t).attr(s.DT_RowAttr);
                s.DT_RowData && aQ(t).data(s.DT_RowData);
            }
        }

        function o(z) {
            var y, x, w, v, u, t = z.nTHead,
                s = z.nTFoot,
                p = 0 === aQ("th, td", t).length,
                h = z.oClasses,
                m = z.aoColumns;
            p && (v = aQ("<tr/>").appendTo(t));
            y = 0;
            for (x = m.length; y < x; y++) {
                u = m[y], w = aQ(u.nTh).addClass(u.sClass), p && w.appendTo(v), z.oFeatures.bSort && (w.addClass(u.sSortingClass), !1 !== u.bSortable && (w.attr("tabindex", z.iTabIndex).attr("aria-controls", z.sTableId), bG(z, u.nTh, y))), u.sTitle != w[0].innerHTML && w.html(u.sTitle), aY(z, "header")(z, w, u, h);
            }
            p && b9(z.aoHeader, t);
            aQ(t).find(">tr").attr("role", "row");
            aQ(t).find(">tr>th, >tr>td").addClass(h.sHeaderTH);
            aQ(s).find(">tr>th, >tr>td").addClass(h.sFooterTH);
            if (null !== s) {
                z = z.aoFooter[0];
                y = 0;
                for (x = z.length; y < x; y++) {
                    u = m[y], u.nTf = z[y].cell, u.sClass && aQ(u.nTf).addClass(u.sClass);
                }
            }
        }

        function bQ(y, x, w) {
            var v, u, t, s = [],
                p = [],
                m = y.aoColumns.length,
                h;
            if (x) {
                w === a && (w = !1);
                v = 0;
                for (u = x.length; v < u; v++) {
                    s[v] = x[v].slice();
                    s[v].nTr = x[v].nTr;
                    for (t = m - 1; 0 <= t; t--) {
                        !y.aoColumns[t].bVisible && !w && s[v].splice(t, 1);
                    }
                    p.push([]);
                }
                v = 0;
                for (u = s.length; v < u; v++) {
                    if (y = s[v].nTr) {
                        for (; t = y.firstChild;) {
                            y.removeChild(t);
                        }
                    }
                    t = 0;
                    for (x = s[v].length; t < x; t++) {
                        if (h = m = 1, p[v][t] === a) {
                            y.appendChild(s[v][t].cell);
                            for (p[v][t] = 1; s[v + m] !== a && s[v][t].cell == s[v + m][t].cell;) {
                                p[v + m][t] = 1, m++;
                            }
                            for (; s[v][t + h] !== a && s[v][t].cell == s[v][t + h].cell;) {
                                for (w = 0; w < m; w++) {
                                    p[v + w][t + h] = 1;
                                }
                                h++;
                            }
                            aQ(s[v][t].cell).attr("rowspan", m).attr("colspan", h);
                        }
                    }
                }
            }
        }

        function bh(B) {
            var A = aC(B, "aoPreDrawCallback", "preDraw", [B]);
            if (-1 !== aQ.inArray(!1, A)) {
                bA(B, !1);
            } else {
                var A = [],
                    z = 0,
                    y = B.asStripeClasses,
                    x = y.length,
                    w = B.oLanguage,
                    v = B.iInitDisplayStart,
                    u = "ssp" == az(B),
                    t = B.aiDisplay;
                B.bDrawing = !0;
                v !== a && -1 !== v && (B._iDisplayStart = u ? v : v >= B.fnRecordsDisplay() ? 0 : v, B.iInitDisplayStart = -1);
                var v = B._iDisplayStart,
                    p = B.fnDisplayEnd();
                if (B.bDeferLoading) {
                    B.bDeferLoading = !1, B.iDraw++, bA(B, !1);
                } else {
                    if (u) {
                        if (!B.bDestroying && !ce(B)) {
                            return;
                        }
                    } else {
                        B.iDraw++;
                    }
                }
                if (0 !== t.length) {
                    w = u ? B.aoData.length : p;
                    for (u = u ? 0 : v; u < w; u++) {
                        var s = t[u],
                            h = B.aoData[s];
                        null === h.nTr && aU(B, s);
                        s = h.nTr;
                        if (0 !== x) {
                            var m = y[z % x];
                            h._sRowStripe != m && (aQ(s).removeClass(h._sRowStripe).addClass(m), h._sRowStripe = m);
                        }
                        aC(B, "aoRowCallback", null, [s, h._aData, z, u]);
                        A.push(s);
                        z++;
                    }
                } else {
                    z = w.sZeroRecords, 1 == B.iDraw && "ajax" == az(B) ? z = w.sLoadingRecords : w.sEmptyTable && 0 === B.fnRecordsTotal() && (z = w.sEmptyTable), A[0] = aQ("<tr/>", {
                        "class": x ? y[0] : ""
                    }).append(aQ("<td />", {
                        valign: "top",
                        colSpan: aK(B),
                        "class": B.oClasses.sRowEmpty
                    }).html(z))[0];
                }
                aC(B, "aoHeaderCallback", "header", [aQ(B.nTHead).children("tr")[0], cl(B), v, p, t]);
                aC(B, "aoFooterCallback", "footer", [aQ(B.nTFoot).children("tr")[0], cl(B), v, p, t]);
                y = aQ(B.nTBody);
                y.children().detach();
                y.append(aQ(A));
                aC(B, "aoDrawCallback", "draw", [B]);
                B.bSorted = !1;
                B.bFiltered = !1;
                B.bDrawing = !1;
            }
        }

        function a8(m, h) {
            var s = m.oFeatures,
                p = s.bFilter;
            s.bSort && bS(m);
            p ? bn(m, m.oPreviousSearch) : m.aiDisplay = m.aiDisplayMaster.slice();
            !0 !== h && (m._iDisplayStart = 0);
            m._drawHold = h;
            bh(m);
            m._drawHold = !1;
        }

        function bt(B) {
            var A = B.oClasses,
                z = aQ(B.nTable),
                z = aQ("<div/>").insertBefore(z),
                y = B.oFeatures,
                x = aQ("<div/>", {
                    id: B.sTableId + "_wrapper",
                    "class": A.sWrapper + (B.nTFoot ? "" : " " + A.sNoFooter)
                });
            B.nHolding = z[0];
            B.nTableWrapper = x[0];
            B.nTableReinsertBefore = B.nTable.nextSibling;
            for (var w = B.sDom.split(""), v, u, t, p, s, h, m = 0; m < w.length; m++) {
                v = null;
                u = w[m];
                if ("<" == u) {
                    t = aQ("<div/>")[0];
                    p = w[m + 1];
                    if ("'" == p || '"' == p) {
                        s = "";
                        for (h = 2; w[m + h] != p;) {
                            s += w[m + h], h++;
                        }
                        "H" == s ? s = A.sJUIHeader : "F" == s && (s = A.sJUIFooter); - 1 != s.indexOf(".") ? (p = s.split("."), t.id = p[0].substr(1, p[0].length - 1), t.className = p[1]) : "#" == s.charAt(0) ? t.id = s.substr(1, s.length - 1) : t.className = s;
                        m += h;
                    }
                    x.append(t);
                    x = aQ(t);
                } else {
                    if (">" == u) {
                        x = x.parent();
                    } else {
                        if ("l" == u && y.bPaginate && y.bLengthChange) {
                            v = aR(B);
                        } else {
                            if ("f" == u && y.bFilter) {
                                v = ao(B);
                            } else {
                                if ("r" == u && y.bProcessing) {
                                    v = E(B);
                                } else {
                                    if ("t" == u) {
                                        v = ci(B);
                                    } else {
                                        if ("i" == u && y.bInfo) {
                                            v = bX(B);
                                        } else {
                                            if ("p" == u && y.bPaginate) {
                                                v = bD(B);
                                            } else {
                                                if (0 !== aL.ext.feature.length) {
                                                    t = aL.ext.feature;
                                                    h = 0;
                                                    for (p = t.length; h < p; h++) {
                                                        if (u == t[h].cFeature) {
                                                            v = t[h].fnInit(B);
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                v && (t = B.aanFeatures, t[u] || (t[u] = []), t[u].push(v), x.append(v));
            }
            z.replaceWith(x);
            B.nHolding = null;
        }

        function b9(B, A) {
            var z = aQ(A).children("tr"),
                y, x, w, v, u, t, p, s, h, m;
            B.splice(0, B.length);
            w = 0;
            for (t = z.length; w < t; w++) {
                B.push([]);
            }
            w = 0;
            for (t = z.length; w < t; w++) {
                y = z[w];
                for (x = y.firstChild; x;) {
                    if ("TD" == x.nodeName.toUpperCase() || "TH" == x.nodeName.toUpperCase()) {
                        s = 1 * x.getAttribute("colspan");
                        h = 1 * x.getAttribute("rowspan");
                        s = !s || 0 === s || 1 === s ? 1 : s;
                        h = !h || 0 === h || 1 === h ? 1 : h;
                        v = 0;
                        for (u = B[w]; u[v];) {
                            v++;
                        }
                        p = v;
                        m = 1 === s ? !0 : !1;
                        for (u = 0; u < s; u++) {
                            for (v = 0; v < h; v++) {
                                B[w + v][p + u] = {
                                    cell: x,
                                    unique: m
                                }, B[w + v].nTr = y;
                            }
                        }
                    }
                    x = x.nextSibling;
                }
            }
        }

        function O(m, h, v) {
            var u = [];
            v || (v = m.aoHeader, h && (v = [], b9(v, h)));
            for (var h = 0, t = v.length; h < t; h++) {
                for (var s = 0, p = v[h].length; s < p; s++) {
                    if (v[h][s].unique && (!u[s] || !m.bSortCellsTop)) {
                        u[s] = v[h][s].cell;
                    }
                }
            }
            return u;
        }

        function ck(y, x, w) {
            aC(y, "aoServerParams", "serverParams", [x]);
            if (x && aQ.isArray(x)) {
                var v = {},
                    u = /(.*?)\[\]$/;
                aQ.each(x, function(A, z) {
                    var B = z.name.match(u);
                    B ? (B = B[0], v[B] || (v[B] = []), v[B].push(z.value)) : v[z.name] = z.value;
                });
                x = v;
            }
            var t, s = y.ajax,
                p = y.oInstance,
                m = function(z) {
                    aC(y, null, "xhr", [y, z, y.jqXHR]);
                    w(z);
                };
            if (aQ.isPlainObject(s) && s.data) {
                t = s.data;
                var h = aQ.isFunction(t) ? t(x, y) : t,
                    x = aQ.isFunction(t) && h ? h : aQ.extend(!0, x, h);
                delete s.data;
            }
            h = {
                data: x,
                success: function(z) {
                    var A = z.error || z.sError;
                    A && bl(y, 0, A);
                    y.json = z;
                    m(z);
                },
                dataType: "json",
                cache: !1,
                type: y.sServerMethod,
                error: function(z, B) {
                    var A = aC(y, null, "xhr", [y, null, y.jqXHR]); - 1 === aQ.inArray(!0, A) && ("parsererror" == B ? bl(y, 0, "Invalid JSON response", 1) : 4 === z.readyState && bl(y, 0, "Ajax error", 7));
                    bA(y, !1);
                }
            };
            y.oAjaxData = x;
            aC(y, null, "preXhr", [y, x]);
            y.fnServerData ? y.fnServerData.call(p, y.sAjaxSource, aQ.map(x, function(A, z) {
                return {
                    name: z,
                    value: A
                };
            }), m, y) : y.sAjaxSource || "string" === typeof s ? y.jqXHR = aQ.ajax(aQ.extend(h, {
                url: s || y.sAjaxSource
            })) : aQ.isFunction(s) ? y.jqXHR = s.call(p, x, m, y) : (y.jqXHR = aQ.ajax(aQ.extend(h, s)), s.data = t);
        }

        function ce(h) {
            return h.bAjaxDataGet ? (h.iDraw++, bA(h, !0), ck(h, aV(h), function(m) {
                at(h, m);
            }), !1) : !0;
        }

        function aV(C) {
            var B = C.aoColumns,
                A = B.length,
                z = C.oFeatures,
                y = C.oPreviousSearch,
                x = C.aoPreSearchCols,
                w, v = [],
                u, p, s, h = a5(C);
            w = C._iDisplayStart;
            u = !1 !== z.bPaginate ? C._iDisplayLength : -1;
            var m = function(F, D) {
                v.push({
                    name: F,
                    value: D
                });
            };
            m("sEcho", C.iDraw);
            m("iColumns", A);
            m("sColumns", bx(B, "sName").join(","));
            m("iDisplayStart", w);
            m("iDisplayLength", u);
            var t = {
                draw: C.iDraw,
                columns: [],
                order: [],
                start: w,
                length: u,
                search: {
                    value: y.sSearch,
                    regex: y.bRegex
                }
            };
            for (w = 0; w < A; w++) {
                p = B[w], s = x[w], u = "function" == typeof p.mData ? "function" : p.mData, t.columns.push({
                    data: u,
                    name: p.sName,
                    searchable: p.bSearchable,
                    orderable: p.bSortable,
                    search: {
                        value: s.sSearch,
                        regex: s.bRegex
                    }
                }), m("mDataProp_" + w, u), z.bFilter && (m("sSearch_" + w, s.sSearch), m("bRegex_" + w, s.bRegex), m("bSearchable_" + w, p.bSearchable)), z.bSort && m("bSortable_" + w, p.bSortable);
            }
            z.bFilter && (m("sSearch", y.sSearch), m("bRegex", y.bRegex));
            z.bSort && (aQ.each(h, function(F, D) {
                t.order.push({
                    column: D.col,
                    dir: D.dir
                });
                m("iSortCol_" + F, D.col);
                m("sSortDir_" + F, D.dir);
            }), m("iSortingCols", h.length));
            B = aL.ext.legacy.ajax;
            return null === B ? C.sAjaxSource ? v : t : B ? v : t;
        }

        function at(m, h) {
            var u = bZ(m, h),
                t = h.sEcho !== a ? h.sEcho : h.draw,
                s = h.iTotalRecords !== a ? h.iTotalRecords : h.recordsTotal,
                p = h.iTotalDisplayRecords !== a ? h.iTotalDisplayRecords : h.recordsFiltered;
            if (t) {
                if (1 * t < m.iDraw) {
                    return;
                }
                m.iDraw = 1 * t;
            }
            bv(m);
            m._iRecordsTotal = parseInt(s, 10);
            m._iRecordsDisplay = parseInt(p, 10);
            t = 0;
            for (s = u.length; t < s; t++) {
                bi(m, u[t]);
            }
            m.aiDisplay = m.aiDisplayMaster.slice();
            m.bAjaxDataGet = !1;
            bh(m);
            m._bInitComplete || bF(m, h);
            m.bAjaxDataGet = !0;
            bA(m, !1);
        }

        function bZ(m, h) {
            var p = aQ.isPlainObject(m.ajax) && m.ajax.dataSrc !== a ? m.ajax.dataSrc : m.sAjaxDataProp;
            return "data" === p ? h.aaData || h[p] : "" !== p ? bf(p)(h) : h;
        }

        function ao(x) {
            var w = x.oClasses,
                v = x.sTableId,
                u = x.oLanguage,
                t = x.oPreviousSearch,
                s = x.aanFeatures,
                p = '<input type="search" class="' + w.sFilterInput + '"/>',
                m = u.sSearch,
                m = m.match(/_INPUT_/) ? m.replace("_INPUT_", p) : m + p,
                w = aQ("<div/>", {
                    id: !s.f ? v + "_filter" : null,
                    "class": w.sFilter
                }).append(aQ("<label/>").append(m)),
                s = function() {
                    var y = !this.value ? "" : this.value;
                    y != t.sSearch && (bn(x, {
                        sSearch: y,
                        bRegex: t.bRegex,
                        bSmart: t.bSmart,
                        bCaseInsensitive: t.bCaseInsensitive
                    }), x._iDisplayStart = 0, bh(x));
                },
                p = null !== x.searchDelay ? x.searchDelay : "ssp" === az(x) ? 400 : 0,
                h = aQ("input", w).val(t.sSearch).attr("placeholder", u.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT", p ? aX(s, p) : s).bind("keypress.DT", function(y) {
                    if (13 == y.keyCode) {
                        return !1;
                    }
                }).attr("aria-controls", v);
            aQ(x.nTable).on("search.dt.DT", function(y, A) {
                if (x === A) {
                    try {
                        h[0] !== b.activeElement && h.val(t.sSearch);
                    } catch (z) {}
                }
            });
            return w[0];
        }

        function bn(m, h, u) {
            var t = m.oPreviousSearch,
                s = m.aoPreSearchCols,
                p = function(v) {
                    t.sSearch = v.sSearch;
                    t.bRegex = v.bRegex;
                    t.bSmart = v.bSmart;
                    t.bCaseInsensitive = v.bCaseInsensitive;
                };
            by(m);
            if ("ssp" != az(m)) {
                ad(m, h.sSearch, u, h.bEscapeRegex !== a ? !h.bEscapeRegex : h.bRegex, h.bSmart, h.bCaseInsensitive);
                p(h);
                for (h = 0; h < s.length; h++) {
                    e(m, s[h].sSearch, h, s[h].bEscapeRegex !== a ? !s[h].bEscapeRegex : s[h].bRegex, s[h].bSmart, s[h].bCaseInsensitive);
                }
                b1(m);
            } else {
                p(h);
            }
            m.bFiltered = !0;
            aC(m, null, "search", [m]);
        }

        function b1(y) {
            for (var x = aL.ext.search, w = y.aiDisplay, v, u, t = 0, s = x.length; t < s; t++) {
                for (var p = [], m = 0, h = w.length; m < h; m++) {
                    u = w[m], v = y.aoData[u], x[t](y, v._aFilterData, u, v._aData, m) && p.push(u);
                }
                w.length = 0;
                aQ.merge(w, p);
            }
        }

        function e(m, h, v, u, t, s) {
            if ("" !== h) {
                for (var p = m.aiDisplay, u = aw(h, u, t, s), t = p.length - 1; 0 <= t; t--) {
                    h = m.aoData[p[t]]._aFilterData[v], u.test(h) || p.splice(t, 1);
                }
            }
        }

        function ad(m, h, v, u, t, s) {
            var u = aw(h, u, t, s),
                t = m.oPreviousSearch.sSearch,
                s = m.aiDisplayMaster,
                p;
            0 !== aL.ext.search.length && (v = !0);
            p = bH(m);
            if (0 >= h.length) {
                m.aiDisplay = s.slice();
            } else {
                if (p || v || t.length > h.length || 0 !== h.indexOf(t) || m.bSorted) {
                    m.aiDisplay = s.slice();
                }
                h = m.aiDisplay;
                for (v = h.length - 1; 0 <= v; v--) {
                    u.test(m.aoData[h[v]]._sFilterRow) || h.splice(v, 1);
                }
            }
        }

        function aw(m, h, s, p) {
            m = h ? m : av(m);
            s && (m = "^(?=.*?" + aQ.map(m.match(/"[^"]+"|[^ ]+/g) || [""], function(u) {
                if ('"' === u.charAt(0)) {
                    var t = u.match(/^"(.*)"$/),
                        u = t ? t[1] : u;
                }
                return u.replace('"', "");
            }).join(")(?=.*?") + ").*$");
            return RegExp(m, p ? "i" : "");
        }

        function av(h) {
            return h.replace(j, "\\$1");
        }

        function bH(A) {
            var z = A.aoColumns,
                y, x, w, v, u, s, p, t, m = aL.ext.type.search;
            y = !1;
            x = 0;
            for (v = A.aoData.length; x < v; x++) {
                if (t = A.aoData[x], !t._aFilterData) {
                    s = [];
                    w = 0;
                    for (u = z.length; w < u; w++) {
                        y = z[w], y.bSearchable ? (p = bB(A, x, w, "filter"), m[y.sType] && (p = m[y.sType](p)), null === p && (p = ""), "string" !== typeof p && p.toString && (p = p.toString())) : p = "", p.indexOf && -1 !== p.indexOf("&") && (ae.innerHTML = p, p = b5 ? ae.textContent : ae.innerText), p.replace && (p = p.replace(/[\r\n]/g, "")), s.push(p);
                    }
                    t._aFilterData = s;
                    t._sFilterRow = s.join("  ");
                    y = !0;
                }
            }
            return y;
        }

        function b8(h) {
            return {
                search: h.sSearch,
                smart: h.bSmart,
                regex: h.bRegex,
                caseInsensitive: h.bCaseInsensitive
            };
        }

        function bP(h) {
            return {
                sSearch: h.search,
                bSmart: h.smart,
                bRegex: h.regex,
                bCaseInsensitive: h.caseInsensitive
            };
        }

        function bX(m) {
            var h = m.sTableId,
                s = m.aanFeatures.i,
                p = aQ("<div/>", {
                    "class": m.oClasses.sInfo,
                    id: !s ? h + "_info" : null
                });
            s || (m.aoDrawCallback.push({
                fn: bm,
                sName: "information"
            }), p.attr("role", "status").attr("aria-live", "polite"), aQ(m.nTable).attr("aria-describedby", h + "_info"));
            return p[0];
        }

        function bm(m) {
            var h = m.aanFeatures.i;
            if (0 !== h.length) {
                var w = m.oLanguage,
                    v = m._iDisplayStart + 1,
                    u = m.fnDisplayEnd(),
                    t = m.fnRecordsTotal(),
                    s = m.fnRecordsDisplay(),
                    p = s ? w.sInfo : w.sInfoEmpty;
                s !== t && (p += " " + w.sInfoFiltered);
                p += w.sInfoPostFix;
                p = aN(m, p);
                w = w.fnInfoCallback;
                null !== w && (p = w.call(m.oInstance, m, v, u, t, s, p));
                aQ(h).html(p);
            }
        }

        function aN(m, h) {
            var v = m.fnFormatNumber,
                u = m._iDisplayStart + 1,
                t = m._iDisplayLength,
                s = m.fnRecordsDisplay(),
                p = -1 === t;
            return h.replace(/_START_/g, v.call(m, u)).replace(/_END_/g, v.call(m, m.fnDisplayEnd())).replace(/_MAX_/g, v.call(m, m.fnRecordsTotal())).replace(/_TOTAL_/g, v.call(m, s)).replace(/_PAGE_/g, v.call(m, p ? 1 : Math.ceil(u / t))).replace(/_PAGES_/g, v.call(m, p ? 1 : Math.ceil(s / t)));
        }

        function aO(m) {
            var h, v, u = m.iInitDisplayStart,
                t = m.aoColumns,
                s;
            v = m.oFeatures;
            var p = m.bDeferLoading;
            if (m.bInitialised) {
                bt(m);
                o(m);
                bQ(m, m.aoHeader);
                bQ(m, m.aoFooter);
                bA(m, !0);
                v.bAutoWidth && bV(m);
                h = 0;
                for (v = t.length; h < v; h++) {
                    s = t[h], s.sWidth && (s.nTh.style.width = aE(s.sWidth));
                }
                aC(m, null, "preInit", [m]);
                a8(m);
                t = az(m);
                if ("ssp" != t || p) {
                    "ajax" == t ? ck(m, [], function(x) {
                        var w = bZ(m, x);
                        for (h = 0; h < w.length; h++) {
                            bi(m, w[h]);
                        }
                        m.iInitDisplayStart = u;
                        a8(m);
                        bA(m, !1);
                        bF(m, x);
                    }, m) : (bA(m, !1), bF(m));
                }
            } else {
                setTimeout(function() {
                    aO(m);
                }, 200);
            }
        }

        function bF(m, h) {
            m._bInitComplete = !0;
            (h || m.oInit.aaData) && a2(m);
            aC(m, "aoInitComplete", "init", [m, h]);
        }

        function ag(m, h) {
            var p = parseInt(h, 10);
            m._iDisplayLength = p;
            i(m);
            aC(m, null, "length", [m, p]);
        }

        function aR(x) {
            for (var w = x.oClasses, v = x.sTableId, u = x.aLengthMenu, t = aQ.isArray(u[0]), s = t ? u[0] : u, u = t ? u[1] : u, t = aQ("<select/>", {
                    name: v + "_length",
                    "aria-controls": v,
                    "class": w.sLengthSelect
                }), p = 0, m = s.length; p < m; p++) {
                t[0][p] = new Option(u[p], s[p]);
            }
            var h = aQ("<div><label/></div>").addClass(w.sLength);
            x.aanFeatures.l || (h[0].id = v + "_length");
            h.children().append(x.oLanguage.sLengthMenu.replace("_MENU_", t[0].outerHTML));
            aQ("select", h).val(x._iDisplayLength).bind("change.DT", function() {
                ag(x, aQ(this).val());
                bh(x);
            });
            aQ(x.nTable).bind("length.dt.DT", function(y, A, z) {
                x === A && aQ("select", h).val(z);
            });
            return h[0];
        }

        function bD(m) {
            var h = m.sPaginationType,
                u = aL.ext.pager[h],
                t = "function" === typeof u,
                s = function(v) {
                    bh(v);
                },
                h = aQ("<div/>").addClass(m.oClasses.sPaging + h)[0],
                p = m.aanFeatures;
            t || u.fnInit(m, h, s);
            p.p || (h.id = m.sTableId + "_paginate", m.aoDrawCallback.push({
                fn: function(x) {
                    if (t) {
                        var v = x._iDisplayStart,
                            z = x._iDisplayLength,
                            A = x.fnRecordsDisplay(),
                            w = -1 === z,
                            v = w ? 0 : Math.ceil(v / z),
                            z = w ? 1 : Math.ceil(A / z),
                            A = u(v, z),
                            y, w = 0;
                        for (y = p.p.length; w < y; w++) {
                            aY(x, "pageButton")(x, p.p[w], w, A, v, z);
                        }
                    } else {
                        u.fnUpdate(x, s);
                    }
                },
                sName: "pagination"
            }));
            return h;
        }

        function b4(m, h, u) {
            var t = m._iDisplayStart,
                s = m._iDisplayLength,
                p = m.fnRecordsDisplay();
            0 === p || -1 === s ? t = 0 : "number" === typeof h ? (t = h * s, t > p && (t = 0)) : "first" == h ? t = 0 : "previous" == h ? (t = 0 <= s ? t - s : 0, 0 > t && (t = 0)) : "next" == h ? t + s < p && (t += s) : "last" == h ? t = Math.floor((p - 1) / s) * s : bl(m, 0, "Unknown paging action: " + h, 5);
            h = m._iDisplayStart !== t;
            m._iDisplayStart = t;
            h && (aC(m, null, "page", [m]), u && bh(m));
            return h;
        }

        function E(h) {
            return aQ("<div/>", {
                id: !h.aanFeatures.r ? h.sTableId + "_processing" : null,
                "class": h.oClasses.sProcessing
            }).html(h.oLanguage.sProcessing).insertBefore(h.nTable)[0];
        }

        function bA(m, h) {
            m.oFeatures.bProcessing && aQ(m.aanFeatures.r).css("display", h ? "block" : "none");
            aC(m, null, "processing", [m, h]);
        }

        function ci(B) {
            var A = aQ(B.nTable);
            A.attr("role", "grid");
            var z = B.oScroll;
            if ("" === z.sX && "" === z.sY) {
                return B.nTable;
            }
            var y = z.sX,
                x = z.sY,
                w = B.oClasses,
                v = A.children("caption"),
                u = v.length ? v[0]._captionSide : null,
                t = aQ(A[0].cloneNode(!1)),
                m = aQ(A[0].cloneNode(!1)),
                p = A.children("tfoot");
            z.sX && "100%" === A.attr("width") && A.removeAttr("width");
            p.length || (p = null);
            t = aQ("<div/>", {
                "class": w.sScrollWrapper
            }).append(aQ("<div/>", {
                "class": w.sScrollHead
            }).css({
                overflow: "hidden",
                position: "relative",
                border: 0,
                width: y ? !y ? null : aE(y) : "100%"
            }).append(aQ("<div/>", {
                "class": w.sScrollHeadInner
            }).css({
                "box-sizing": "content-box",
                width: z.sXInner || "100%"
            }).append(t.removeAttr("id").css("margin-left", 0).append("top" === u ? v : null).append(A.children("thead"))))).append(aQ("<div/>", {
                "class": w.sScrollBody
            }).css({
                position: "relative",
                overflow: "auto",
                width: !y ? null : aE(y)
            }).append(A));
            p && t.append(aQ("<div/>", {
                "class": w.sScrollFoot
            }).css({
                overflow: "hidden",
                border: 0,
                width: y ? !y ? null : aE(y) : "100%"
            }).append(aQ("<div/>", {
                "class": w.sScrollFootInner
            }).append(m.removeAttr("id").css("margin-left", 0).append("bottom" === u ? v : null).append(A.children("tfoot")))));
            var A = t.children(),
                s = A[0],
                w = A[1],
                h = p ? A[2] : null;
            if (y) {
                aQ(w).on("scroll.DT", function() {
                    var C = this.scrollLeft;
                    s.scrollLeft = C;
                    p && (h.scrollLeft = C);
                });
            }
            aQ(w).css(x && z.bCollapse ? "max-height" : "height", x);
            B.nScrollHead = s;
            B.nScrollBody = w;
            B.nScrollFoot = h;
            B.aoDrawCallback.push({
                fn: a0,
                sName: "scrolling"
            });
            return t[0];
        }

        function a0(cc) {
            var cb = cc.oScroll,
                ca = cb.sX,
                bc = cb.sXInner,
                bb = cb.sY,
                cb = cb.iBarWidth,
                ba = aQ(cc.nScrollHead),
                ac = ba[0].style,
                ab = ba.children("div"),
                aa = ab[0].style,
                W = ab.children("table"),
                ab = cc.nScrollBody,
                Y = aQ(ab),
                Z = ab.style,
                R = aQ(cc.nScrollFoot).children("div"),
                X = R.children("table"),
                V = aQ(cc.nTHead),
                L = aQ(cc.nTable),
                U = L[0],
                K = U.style,
                u = cc.nTFoot ? aQ(cc.nTFoot) : null,
                F = cc.oBrowser,
                I = F.bScrollOversize,
                M, J, h, H, G = [],
                D = [],
                S = [],
                Q, P = function(m) {
                    m = m.style;
                    m.paddingTop = "0";
                    m.paddingBottom = "0";
                    m.borderTopWidth = "0";
                    m.borderBottomWidth = "0";
                    m.height = 0;
                };
            L.children("thead, tfoot").remove();
            H = V.clone().prependTo(L);
            V = V.find("tr");
            J = H.find("tr");
            H.find("th, td").removeAttr("tabindex");
            u && (h = u.clone().prependTo(L), M = u.find("tr"), h = h.find("tr"));
            ca || (Z.width = "100%", ba[0].style.width = "100%");
            aQ.each(O(cc, H), function(m, p) {
                Q = bW(cc, m);
                p.style.width = cc.aoColumns[Q].sWidth;
            });
            u && bq(function(m) {
                m.style.width = "";
            }, h);
            ba = L.outerWidth();
            if ("" === ca) {
                K.width = "100%";
                if (I && (L.find("tbody").height() > ab.offsetHeight || "scroll" == Y.css("overflow-y"))) {
                    K.width = aE(L.outerWidth() - cb);
                }
                ba = L.outerWidth();
            } else {
                "" !== bc && (K.width = aE(bc), ba = L.outerWidth());
            }
            bq(P, J);
            bq(function(m) {
                S.push(m.innerHTML);
                G.push(aE(aQ(m).css("width")));
            }, J);
            bq(function(p, m) {
                p.style.width = G[m];
            }, V);
            aQ(J).height(0);
            u && (bq(P, h), bq(function(m) {
                D.push(aE(aQ(m).css("width")));
            }, h), bq(function(p, m) {
                p.style.width = D[m];
            }, M), aQ(h).height(0));
            bq(function(p, m) {
                p.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + S[m] + "</div>";
                p.style.width = G[m];
            }, J);
            u && bq(function(p, m) {
                p.innerHTML = "";
                p.style.width = D[m];
            }, h);
            if (L.outerWidth() < ba) {
                M = ab.scrollHeight > ab.offsetHeight || "scroll" == Y.css("overflow-y") ? ba + cb : ba;
                if (I && (ab.scrollHeight > ab.offsetHeight || "scroll" == Y.css("overflow-y"))) {
                    K.width = aE(M - cb);
                }("" === ca || "" !== bc) && bl(cc, 1, "Possible column misalignment", 6);
            } else {
                M = "100%";
            }
            Z.width = aE(M);
            ac.width = aE(M);
            u && (cc.nScrollFoot.style.width = aE(M));
            !bb && I && (Z.height = aE(U.offsetHeight + cb));
            ca = L.outerWidth();
            W[0].style.width = aE(ca);
            aa.width = aE(ca);
            bc = L.height() > ab.clientHeight || "scroll" == Y.css("overflow-y");
            bb = "padding" + (F.bScrollbarLeft ? "Left" : "Right");
            aa[bb] = bc ? cb + "px" : "0px";
            u && (X[0].style.width = aE(ca), R[0].style.width = aE(ca), R[0].style[bb] = bc ? cb + "px" : "0px");
            Y.scroll();
            if ((cc.bSorted || cc.bFiltered) && !cc._drawHold) {
                ab.scrollTop = 0;
            }
        }

        function bq(m, h, w) {
            for (var v = 0, u = 0, t = h.length, s, p; u < t;) {
                s = h[u].firstChild;
                for (p = w ? w[u].firstChild : null; s;) {
                    1 === s.nodeType && (w ? m(s, p, v) : m(s, v), v++), s = s.nextSibling, p = w ? p.nextSibling : null;
                }
                u++;
            }
        }

        function bV(I) {
            var H = I.nTable,
                G = I.aoColumns,
                F = I.oScroll,
                D = F.sY,
                C = F.sX,
                B = F.sXInner,
                A = G.length,
                z = bN(I, "bVisible"),
                v = aQ("th", I.nTHead),
                x = H.getAttribute("width"),
                y = H.parentNode,
                h = !1,
                w, u, s;
            s = I.oBrowser;
            F = s.bScrollOversize;
            (w = H.style.width) && -1 !== w.indexOf("%") && (x = w);
            for (w = 0; w < z.length; w++) {
                u = G[z[w]], null !== u.sWidth && (u.sWidth = r(u.sWidthOrig, y), h = !0);
            }
            if (F || !h && !C && !D && A == aK(I) && A == v.length) {
                for (w = 0; w < A; w++) {
                    if (z = bW(I, w)) {
                        G[z].sWidth = aE(v.eq(w).width());
                    }
                }
            } else {
                A = aQ(H).clone().css("visibility", "hidden").removeAttr("id");
                A.find("tbody tr").remove();
                var J = aQ("<tr/>").appendTo(A.find("tbody"));
                A.find("thead, tfoot").remove();
                A.append(aQ(I.nTHead).clone()).append(aQ(I.nTFoot).clone());
                A.find("tfoot th, tfoot td").css("width", "");
                v = O(I, A.find("thead")[0]);
                for (w = 0; w < z.length; w++) {
                    u = G[z[w]], v[w].style.width = null !== u.sWidthOrig && "" !== u.sWidthOrig ? aE(u.sWidthOrig) : "";
                }
                if (I.aoData.length) {
                    for (w = 0; w < z.length; w++) {
                        h = z[w], u = G[h], aQ(cf(I, h)).clone(!1).append(u.sContentPadding).appendTo(J);
                    }
                }
                h = aQ("<div/>").css(C || D ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 1,
                    right: 0,
                    overflow: "hidden"
                } : {}).append(A).appendTo(y);
                C && B ? A.width(B) : C ? (A.css("width", "auto"), A.width() < y.clientWidth && A.width(y.clientWidth)) : D ? A.width(y.clientWidth) : x && A.width(x);
                if (C) {
                    for (w = B = 0; w < z.length; w++) {
                        u = G[z[w]], D = s.bBounding ? v[w].getBoundingClientRect().width : aQ(v[w]).outerWidth(), B += null === u.sWidthOrig ? D : parseInt(u.sWidth, 10) + D - aQ(v[w]).width();
                    }
                    A.width(aE(B));
                    H.style.width = aE(B);
                }
                for (w = 0; w < z.length; w++) {
                    if (u = G[z[w]], s = aQ(v[w]).width()) {
                        u.sWidth = aE(s);
                    }
                }
                H.style.width = aE(A.css("width"));
                h.remove();
            }
            x && (H.style.width = aE(x));
            if ((x || C) && !I._reszEvt) {
                H = function() {
                    aQ(d).bind("resize.DT-" + I.sInstance, aX(function() {
                        a2(I);
                    }));
                }, F ? setTimeout(H, 1000) : H(), I._reszEvt = !0;
            }
        }

        function aX(m, h) {
            var t = h !== a ? h : 200,
                s, p;
            return function() {
                var u = this,
                    w = +new Date,
                    v = arguments;
                s && w < s + t ? (clearTimeout(p), p = setTimeout(function() {
                    s = a;
                    m.apply(u, v);
                }, t)) : (s = w, m.apply(u, v));
            };
        }

        function r(m, h) {
            if (!m) {
                return 0;
            }
            var s = aQ("<div/>").css("width", aE(m)).appendTo(h || b.body),
                p = s[0].offsetWidth;
            s.remove();
            return p;
        }

        function cf(m, h) {
            var s = bT(m, h);
            if (0 > s) {
                return null;
            }
            var p = m.aoData[s];
            return !p.nTr ? aQ("<td/>").html(bB(m, s, h, "display"))[0] : p.anCells[h];
        }

        function bT(m, h) {
            for (var v, u = -1, t = -1, s = 0, p = m.aoData.length; s < p; s++) {
                v = bB(m, s, h, "display") + "", v = v.replace(bw, ""), v.length > u && (u = v.length, t = s);
            }
            return t;
        }

        function aE(h) {
            return null === h ? "0px" : "number" == typeof h ? 0 > h ? "0px" : h + "px" : h.match(/\d$/) ? h + "px" : h;
        }

        function a5(y) {
            var x, w, v = [],
                u = y.aoColumns,
                t, s, p, m;
            x = y.aaSortingFixed;
            w = aQ.isPlainObject(x);
            var h = [];
            t = function(z) {
                z.length && !aQ.isArray(z[0]) ? h.push(z) : aQ.merge(h, z);
            };
            aQ.isArray(x) && t(x);
            w && x.pre && t(x.pre);
            t(y.aaSorting);
            w && x.post && t(x.post);
            for (y = 0; y < h.length; y++) {
                m = h[y][0];
                t = u[m].aDataSort;
                x = 0;
                for (w = t.length; x < w; x++) {
                    s = t[x], p = u[s].sType || "string", h[y]._idx === a && (h[y]._idx = aQ.inArray(h[y][1], u[s].asSorting)), v.push({
                        src: m,
                        col: s,
                        dir: h[y][1],
                        index: h[y]._idx,
                        type: p,
                        formatter: aL.ext.type.order[p + "-pre"]
                    });
                }
            }
            return v;
        }

        function bS(z) {
            var y, x, w = [],
                v = aL.ext.type.order,
                u = z.aoData,
                t = 0,
                p, m = z.aiDisplayMaster,
                s;
            by(z);
            s = a5(z);
            y = 0;
            for (x = s.length; y < x; y++) {
                p = s[y], p.formatter && t++, bu(z, p.col);
            }
            if ("ssp" != az(z) && 0 !== s.length) {
                y = 0;
                for (x = m.length; y < x; y++) {
                    w[m[y]] = y;
                }
                t === s.length ? m.sort(function(I, H) {
                    var G, F, D, C, B = s.length,
                        A = u[I]._aSortData,
                        h = u[H]._aSortData;
                    for (D = 0; D < B; D++) {
                        if (C = s[D], G = A[C.col], F = h[C.col], G = G < F ? -1 : G > F ? 1 : 0, 0 !== G) {
                            return "asc" === C.dir ? G : -G;
                        }
                    }
                    G = w[I];
                    F = w[H];
                    return G < F ? -1 : G > F ? 1 : 0;
                }) : m.sort(function(I, H) {
                    var G, F, D, C, B = s.length,
                        A = u[I]._aSortData,
                        h = u[H]._aSortData;
                    for (D = 0; D < B; D++) {
                        if (C = s[D], G = A[C.col], F = h[C.col], C = v[C.type + "-" + C.dir] || v["string-" + C.dir], G = C(G, F), 0 !== G) {
                            return G;
                        }
                    }
                    G = w[I];
                    F = w[H];
                    return G < F ? -1 : G > F ? 1 : 0;
                });
            }
            z.bSorted = !0;
        }

        function aS(x) {
            for (var w, v, u = x.aoColumns, t = a5(x), x = x.oLanguage.oAria, s = 0, p = u.length; s < p; s++) {
                v = u[s];
                var m = v.asSorting;
                w = v.sTitle.replace(/<.*?>/g, "");
                var h = v.nTh;
                h.removeAttribute("aria-sort");
                v.bSortable && (0 < t.length && t[0].col == s ? (h.setAttribute("aria-sort", "asc" == t[0].dir ? "ascending" : "descending"), v = m[t[0].index + 1] || m[0]) : v = m[0], w += "asc" === v ? x.sSortAscending : x.sSortDescending);
                h.setAttribute("aria-label", w);
            }
        }

        function bK(m, h, v, u) {
            var t = m.aaSorting,
                s = m.aoColumns[h].asSorting,
                p = function(x, w) {
                    var y = x._idx;
                    y === a && (y = aQ.inArray(x[1], s));
                    return y + 1 < s.length ? y + 1 : w ? null : 0;
                };
            "number" === typeof t[0] && (t = m.aaSorting = [t]);
            v && m.oFeatures.bSortMulti ? (v = aQ.inArray(h, bx(t, "0")), -1 !== v ? (h = p(t[v], !0), null === h && 1 === t.length && (h = 0), null === h ? t.splice(v, 1) : (t[v][1] = s[h], t[v]._idx = h)) : (t.push([h, s[0], 0]), t[t.length - 1]._idx = 0)) : t.length && t[0][0] == h ? (h = p(t[0]), t.length = 1, t[0][1] = s[h], t[0]._idx = h) : (t.length = 0, t.push([h, s[0]]), t[0]._idx = 0);
            a8(m);
            "function" == typeof u && u(m);
        }

        function bG(m, h, t, s) {
            var p = m.aoColumns[t];
            a1(h, {}, function(u) {
                !1 !== p.bSortable && (m.oFeatures.bProcessing ? (bA(m, !0), setTimeout(function() {
                    bK(m, t, u.shiftKey, s);
                    "ssp" !== az(m) && bA(m, !1);
                }, 0)) : bK(m, t, u.shiftKey, s));
            });
        }

        function g(m) {
            var h = m.aLastSort,
                v = m.oClasses.sSortColumn,
                u = a5(m),
                t = m.oFeatures,
                s, p;
            if (t.bSort && t.bSortClasses) {
                t = 0;
                for (s = h.length; t < s; t++) {
                    p = h[t].src, aQ(bx(m.aoData, "anCells", p)).removeClass(v + (2 > t ? t + 1 : 3));
                }
                t = 0;
                for (s = u.length; t < s; t++) {
                    p = u[t].src, aQ(bx(m.aoData, "anCells", p)).addClass(v + (2 > t ? t + 1 : 3));
                }
            }
            m.aLastSort = u;
        }

        function bu(y, x) {
            var w = y.aoColumns[x],
                v = aL.ext.order[w.sSortDataType],
                u;
            v && (u = v.call(y.oInstance, y, x, bg(y, x)));
            for (var t, s = aL.ext.type.order[w.sType + "-pre"], m = 0, p = y.aoData.length; m < p; m++) {
                if (w = y.aoData[m], w._aSortData || (w._aSortData = []), !w._aSortData[x] || v) {
                    t = v ? u[m] : bB(y, m, x, "sort"), w._aSortData[x] = s ? s(t) : t;
                }
            }
        }

        function b3(m) {
            if (m.oFeatures.bStateSave && !m.bDestroying) {
                var h = {
                    time: +new Date,
                    start: m._iDisplayStart,
                    length: m._iDisplayLength,
                    order: aQ.extend(!0, [], m.aaSorting),
                    search: b8(m.oPreviousSearch),
                    columns: aQ.map(m.aoColumns, function(p, s) {
                        return {
                            visible: p.bVisible,
                            search: b8(m.aoPreSearchCols[s])
                        };
                    })
                };
                aC(m, "aoStateSaveParams", "stateSaveParams", [m, h]);
                m.oSavedState = h;
                m.fnStateSaveCallback.call(m.oInstance, m, h);
            }
        }

        function aq(m) {
            var h, u, t = m.aoColumns;
            if (m.oFeatures.bStateSave) {
                var s = m.fnStateLoadCallback.call(m.oInstance, m);
                if (s && s.time && (h = aC(m, "aoStateLoadParams", "stateLoadParams", [m, s]), -1 === aQ.inArray(!1, h) && (h = m.iStateDuration, !(0 < h && s.time < +new Date - 1000 * h) && t.length === s.columns.length))) {
                    m.oLoadedState = aQ.extend(!0, {}, s);
                    s.start !== a && (m._iDisplayStart = s.start, m.iInitDisplayStart = s.start);
                    s.length !== a && (m._iDisplayLength = s.length);
                    s.order !== a && (m.aaSorting = [], aQ.each(s.order, function(v, w) {
                        m.aaSorting.push(w[0] >= t.length ? [0, w[1]] : w);
                    }));
                    s.search !== a && aQ.extend(m.oPreviousSearch, bP(s.search));
                    h = 0;
                    for (u = s.columns.length; h < u; h++) {
                        var p = s.columns[h];
                        p.visible !== a && (t[h].bVisible = p.visible);
                        p.search !== a && aQ.extend(m.aoPreSearchCols[h], bP(p.search));
                    }
                    aC(m, "aoStateLoaded", "stateLoaded", [m, s]);
                }
            }
        }

        function bJ(m) {
            var h = aL.settings,
                m = aQ.inArray(m, bx(h, "nTable"));
            return -1 !== m ? h[m] : null;
        }

        function bl(m, h, s, p) {
            s = "DataTables warning: " + (m ? "table id=" + m.sTableId + " - " : "") + s;
            p && (s += ". For more information about this error, please see http://datatables.net/tn/" + p);
            if (h) {
                d.console && console.log && console.log(s);
            } else {
                if (h = aL.ext, h = h.sErrMode || h.errMode, m && aC(m, null, "error", [m, p, s]), "alert" == h) {
                    alert(s);
                } else {
                    if ("throw" == h) {
                        throw Error(s);
                    }
                    "function" == typeof h && h(m, p, s);
                }
            }
        }

        function bs(m, h, s, p) {
            aQ.isArray(s) ? aQ.each(s, function(u, t) {
                aQ.isArray(t) ? bs(m, h, t[0], t[1]) : bs(m, h, t);
            }) : (p === a && (p = s), h[s] !== a && (m[p] = h[s]));
        }

        function N(m, h, t) {
            var s, p;
            for (p in h) {
                h.hasOwnProperty(p) && (s = h[p], aQ.isPlainObject(s) ? (aQ.isPlainObject(m[p]) || (m[p] = {}), aQ.extend(!0, m[p], s)) : m[p] = t && "data" !== p && "aaData" !== p && aQ.isArray(s) ? s.slice() : s);
            }
            return m;
        }

        function a1(m, h, p) {
            aQ(m).bind("click.DT", h, function(s) {
                m.blur();
                p(s);
            }).bind("keypress.DT", h, function(s) {
                13 === s.which && (s.preventDefault(), p(s));
            }).bind("selectstart.DT", function() {
                return !1;
            });
        }

        function ax(m, h, s, p) {
            s && m[h].push({
                fn: s,
                sName: p
            });
        }

        function aC(m, h, t, s) {
            var p = [];
            h && (p = aQ.map(m[h].slice().reverse(), function(u) {
                return u.fn.apply(m.oInstance, s);
            }));
            null !== t && (h = aQ.Event(t + ".dt"), aQ(m.nTable).trigger(h, s), p.push(h.result));
            return p;
        }

        function i(m) {
            var h = m._iDisplayStart,
                s = m.fnDisplayEnd(),
                p = m._iDisplayLength;
            h >= s && (h = s - p);
            h -= h % p;
            if (-1 === p || 0 > h) {
                h = 0;
            }
            m._iDisplayStart = h;
        }

        function aY(m, h) {
            var s = m.renderer,
                p = aL.ext.renderer[h];
            return aQ.isPlainObject(s) && s[h] ? p[s[h]] || p._ : "string" === typeof s ? p[s] || p._ : p._;
        }

        function az(h) {
            return h.oFeatures.bServerSide ? "ssp" : h.ajax || h.sAjaxSource ? "ajax" : "dom";
        }

        function cd(m, h) {
            var s = [],
                s = cj.numbers_length,
                p = Math.floor(s / 2);
            h <= s ? s = a4(0, h) : m <= p ? (s = a4(0, s - 2), s.push("ellipsis"), s.push(h - 1)) : (m >= h - 1 - p ? s = a4(h - (s - 2), h) : (s = a4(m - p + 2, m + p - 1), s.push("ellipsis"), s.push(h - 1)), s.splice(0, 0, "ellipsis"), s.splice(0, 0, 0));
            s.DT_el = "span";
            return s;
        }

        function aJ(h) {
            aQ.each({
                num: function(m) {
                    return bR(m, h);
                },
                "num-fmt": function(m) {
                    return bR(m, h, aB);
                },
                "html-num": function(m) {
                    return bR(m, h, bo);
                },
                "html-num-fmt": function(m) {
                    return bR(m, h, bo, aB);
                }
            }, function(m, p) {
                aD.type.order[m + h + "-pre"] = p;
                m.match(/^html\-/) && (aD.type.search[m + h] = aD.type.search.html);
            });
        }

        function bY(h) {
            return function() {
                var m = [bJ(this[aL.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                return aL.ext.internal[h].apply(this, m);
            };
        }
        var aL, aD, aF, aI, aG, ai = {},
            bE = /[\r\n]/g,
            bo = /<.*?>/g,
            bL = /^[\w\+\-]/,
            a9 = /[\w\+\-]$/,
            j = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
            aB = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,
            bj = function(h) {
                return !h || !0 === h || "-" === h ? !0 : !1;
            },
            aW = function(m) {
                var h = parseInt(m, 10);
                return !isNaN(h) && isFinite(m) ? h : null;
            },
            au = function(m, h) {
                ai[h] || (ai[h] = RegExp(av(h), "g"));
                return "string" === typeof m && "." !== h ? m.replace(/\./g, "").replace(ai[h], ".") : m;
            },
            k = function(m, h, s) {
                var p = "string" === typeof m;
                if (bj(m)) {
                    return !0;
                }
                h && p && (m = au(m, h));
                s && p && (m = m.replace(aB, ""));
                return !isNaN(parseFloat(m)) && isFinite(m);
            },
            af = function(m, h, p) {
                return bj(m) ? !0 : !(bj(m) || "string" === typeof m) ? null : k(m.replace(bo, ""), h, p) ? !0 : null;
            },
            bx = function(m, h, u) {
                var t = [],
                    s = 0,
                    p = m.length;
                if (u !== a) {
                    for (; s < p; s++) {
                        m[s] && m[s][h] && t.push(m[s][h][u]);
                    }
                } else {
                    for (; s < p; s++) {
                        m[s] && t.push(m[s][h]);
                    }
                }
                return t;
            },
            am = function(m, h, v, u) {
                var t = [],
                    s = 0,
                    p = h.length;
                if (u !== a) {
                    for (; s < p; s++) {
                        m[h[s]][v] && t.push(m[h[s]][v][u]);
                    }
                } else {
                    for (; s < p; s++) {
                        t.push(m[h[s]][v]);
                    }
                }
                return t;
            },
            a4 = function(m, h) {
                var t = [],
                    s;
                h === a ? (h = 0, s = m) : (s = h, h = m);
                for (var p = h; p < s; p++) {
                    t.push(p);
                }
                return t;
            },
            f = function(m) {
                for (var h = [], s = 0, p = m.length; s < p; s++) {
                    m[s] && h.push(m[s]);
                }
                return h;
            },
            ap = function(m) {
                var h = [],
                    v, u, t = m.length,
                    s, p = 0;
                u = 0;
                m: for (; u < t; u++) {
                    v = m[u];
                    for (s = 0; s < p; s++) {
                        if (h[s] === v) {
                            continue m;
                        }
                    }
                    h.push(v);
                    p++;
                }
                return h;
            },
            bC = function(m, h, p) {
                m[h] !== a && (m[p] = m[h]);
            },
            al = /\[.*?\]$/,
            a6 = /\(\)$/,
            ae = aQ("<div>")[0],
            b5 = ae.textContent !== a,
            bw = /<.*?>/g;
        aL = function(m) {
            this.$ = function(v, u) {
                return this.api(!0).$(v, u);
            };
            this._ = function(v, u) {
                return this.api(!0).rows(v, u).data();
            };
            this.api = function(u) {
                return u ? new aF(bJ(this[aD.iApiIndex])) : new aF(this);
            };
            this.fnAddData = function(v, u) {
                var x = this.api(!0),
                    w = aQ.isArray(v) && (aQ.isArray(v[0]) || aQ.isPlainObject(v[0])) ? x.rows.add(v) : x.row.add(v);
                (u === a || u) && x.draw();
                return w.flatten().toArray();
            };
            this.fnAdjustColumnSizing = function(v) {
                var u = this.api(!0).columns.adjust(),
                    x = u.settings()[0],
                    w = x.oScroll;
                v === a || v ? u.draw(!1) : ("" !== w.sX || "" !== w.sY) && a0(x);
            };
            this.fnClearTable = function(v) {
                var u = this.api(!0).clear();
                (v === a || v) && u.draw();
            };
            this.fnClose = function(u) {
                this.api(!0).row(u).child.hide();
            };
            this.fnDeleteRow = function(v, u, z) {
                var y = this.api(!0),
                    v = y.rows(v),
                    x = v.settings()[0],
                    w = x.aoData[v[0][0]];
                v.remove();
                u && u.call(this, x, w);
                (z === a || z) && y.draw();
                return w;
            };
            this.fnDestroy = function(u) {
                this.api(!0).destroy(u);
            };
            this.fnDraw = function(u) {
                this.api(!0).draw(u);
            };
            this.fnFilter = function(v, u, z, y, x, w) {
                x = this.api(!0);
                null === u || u === a ? x.search(v, z, y, w) : x.column(u).search(v, z, y, w);
                x.draw();
            };
            this.fnGetData = function(v, u) {
                var x = this.api(!0);
                if (v !== a) {
                    var w = v.nodeName ? v.nodeName.toLowerCase() : "";
                    return u !== a || "td" == w || "th" == w ? x.cell(v, u).data() : x.row(v).data() || null;
                }
                return x.data().toArray();
            };
            this.fnGetNodes = function(v) {
                var u = this.api(!0);
                return v !== a ? u.row(v).node() : u.rows().nodes().flatten().toArray();
            };
            this.fnGetPosition = function(v) {
                var u = this.api(!0),
                    w = v.nodeName.toUpperCase();
                return "TR" == w ? u.row(v).index() : "TD" == w || "TH" == w ? (v = u.cell(v).index(), [v.row, v.columnVisible, v.column]) : null;
            };
            this.fnIsOpen = function(u) {
                return this.api(!0).row(u).child.isShown();
            };
            this.fnOpen = function(v, u, w) {
                return this.api(!0).row(v).child(u, w).show().child()[0];
            };
            this.fnPageChange = function(v, u) {
                var w = this.api(!0).page(v);
                (u === a || u) && w.draw(!1);
            };
            this.fnSetColumnVis = function(v, u, w) {
                v = this.api(!0).column(v).visible(u);
                (w === a || w) && v.columns.adjust().draw();
            };
            this.fnSettings = function() {
                return bJ(this[aD.iApiIndex]);
            };
            this.fnSort = function(u) {
                this.api(!0).order(u).draw();
            };
            this.fnSortListener = function(v, u, w) {
                this.api(!0).order.listener(v, u, w);
            };
            this.fnUpdate = function(v, u, z, y, x) {
                var w = this.api(!0);
                z === a || null === z ? w.row(u).data(v) : w.cell(u, z).data(v);
                (x === a || x) && w.columns.adjust();
                (y === a || y) && w.draw();
                return 0;
            };
            this.fnVersionCheck = aD.fnVersionCheck;
            var h = this,
                t = m === a,
                s = this.length;
            t && (m = {});
            this.oApi = this.internal = aD.internal;
            for (var p in aL.ext.internal) {
                p && (this[p] = bY(p));
            }
            this.each(function() {
                var G = {},
                    G = 1 < s ? N(G, m, !0) : m,
                    F = 0,
                    D, C = this.getAttribute("id"),
                    A = !1,
                    B = aL.defaults,
                    w = aQ(this);
                if ("table" != this.nodeName.toLowerCase()) {
                    bl(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                } else {
                    ak(B);
                    l(B.column);
                    bp(B, B, !0);
                    bp(B.column, B.column, !0);
                    bp(B, aQ.extend(G, w.data()));
                    var x = aL.settings,
                        F = 0;
                    for (D = x.length; F < D; F++) {
                        var y = x[F];
                        if (y.nTable == this || y.nTHead.parentNode == this || y.nTFoot && y.nTFoot.parentNode == this) {
                            F = G.bRetrieve !== a ? G.bRetrieve : B.bRetrieve;
                            if (t || F) {
                                return y.oInstance;
                            }
                            if (G.bDestroy !== a ? G.bDestroy : B.bDestroy) {
                                y.oInstance.fnDestroy();
                                break;
                            } else {
                                bl(y, 0, "Cannot reinitialise DataTable", 3);
                                return;
                            }
                        }
                        if (y.sTableId == this.id) {
                            x.splice(F, 1);
                            break;
                        }
                    }
                    if (null === C || "" === C) {
                        this.id = C = "DataTables_Table_" + aL.ext._unique++;
                    }
                    var z = aQ.extend(!0, {}, aL.models.oSettings, {
                        sDestroyWidth: w[0].style.width,
                        sInstance: C,
                        sTableId: C
                    });
                    z.nTable = this;
                    z.oApi = h.internal;
                    z.oInit = G;
                    x.push(z);
                    z.oInstance = 1 === h.length ? h : w.dataTable();
                    ak(G);
                    G.oLanguage && a7(G.oLanguage);
                    G.aLengthMenu && !G.iDisplayLength && (G.iDisplayLength = aQ.isArray(G.aLengthMenu[0]) ? G.aLengthMenu[0][0] : G.aLengthMenu[0]);
                    G = N(aQ.extend(!0, {}, B), G);
                    bs(z.oFeatures, G, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));
                    bs(z, G, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"],
                        ["oSearch", "oPreviousSearch"],
                        ["aoSearchCols", "aoPreSearchCols"],
                        ["iDisplayLength", "_iDisplayLength"],
                        ["bJQueryUI", "bJUI"]
                    ]);
                    bs(z.oScroll, G, [
                        ["sScrollX", "sX"],
                        ["sScrollXInner", "sXInner"],
                        ["sScrollY", "sY"],
                        ["bScrollCollapse", "bCollapse"]
                    ]);
                    bs(z.oLanguage, G, "fnInfoCallback");
                    ax(z, "aoDrawCallback", G.fnDrawCallback, "user");
                    ax(z, "aoServerParams", G.fnServerParams, "user");
                    ax(z, "aoStateSaveParams", G.fnStateSaveParams, "user");
                    ax(z, "aoStateLoadParams", G.fnStateLoadParams, "user");
                    ax(z, "aoStateLoaded", G.fnStateLoaded, "user");
                    ax(z, "aoRowCallback", G.fnRowCallback, "user");
                    ax(z, "aoRowCreatedCallback", G.fnCreatedRow, "user");
                    ax(z, "aoHeaderCallback", G.fnHeaderCallback, "user");
                    ax(z, "aoFooterCallback", G.fnFooterCallback, "user");
                    ax(z, "aoInitComplete", G.fnInitComplete, "user");
                    ax(z, "aoPreDrawCallback", G.fnPreDrawCallback, "user");
                    z.rowIdFn = bf(G.rowId);
                    b7(z);
                    C = z.oClasses;
                    G.bJQueryUI ? (aQ.extend(C, aL.ext.oJUIClasses, G.oClasses), G.sDom === B.sDom && "lfrtip" === B.sDom && (z.sDom = '<"H"lfr>t<"F"ip>'), z.renderer) ? aQ.isPlainObject(z.renderer) && !z.renderer.header && (z.renderer.header = "jqueryui") : z.renderer = "jqueryui" : aQ.extend(C, aL.ext.classes, G.oClasses);
                    w.addClass(C.sTable);
                    z.iInitDisplayStart === a && (z.iInitDisplayStart = G.iDisplayStart, z._iDisplayStart = G.iDisplayStart);
                    null !== G.iDeferLoading && (z.bDeferLoading = !0, F = aQ.isArray(G.iDeferLoading), z._iRecordsDisplay = F ? G.iDeferLoading[0] : G.iDeferLoading, z._iRecordsTotal = F ? G.iDeferLoading[1] : G.iDeferLoading);
                    var J = z.oLanguage;
                    aQ.extend(!0, J, G.oLanguage);
                    "" !== J.sUrl && (aQ.ajax({
                        dataType: "json",
                        url: J.sUrl,
                        success: function(u) {
                            a7(u);
                            bp(B.oLanguage, u);
                            aQ.extend(true, J, u);
                            aO(z);
                        },
                        error: function() {
                            aO(z);
                        }
                    }), A = !0);
                    null === G.asStripeClasses && (z.asStripeClasses = [C.sStripeOdd, C.sStripeEven]);
                    var F = z.asStripeClasses,
                        K = w.children("tbody").find("tr").eq(0); - 1 !== aQ.inArray(!0, aQ.map(F, function(u) {
                        return K.hasClass(u);
                    })) && (aQ("tbody tr", this).removeClass(F.join(" ")), z.asDestroyStripes = F.slice());
                    x = [];
                    F = this.getElementsByTagName("thead");
                    0 !== F.length && (b9(z.aoHeader, F[0]), x = O(z));
                    if (null === G.aoColumns) {
                        y = [];
                        F = 0;
                        for (D = x.length; F < D; F++) {
                            y.push(null);
                        }
                    } else {
                        y = G.aoColumns;
                    }
                    F = 0;
                    for (D = y.length; F < D; F++) {
                        ch(z, x ? x[F] : null);
                    }
                    bk(z, G.aoColumnDefs, y, function(v, u) {
                        cg(z, v, u);
                    });
                    if (K.length) {
                        var I = function(v, u) {
                            return v.getAttribute("data-" + u) !== null ? u : null;
                        };
                        aQ(K[0]).children("th, td").each(function(v, u) {
                            var P = z.aoColumns[v];
                            if (P.mData === v) {
                                var M = I(u, "sort") || I(u, "order"),
                                    L = I(u, "filter") || I(u, "search");
                                if (M !== null || L !== null) {
                                    P.mData = {
                                        _: v + ".display",
                                        sort: M !== null ? v + ".@data-" + M : a,
                                        type: M !== null ? v + ".@data-" + M : a,
                                        filter: L !== null ? v + ".@data-" + L : a
                                    };
                                    cg(z, v);
                                }
                            }
                        });
                    }
                    var H = z.oFeatures;
                    G.bStateSave && (H.bStateSave = !0, aq(z, G), ax(z, "aoDrawCallback", b3, "state_save"));
                    if (G.aaSorting === a) {
                        x = z.aaSorting;
                        F = 0;
                        for (D = x.length; F < D; F++) {
                            x[F][1] = z.aoColumns[F].asSorting[0];
                        }
                    }
                    g(z);
                    H.bSort && ax(z, "aoDrawCallback", function() {
                        if (z.bSorted) {
                            var v = a5(z),
                                u = {};
                            aQ.each(v, function(L, M) {
                                u[M.src] = M.dir;
                            });
                            aC(z, null, "order", [z, v, u]);
                            aS(z);
                        }
                    });
                    ax(z, "aoDrawCallback", function() {
                        (z.bSorted || az(z) === "ssp" || H.bDeferRender) && g(z);
                    }, "sc");
                    F = w.children("caption").each(function() {
                        this._captionSide = w.css("caption-side");
                    });
                    D = w.children("thead");
                    0 === D.length && (D = aQ("<thead/>").appendTo(this));
                    z.nTHead = D[0];
                    D = w.children("tbody");
                    0 === D.length && (D = aQ("<tbody/>").appendTo(this));
                    z.nTBody = D[0];
                    D = w.children("tfoot");
                    if (0 === D.length && 0 < F.length && ("" !== z.oScroll.sX || "" !== z.oScroll.sY)) {
                        D = aQ("<tfoot/>").appendTo(this);
                    }
                    0 === D.length || 0 === D.children().length ? w.addClass(C.sNoFooter) : 0 < D.length && (z.nTFoot = D[0], b9(z.aoFooter, z.nTFoot));
                    if (G.aaData) {
                        for (F = 0; F < G.aaData.length; F++) {
                            bi(z, G.aaData[F]);
                        }
                    } else {
                        (z.bDeferLoading || "dom" == az(z)) && bU(z, aQ(z.nTBody).children("tr"));
                    }
                    z.aiDisplay = z.aiDisplayMaster.slice();
                    z.bInitialised = !0;
                    !1 === A && aO(z);
                }
            });
            h = null;
            return this;
        };
        var b2 = [],
            aA = Array.prototype,
            aH = function(m) {
                var h, t, s = aL.settings,
                    p = aQ.map(s, function(u) {
                        return u.nTable;
                    });
                if (m) {
                    if (m.nTable && m.oApi) {
                        return [m];
                    }
                    if (m.nodeName && "table" === m.nodeName.toLowerCase()) {
                        return h = aQ.inArray(m, p), -1 !== h ? [s[h]] : null;
                    }
                    if (m && "function" === typeof m.settings) {
                        return m.settings().toArray();
                    }
                    "string" === typeof m ? t = aQ(m) : m instanceof aQ && (t = m);
                } else {
                    return [];
                }
                if (t) {
                    return t.map(function() {
                        h = aQ.inArray(this, p);
                        return -1 !== h ? s[h] : null;
                    }).toArray();
                }
            };
        aF = function(m, h) {
            if (!(this instanceof aF)) {
                return new aF(m, h);
            }
            var u = [],
                t = function(v) {
                    (v = aH(v)) && (u = u.concat(v));
                };
            if (aQ.isArray(m)) {
                for (var s = 0, p = m.length; s < p; s++) {
                    t(m[s]);
                }
            } else {
                t(m);
            }
            this.context = ap(u);
            h && aQ.merge(this, h);
            this.selector = {
                rows: null,
                cols: null,
                opts: null
            };
            aF.extend(this, this, b2);
        };
        aL.Api = aF;
        aQ.extend(aF.prototype, {
            any: function() {
                return 0 !== this.count();
            },
            concat: aA.concat,
            context: [],
            count: function() {
                return this.flatten().length;
            },
            each: function(m) {
                for (var h = 0, p = this.length; h < p; h++) {
                    m.call(this, this[h], h, this);
                }
                return this;
            },
            eq: function(m) {
                var h = this.context;
                return h.length > m ? new aF(h[m], this[m]) : null;
            },
            filter: function(m) {
                var h = [];
                if (aA.filter) {
                    h = aA.filter.call(this, m, this);
                } else {
                    for (var s = 0, p = this.length; s < p; s++) {
                        m.call(this, this[s], s, this) && h.push(this[s]);
                    }
                }
                return new aF(this.context, h);
            },
            flatten: function() {
                var h = [];
                return new aF(this.context, h.concat.apply(h, this.toArray()));
            },
            join: aA.join,
            indexOf: aA.indexOf || function(m, h) {
                for (var s = h || 0, p = this.length; s < p; s++) {
                    if (this[s] === m) {
                        return s;
                    }
                }
                return -1;
            },
            iterator: function(H, G, F, D) {
                var C = [],
                    B, A, z, y, v, x = this.context,
                    w, s, t = this.selector;
                "string" === typeof H && (D = F, F = G, G = H, H = !1);
                A = 0;
                for (z = x.length; A < z; A++) {
                    var u = new aF(x[A]);
                    if ("table" === G) {
                        B = F.call(u, x[A], A), B !== a && C.push(B);
                    } else {
                        if ("columns" === G || "rows" === G) {
                            B = F.call(u, x[A], this[A], A), B !== a && C.push(B);
                        } else {
                            if ("column" === G || "column-rows" === G || "row" === G || "cell" === G) {
                                s = this[A];
                                "column-rows" === G && (w = aP(x[A], t.opts));
                                y = 0;
                                for (v = s.length; y < v; y++) {
                                    B = s[y], B = "cell" === G ? F.call(u, x[A], B.row, B.column, A, y) : F.call(u, x[A], B, A, y, w), B !== a && C.push(B);
                                }
                            }
                        }
                    }
                }
                return C.length || D ? (H = new aF(x, H ? C.concat.apply([], C) : C), G = H.selector, G.rows = t.rows, G.cols = t.cols, G.opts = t.opts, H) : this;
            },
            lastIndexOf: aA.lastIndexOf || function(m, h) {
                return this.indexOf.apply(this.toArray.reverse(), arguments);
            },
            length: 0,
            map: function(m) {
                var h = [];
                if (aA.map) {
                    h = aA.map.call(this, m, this);
                } else {
                    for (var s = 0, p = this.length; s < p; s++) {
                        h.push(m.call(this, this[s], s));
                    }
                }
                return new aF(this.context, h);
            },
            pluck: function(h) {
                return this.map(function(m) {
                    return m[h];
                });
            },
            pop: aA.pop,
            push: aA.push,
            reduce: aA.reduce || function(m, h) {
                return bO(this, m, h, 0, this.length, 1);
            },
            reduceRight: aA.reduceRight || function(m, h) {
                return bO(this, m, h, this.length - 1, -1, -1);
            },
            reverse: aA.reverse,
            selector: null,
            shift: aA.shift,
            sort: aA.sort,
            splice: aA.splice,
            toArray: function() {
                return aA.slice.call(this);
            },
            to$: function() {
                return aQ(this);
            },
            toJQuery: function() {
                return aQ(this);
            },
            unique: function() {
                return new aF(this.context, ap(this));
            },
            unshift: aA.unshift
        });
        aF.extend = function(m, h, v) {
            if (v.length && h && (h instanceof aF || h.__dt_wrapper)) {
                var u, t, s, p = function(x, w, y) {
                    return function() {
                        var z = w.apply(x, arguments);
                        aF.extend(z, z, y.methodExt);
                        return z;
                    };
                };
                u = 0;
                for (t = v.length; u < t; u++) {
                    s = v[u], h[s.name] = "function" === typeof s.val ? p(m, s.val, s) : aQ.isPlainObject(s.val) ? {} : s.val, h[s.name].__dt_wrapper = !0, aF.extend(m, h[s.name], s.propExt);
                }
            }
        };
        aF.register = aI = function(y, x) {
            if (aQ.isArray(y)) {
                for (var w = 0, v = y.length; w < v; w++) {
                    aF.register(y[w], x);
                }
            } else {
                for (var u = y.split("."), t = b2, s, p, w = 0, v = u.length; w < v; w++) {
                    s = (p = -1 !== u[w].indexOf("()")) ? u[w].replace("()", "") : u[w];
                    var m;
                    y: {
                        m = 0;
                        for (var h = t.length; m < h; m++) {
                            if (t[m].name === s) {
                                m = t[m];
                                break y;
                            }
                        }
                        m = null;
                    }
                    m || (m = {
                        name: s,
                        val: {},
                        methodExt: [],
                        propExt: []
                    }, t.push(m));
                    w === v - 1 ? m.val = x : t = p ? m.methodExt : m.propExt;
                }
            }
        };
        aF.registerPlural = aG = function(m, h, p) {
            aF.register(m, p);
            aF.register(h, function() {
                var s = p.apply(this, arguments);
                return s === this ? this : s instanceof aF ? s.length ? aQ.isArray(s[0]) ? new aF(s.context, s[0]) : s[0] : a : s;
            });
        };
        aI("tables()", function(m) {
            var h;
            if (m) {
                h = aF;
                var s = this.context;
                if ("number" === typeof m) {
                    m = [s[m]];
                } else {
                    var p = aQ.map(s, function(t) {
                            return t.nTable;
                        }),
                        m = aQ(p).filter(m).map(function() {
                            var t = aQ.inArray(this, p);
                            return s[t];
                        }).toArray();
                }
                h = new h(m);
            } else {
                h = this;
            }
            return h;
        });
        aI("table()", function(m) {
            var m = this.tables(m),
                h = m.context;
            return h.length ? new aF(h[0]) : m;
        });
        aG("tables().nodes()", "table().node()", function() {
            return this.iterator("table", function(h) {
                return h.nTable;
            }, 1);
        });
        aG("tables().body()", "table().body()", function() {
            return this.iterator("table", function(h) {
                return h.nTBody;
            }, 1);
        });
        aG("tables().header()", "table().header()", function() {
            return this.iterator("table", function(h) {
                return h.nTHead;
            }, 1);
        });
        aG("tables().footer()", "table().footer()", function() {
            return this.iterator("table", function(h) {
                return h.nTFoot;
            }, 1);
        });
        aG("tables().containers()", "table().container()", function() {
            return this.iterator("table", function(h) {
                return h.nTableWrapper;
            }, 1);
        });
        aI("draw()", function(h) {
            return this.iterator("table", function(m) {
                "page" === h ? bh(m) : ("string" === typeof h && (h = "full-hold" === h ? !1 : !0), a8(m, !1 === h));
            });
        });
        aI("page()", function(h) {
            return h === a ? this.page.info().page : this.iterator("table", function(m) {
                b4(m, h);
            });
        });
        aI("page.info()", function() {
            if (0 === this.context.length) {
                return a;
            }
            var m = this.context[0],
                h = m._iDisplayStart,
                t = m._iDisplayLength,
                s = m.fnRecordsDisplay(),
                p = -1 === t;
            return {
                page: p ? 0 : Math.floor(h / t),
                pages: p ? 1 : Math.ceil(s / t),
                start: h,
                end: m.fnDisplayEnd(),
                length: t,
                recordsTotal: m.fnRecordsTotal(),
                recordsDisplay: s,
                serverSide: "ssp" === az(m)
            };
        });
        aI("page.len()", function(h) {
            return h === a ? 0 !== this.context.length ? this.context[0]._iDisplayLength : a : this.iterator("table", function(m) {
                ag(m, h);
            });
        });
        var bI = function(m, h, t) {
            if (t) {
                var s = new aF(m);
                s.one("draw", function() {
                    t(s.ajax.json());
                });
            }
            if ("ssp" == az(m)) {
                a8(m, h);
            } else {
                bA(m, !0);
                var p = m.jqXHR;
                p && 4 !== p.readyState && p.abort();
                ck(m, [], function(w) {
                    bv(m);
                    for (var w = bZ(m, w), v = 0, u = w.length; v < u; v++) {
                        bi(m, w[v]);
                    }
                    a8(m, h);
                    bA(m, !1);
                });
            }
        };
        aI("ajax.json()", function() {
            var h = this.context;
            if (0 < h.length) {
                return h[0].json;
            }
        });
        aI("ajax.params()", function() {
            var h = this.context;
            if (0 < h.length) {
                return h[0].oAjaxData;
            }
        });
        aI("ajax.reload()", function(m, h) {
            return this.iterator("table", function(p) {
                bI(p, !1 === h, m);
            });
        });
        aI("ajax.url()", function(m) {
            var h = this.context;
            if (m === a) {
                if (0 === h.length) {
                    return a;
                }
                h = h[0];
                return h.ajax ? aQ.isPlainObject(h.ajax) ? h.ajax.url : h.ajax : h.sAjaxSource;
            }
            return this.iterator("table", function(p) {
                aQ.isPlainObject(p.ajax) ? p.ajax.url = m : p.ajax = m;
            });
        });
        aI("ajax.url().load()", function(m, h) {
            return this.iterator("table", function(p) {
                bI(p, !1 === h, m);
            });
        });
        var b6 = function(B, A, z, y, x) {
                var w = [],
                    v, u, t, h, s, p;
                t = typeof A;
                if (!A || "string" === t || "function" === t || A.length === a) {
                    A = [A];
                }
                t = 0;
                for (h = A.length; t < h; t++) {
                    u = A[t] && A[t].split ? A[t].split(",") : [A[t]];
                    s = 0;
                    for (p = u.length; s < p; s++) {
                        (v = z("string" === typeof u[s] ? aQ.trim(u[s]) : u[s])) && v.length && (w = w.concat(v));
                    }
                }
                B = aD.selector[B];
                if (B.length) {
                    t = 0;
                    for (h = B.length; t < h; t++) {
                        w = B[t](y, x, w);
                    }
                }
                return ap(w);
            },
            bz = function(h) {
                h || (h = {});
                h.filter && h.search === a && (h.search = h.filter);
                return aQ.extend({
                    search: "none",
                    order: "current",
                    page: "all"
                }, h);
            },
            bM = function(m) {
                for (var h = 0, p = m.length; h < p; h++) {
                    if (0 < m[h].length) {
                        return m[0] = m[h], m[0].length = 1, m.length = 1, m.context = [m.context[h]], m;
                    }
                }
                m.length = 0;
                return m;
            },
            aP = function(m, h) {
                var w, v, u, t = [],
                    s = m.aiDisplay;
                w = m.aiDisplayMaster;
                var p = h.search;
                v = h.order;
                u = h.page;
                if ("ssp" == az(m)) {
                    return "removed" === p ? [] : a4(0, w.length);
                }
                if ("current" == u) {
                    w = m._iDisplayStart;
                    for (v = m.fnDisplayEnd(); w < v; w++) {
                        t.push(s[w]);
                    }
                } else {
                    if ("current" == v || "applied" == v) {
                        t = "none" == p ? w.slice() : "applied" == p ? s.slice() : aQ.map(w, function(x) {
                            return -1 === aQ.inArray(x, s) ? x : null;
                        });
                    } else {
                        if ("index" == v || "original" == v) {
                            w = 0;
                            for (v = m.aoData.length; w < v; w++) {
                                "none" == p ? t.push(w) : (u = aQ.inArray(w, s), (-1 === u && "removed" == p || 0 <= u && "applied" == p) && t.push(w));
                            }
                        }
                    }
                }
                return t;
            };
        aI("rows()", function(m, h) {
            m === a ? m = "" : aQ.isPlainObject(m) && (h = m, m = "");
            var h = bz(h),
                p = this.iterator("table", function(t) {
                    var s = h;
                    return b6("row", m, function(v) {
                        var u = aW(v);
                        if (u !== null && !s) {
                            return [u];
                        }
                        var w = aP(t, s);
                        if (u !== null && aQ.inArray(u, w) !== -1) {
                            return [u];
                        }
                        if (!v) {
                            return w;
                        }
                        if (typeof v === "function") {
                            return aQ.map(w, function(x) {
                                var y = t.aoData[x];
                                return v(x, y._aData, y.nTr) ? x : null;
                            });
                        }
                        u = f(am(t.aoData, w, "nTr"));
                        if (v.nodeName && aQ.inArray(v, u) !== -1) {
                            return [v._DT_RowIndex];
                        }
                        if (typeof v === "string" && v.charAt(0) === "#") {
                            w = t.aIds[v.replace(/^#/, "")];
                            if (w !== a) {
                                return [w.idx];
                            }
                        }
                        return aQ(u).filter(v).map(function() {
                            return this._DT_RowIndex;
                        }).toArray();
                    }, t, s);
                }, 1);
            p.selector.rows = m;
            p.selector.opts = h;
            return p;
        });
        aI("rows().nodes()", function() {
            return this.iterator("row", function(m, h) {
                return m.aoData[h].nTr || a;
            }, 1);
        });
        aI("rows().data()", function() {
            return this.iterator(!0, "rows", function(m, h) {
                return am(m.aoData, h, "_aData");
            }, 1);
        });
        aG("rows().cache()", "row().cache()", function(h) {
            return this.iterator("row", function(m, s) {
                var p = m.aoData[s];
                return "search" === h ? p._aFilterData : p._aSortData;
            }, 1);
        });
        aG("rows().invalidate()", "row().invalidate()", function(h) {
            return this.iterator("row", function(m, p) {
                n(m, p, h);
            });
        });
        aG("rows().indexes()", "row().index()", function() {
            return this.iterator("row", function(m, h) {
                return h;
            }, 1);
        });
        aG("rows().ids()", "row().id()", function(p) {
            for (var m = [], x = this.context, w = 0, v = x.length; w < v; w++) {
                for (var u = 0, t = this[w].length; u < t; u++) {
                    var s = x[w].rowIdFn(x[w].aoData[this[w][u]]._aData);
                    m.push((!0 === p ? "#" : "") + s);
                }
            }
            return new aF(x, m);
        });
        aG("rows().remove()", "row().remove()", function() {
            var h = this;
            this.iterator("row", function(m, w, v) {
                var u = m.aoData,
                    t = u[w];
                u.splice(w, 1);
                for (var s = 0, p = u.length; s < p; s++) {
                    null !== u[s].nTr && (u[s].nTr._DT_RowIndex = s);
                }
                aT(m.aiDisplayMaster, w);
                aT(m.aiDisplay, w);
                aT(h[v], w, !1);
                i(m);
                w = m.rowIdFn(t._aData);
                w !== a && delete m.aIds[w];
            });
            this.iterator("table", function(m) {
                for (var s = 0, p = m.aoData.length; s < p; s++) {
                    m.aoData[s].idx = s;
                }
            });
            return this;
        });
        aI("rows.add()", function(m) {
            var h = this.iterator("table", function(s) {
                    var w, v, u, t = [];
                    v = 0;
                    for (u = m.length; v < u; v++) {
                        w = m[v], w.nodeName && "TR" === w.nodeName.toUpperCase() ? t.push(bU(s, w)[0]) : t.push(bi(s, w));
                    }
                    return t;
                }, 1),
                p = this.rows(-1);
            p.pop();
            aQ.merge(p, h);
            return p;
        });
        aI("row()", function(m, h) {
            return bM(this.rows(m, h));
        });
        aI("row().data()", function(m) {
            var h = this.context;
            if (m === a) {
                return h.length && this.length ? h[0].aoData[this[0]]._aData : a;
            }
            h[0].aoData[this[0]]._aData = m;
            n(h[0], this[0], "data");
            return this;
        });
        aI("row().node()", function() {
            var h = this.context;
            return h.length && this.length ? h[0].aoData[this[0]].nTr || null : null;
        });
        aI("row.add()", function(m) {
            m instanceof aQ && m.length && (m = m[0]);
            var h = this.iterator("table", function(p) {
                return m.nodeName && "TR" === m.nodeName.toUpperCase() ? bU(p, m)[0] : bi(p, m);
            });
            return this.row(h[0]);
        });
        var be = function(m, h) {
                var p = m.context;
                if (p.length && (p = p[0].aoData[h !== a ? h : m[0]]) && p._details) {
                    p._details.remove(), p._detailsShow = a, p._details = a;
                }
            },
            aZ = function(m, h) {
                var v = m.context;
                if (v.length && m.length) {
                    var u = v[0].aoData[m[0]];
                    if (u._details) {
                        (u._detailsShow = h) ? u._details.insertAfter(u.nTr): u._details.detach();
                        var t = v[0],
                            s = new aF(t),
                            p = t.aoData;
                        s.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
                        0 < bx(p, "_details").length && (s.on("draw.dt.DT_details", function(x, w) {
                            t === w && s.rows({
                                page: "current"
                            }).eq(0).each(function(y) {
                                y = p[y];
                                y._detailsShow && y._details.insertAfter(y.nTr);
                            });
                        }), s.on("column-visibility.dt.DT_details", function(x, w) {
                            if (t === w) {
                                for (var B, A = aK(w), z = 0, y = p.length; z < y; z++) {
                                    B = p[z], B._details && B._details.children("td[colspan]").attr("colspan", A);
                                }
                            }
                        }), s.on("destroy.dt.DT_details", function(x, w) {
                            if (t === w) {
                                for (var z = 0, y = p.length; z < y; z++) {
                                    p[z]._details && be(s, z);
                                }
                            }
                        }));
                    }
                }
            };
        aI("row().child()", function(m, h) {
            var u = this.context;
            if (m === a) {
                return u.length && this.length ? u[0].aoData[this[0]]._details : a;
            }
            if (!0 === m) {
                this.child.show();
            } else {
                if (!1 === m) {
                    be(this);
                } else {
                    if (u.length && this.length) {
                        var t = u[0],
                            u = u[0].aoData[this[0]],
                            s = [],
                            p = function(w, v) {
                                if (aQ.isArray(w) || w instanceof aQ) {
                                    for (var y = 0, x = w.length; y < x; y++) {
                                        p(w[y], v);
                                    }
                                } else {
                                    w.nodeName && "tr" === w.nodeName.toLowerCase() ? s.push(w) : (y = aQ("<tr><td/></tr>").addClass(v), aQ("td", y).addClass(v).html(w)[0].colSpan = aK(t), s.push(y[0]));
                                }
                            };
                        p(m, h);
                        u._details && u._details.remove();
                        u._details = aQ(s);
                        u._detailsShow && u._details.insertAfter(u.nTr);
                    }
                }
            }
            return this;
        });
        aI(["row().child.show()", "row().child().show()"], function() {
            aZ(this, !0);
            return this;
        });
        aI(["row().child.hide()", "row().child().hide()"], function() {
            aZ(this, !1);
            return this;
        });
        aI(["row().child.remove()", "row().child().remove()"], function() {
            be(this);
            return this;
        });
        aI("row().child.isShown()", function() {
            var h = this.context;
            return h.length && this.length ? h[0].aoData[this[0]]._detailsShow || !1 : !1;
        });
        var aj = /^(.+):(name|visIdx|visible)$/,
            ay = function(m, h, u, t, s) {
                for (var u = [], t = 0, p = s.length; t < p; t++) {
                    u.push(bB(m, s[t], h));
                }
                return u;
            };
        aI("columns()", function(m, h) {
            m === a ? m = "" : aQ.isPlainObject(m) && (h = m, m = "");
            var h = bz(h),
                p = this.iterator("table", function(x) {
                    var w = m,
                        v = h,
                        u = x.aoColumns,
                        t = bx(u, "sName"),
                        s = bx(u, "nTh");
                    return b6("column", w, function(A) {
                        var z = aW(A);
                        if (A === "") {
                            return a4(u.length);
                        }
                        if (z !== null) {
                            return [z >= 0 ? z : u.length + z];
                        }
                        if (typeof A === "function") {
                            var C = aP(x, v);
                            return aQ.map(u, function(D, F) {
                                return A(F, ay(x, F, 0, 0, C), s[F]) ? F : null;
                            });
                        }
                        var B = typeof A === "string" ? A.match(aj) : "";
                        if (B) {
                            switch (B[2]) {
                                case "visIdx":
                                case "visible":
                                    z = parseInt(B[1], 10);
                                    if (z < 0) {
                                        var y = aQ.map(u, function(F, D) {
                                            return F.bVisible ? D : null;
                                        });
                                        return [y[y.length + z]];
                                    }
                                    return [bW(x, z)];
                                case "name":
                                    return aQ.map(t, function(F, D) {
                                        return F === B[1] ? D : null;
                                    });
                            }
                        } else {
                            return aQ(s).filter(A).map(function() {
                                return aQ.inArray(this, s);
                            }).toArray();
                        }
                    }, x, v);
                }, 1);
            p.selector.cols = m;
            p.selector.opts = h;
            return p;
        });
        aG("columns().header()", "column().header()", function() {
            return this.iterator("column", function(m, h) {
                return m.aoColumns[h].nTh;
            }, 1);
        });
        aG("columns().footer()", "column().footer()", function() {
            return this.iterator("column", function(m, h) {
                return m.aoColumns[h].nTf;
            }, 1);
        });
        aG("columns().data()", "column().data()", function() {
            return this.iterator("column-rows", ay, 1);
        });
        aG("columns().dataSrc()", "column().dataSrc()", function() {
            return this.iterator("column", function(m, h) {
                return m.aoColumns[h].mData;
            }, 1);
        });
        aG("columns().cache()", "column().cache()", function(h) {
            return this.iterator("column-rows", function(m, u, t, s, p) {
                return am(m.aoData, p, "search" === h ? "_aFilterData" : "_aSortData", u);
            }, 1);
        });
        aG("columns().nodes()", "column().nodes()", function() {
            return this.iterator("column-rows", function(m, h, t, s, p) {
                return am(m.aoData, p, "anCells", h);
            }, 1);
        });
        aG("columns().visible()", "column().visible()", function(m, h) {
            return this.iterator("column", function(z, y) {
                if (m === a) {
                    return z.aoColumns[y].bVisible;
                }
                var x = z.aoColumns,
                    w = x[y],
                    v = z.aoData,
                    u, t, p;
                if (m !== a && w.bVisible !== m) {
                    if (m) {
                        var s = aQ.inArray(!0, bx(x, "bVisible"), y + 1);
                        u = 0;
                        for (t = v.length; u < t; u++) {
                            p = v[u].nTr, x = v[u].anCells, p && p.insertBefore(x[y], x[s] || null);
                        }
                    } else {
                        aQ(bx(z.aoData, "anCells", y)).detach();
                    }
                    w.bVisible = m;
                    bQ(z, z.aoHeader);
                    bQ(z, z.aoFooter);
                    if (h === a || h) {
                        a2(z), (z.oScroll.sX || z.oScroll.sY) && a0(z);
                    }
                    aC(z, null, "column-visibility", [z, y, m]);
                    b3(z);
                }
            });
        });
        aG("columns().indexes()", "column().index()", function(h) {
            return this.iterator("column", function(m, p) {
                return "visible" === h ? bg(m, p) : p;
            }, 1);
        });
        aI("columns.adjust()", function() {
            return this.iterator("table", function(h) {
                a2(h);
            }, 1);
        });
        aI("column.index()", function(m, h) {
            if (0 !== this.context.length) {
                var p = this.context[0];
                if ("fromVisible" === m || "toData" === m) {
                    return bW(p, h);
                }
                if ("fromData" === m || "toVisible" === m) {
                    return bg(p, h);
                }
            }
        });
        aI("column()", function(m, h) {
            return bM(this.columns(m, h));
        });
        aI("cells()", function(A, z, y) {
            aQ.isPlainObject(A) && (A.row === a ? (y = A, A = null) : (y = z, z = null));
            aQ.isPlainObject(z) && (y = z, z = null);
            if (null === z || z === a) {
                return this.iterator("table", function(M) {
                    var L = A,
                        K = bz(y),
                        J = M.aoData,
                        I = aP(M, K),
                        H = f(am(J, I, "anCells")),
                        G = aQ([].concat.apply([], H)),
                        F, D = M.aoColumns.length,
                        C, B, R, S, Q, P;
                    return b6("cell", L, function(m) {
                        var U = typeof m === "function";
                        if (m === null || m === a || U) {
                            C = [];
                            B = 0;
                            for (R = I.length; B < R; B++) {
                                F = I[B];
                                for (S = 0; S < D; S++) {
                                    Q = {
                                        row: F,
                                        column: S
                                    };
                                    if (U) {
                                        P = J[F];
                                        m(Q, bB(M, F, S), P.anCells ? P.anCells[S] : null) && C.push(Q);
                                    } else {
                                        C.push(Q);
                                    }
                                }
                            }
                            return C;
                        }
                        return aQ.isPlainObject(m) ? [m] : G.filter(m).map(function(W, V) {
                            if (V.parentNode) {
                                F = V.parentNode._DT_RowIndex;
                            } else {
                                W = 0;
                                for (R = J.length; W < R; W++) {
                                    if (aQ.inArray(V, J[W].anCells) !== -1) {
                                        F = W;
                                        break;
                                    }
                                }
                            }
                            return {
                                row: F,
                                column: aQ.inArray(V, J[F].anCells)
                            };
                        }).toArray();
                    }, M, K);
                });
            }
            var x = this.columns(z, y),
                w = this.rows(A, y),
                v, u, t, s, h, p = this.iterator("table", function(B, m) {
                    v = [];
                    u = 0;
                    for (t = w[m].length; u < t; u++) {
                        s = 0;
                        for (h = x[m].length; s < h; s++) {
                            v.push({
                                row: w[m][u],
                                column: x[m][s]
                            });
                        }
                    }
                    return v;
                }, 1);
            aQ.extend(p.selector, {
                cols: z,
                rows: A,
                opts: y
            });
            return p;
        });
        aG("cells().nodes()", "cell().node()", function() {
            return this.iterator("cell", function(m, h, p) {
                return (m = m.aoData[h].anCells) ? m[p] : a;
            }, 1);
        });
        aI("cells().data()", function() {
            return this.iterator("cell", function(m, h, p) {
                return bB(m, h, p);
            }, 1);
        });
        aG("cells().cache()", "cell().cache()", function(h) {
            h = "search" === h ? "_aFilterData" : "_aSortData";
            return this.iterator("cell", function(m, s, p) {
                return m.aoData[s][h][p];
            }, 1);
        });
        aG("cells().render()", "cell().render()", function(h) {
            return this.iterator("cell", function(m, s, p) {
                return bB(m, s, p, h);
            }, 1);
        });
        aG("cells().indexes()", "cell().index()", function() {
            return this.iterator("cell", function(m, h, p) {
                return {
                    row: h,
                    column: p,
                    columnVisible: bg(m, p)
                };
            }, 1);
        });
        aG("cells().invalidate()", "cell().invalidate()", function(h) {
            return this.iterator("cell", function(m, s, p) {
                n(m, s, h, p);
            });
        });
        aI("cell()", function(m, h, p) {
            return bM(this.cells(m, h, p));
        });
        aI("cell().data()", function(m) {
            var h = this.context,
                p = this[0];
            if (m === a) {
                return h.length && p.length ? bB(h[0], p[0].row, p[0].column) : a;
            }
            aM(h[0], p[0].row, p[0].column, m);
            n(h[0], p[0].row, "data", p[0].column);
            return this;
        });
        aI("order()", function(m, h) {
            var p = this.context;
            if (m === a) {
                return 0 !== p.length ? p[0].aaSorting : a;
            }
            "number" === typeof m ? m = [
                [m, h]
            ] : aQ.isArray(m[0]) || (m = Array.prototype.slice.call(arguments));
            return this.iterator("table", function(s) {
                s.aaSorting = m.slice();
            });
        });
        aI("order.listener()", function(m, h, p) {
            return this.iterator("table", function(s) {
                bG(s, m, h, p);
            });
        });
        aI(["columns().order()", "column().order()"], function(m) {
            var h = this;
            return this.iterator("table", function(t, s) {
                var p = [];
                aQ.each(h[s], function(u, v) {
                    p.push([v, m]);
                });
                t.aaSorting = p;
            });
        });
        aI("search()", function(m, h, t, s) {
            var p = this.context;
            return m === a ? 0 !== p.length ? p[0].oPreviousSearch.sSearch : a : this.iterator("table", function(u) {
                u.oFeatures.bFilter && bn(u, aQ.extend({}, u.oPreviousSearch, {
                    sSearch: m + "",
                    bRegex: null === h ? !1 : h,
                    bSmart: null === t ? !0 : t,
                    bCaseInsensitive: null === s ? !0 : s
                }), 1);
            });
        });
        aG("columns().search()", "column().search()", function(m, h, s, p) {
            return this.iterator("column", function(v, u) {
                var t = v.aoPreSearchCols;
                if (m === a) {
                    return t[u].sSearch;
                }
                v.oFeatures.bFilter && (aQ.extend(t[u], {
                    sSearch: m + "",
                    bRegex: null === h ? !1 : h,
                    bSmart: null === s ? !0 : s,
                    bCaseInsensitive: null === p ? !0 : p
                }), bn(v, v.oPreviousSearch, 1));
            });
        });
        aI("state()", function() {
            return this.context.length ? this.context[0].oSavedState : null;
        });
        aI("state.clear()", function() {
            return this.iterator("table", function(h) {
                h.fnStateSaveCallback.call(h.oInstance, h, {});
            });
        });
        aI("state.loaded()", function() {
            return this.context.length ? this.context[0].oLoadedState : null;
        });
        aI("state.save()", function() {
            return this.iterator("table", function(h) {
                b3(h);
            });
        });
        aL.versionCheck = aL.fnVersionCheck = function(m) {
            for (var h = aL.version.split("."), m = m.split("."), u, t, s = 0, p = m.length; s < p; s++) {
                if (u = parseInt(h[s], 10) || 0, t = parseInt(m[s], 10) || 0, u !== t) {
                    return u > t;
                }
            }
            return !0;
        };
        aL.isDataTable = aL.fnIsDataTable = function(m) {
            var h = aQ(m).get(0),
                p = !1;
            aQ.each(aL.settings, function(s, v) {
                var u = v.nScrollHead ? aQ("table", v.nScrollHead)[0] : null,
                    t = v.nScrollFoot ? aQ("table", v.nScrollFoot)[0] : null;
                if (v.nTable === h || u === h || t === h) {
                    p = !0;
                }
            });
            return p;
        };
        aL.tables = aL.fnTables = function(m) {
            var h = !1;
            aQ.isPlainObject(m) && (h = m.api, m = m.visible);
            var p = aQ.map(aL.settings, function(s) {
                if (!m || m && aQ(s.nTable).is(":visible")) {
                    return s.nTable;
                }
            });
            return h ? new aF(p) : p;
        };
        aL.util = {
            throttle: aX,
            escapeRegex: av
        };
        aL.camelToHungarian = bp;
        aI("$()", function(m, h) {
            var p = this.rows(h).nodes(),
                p = aQ(p);
            return aQ([].concat(p.filter(m).toArray(), p.find(m).toArray()));
        });
        aQ.each(["on", "one", "off"], function(m, h) {
            aI(h + "()", function() {
                var p = Array.prototype.slice.call(arguments);
                p[0].match(/\.dt\b/) || (p[0] += ".dt");
                var s = aQ(this.tables().nodes());
                s[h].apply(s, p);
                return this;
            });
        });
        aI("clear()", function() {
            return this.iterator("table", function(h) {
                bv(h);
            });
        });
        aI("settings()", function() {
            return new aF(this.context, this.context);
        });
        aI("init()", function() {
            var h = this.context;
            return h.length ? h[0].oInit : null;
        });
        aI("data()", function() {
            return this.iterator("table", function(h) {
                return bx(h.aoData, "_aData");
            }).flatten();
        });
        aI("destroy()", function(h) {
            h = h || !1;
            return this.iterator("table", function(B) {
                var A = B.nTableWrapper.parentNode,
                    z = B.oClasses,
                    y = B.nTable,
                    x = B.nTBody,
                    w = B.nTHead,
                    v = B.nTFoot,
                    u = aQ(y),
                    x = aQ(x),
                    t = aQ(B.nTableWrapper),
                    s = aQ.map(B.aoData, function(p) {
                        return p.nTr;
                    }),
                    m;
                B.bDestroying = !0;
                aC(B, "aoDestroyCallback", "destroy", [B]);
                h || (new aF(B)).columns().visible(!0);
                t.unbind(".DT").find(":not(tbody *)").unbind(".DT");
                aQ(d).unbind(".DT-" + B.sInstance);
                y != w.parentNode && (u.children("thead").detach(), u.append(w));
                v && y != v.parentNode && (u.children("tfoot").detach(), u.append(v));
                B.aaSorting = [];
                B.aaSortingFixed = [];
                g(B);
                aQ(s).removeClass(B.asStripeClasses.join(" "));
                aQ("th, td", w).removeClass(z.sSortable + " " + z.sSortableAsc + " " + z.sSortableDesc + " " + z.sSortableNone);
                B.bJUI && (aQ("th span." + z.sSortIcon + ", td span." + z.sSortIcon, w).detach(), aQ("th, td", w).each(function() {
                    var p = aQ("div." + z.sSortJUIWrapper, this);
                    aQ(this).append(p.contents());
                    p.detach();
                }));
                x.children().detach();
                x.append(s);
                w = h ? "remove" : "detach";
                u[w]();
                t[w]();
                !h && A && (A.insertBefore(y, B.nTableReinsertBefore), u.css("width", B.sDestroyWidth).removeClass(z.sTable), (m = B.asDestroyStripes.length) && x.children().each(function(p) {
                    aQ(this).addClass(B.asDestroyStripes[p % m]);
                }));
                A = aQ.inArray(B, aL.settings); - 1 !== A && aL.settings.splice(A, 1);
            });
        });
        aQ.each(["column", "row", "cell"], function(m, h) {
            aI(h + "s().every()", function(p) {
                return this.iterator(h, function(w, v, u, t, s) {
                    p.call((new aF(w))[h](v, "cell" === h ? u : a), v, u, t, s);
                });
            });
        });
        aI("i18n()", function(m, h, s) {
            var p = this.context[0],
                m = bf(m)(p.oLanguage);
            m === a && (m = h);
            s !== a && aQ.isPlainObject(m) && (m = m[s] !== a ? m[s] : m._);
            return m.replace("%d", s);
        });
        aL.version = "1.10.9";
        aL.settings = [];
        aL.models = {};
        aL.models.oSearch = {
            bCaseInsensitive: !0,
            sSearch: "",
            bRegex: !1,
            bSmart: !0
        };
        aL.models.oRow = {
            nTr: null,
            anCells: null,
            _aData: [],
            _aSortData: null,
            _aFilterData: null,
            _sFilterRow: null,
            _sRowStripe: "",
            src: null,
            idx: -1
        };
        aL.models.oColumn = {
            idx: null,
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bVisible: null,
            _sManualType: null,
            _bAttrSrc: !1,
            fnCreatedCell: null,
            fnGetData: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null
        };
        aL.defaults = {
            aaData: null,
            aaSorting: [
                [0, "asc"]
            ],
            aaSortingFixed: [],
            ajax: null,
            aLengthMenu: [10, 25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: !0,
            bDeferRender: !1,
            bDestroy: !1,
            bFilter: !0,
            bInfo: !0,
            bJQueryUI: !1,
            bLengthChange: !0,
            bPaginate: !0,
            bProcessing: !1,
            bRetrieve: !1,
            bScrollCollapse: !1,
            bServerSide: !1,
            bSort: !0,
            bSortMulti: !0,
            bSortCellsTop: !1,
            bSortClasses: !0,
            bStateSave: !1,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function(h) {
                return h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: null,
            fnServerParams: null,
            fnStateLoadCallback: function(m) {
                try {
                    return JSON.parse((-1 === m.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + m.sInstance + "_" + location.pathname));
                } catch (h) {}
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSaveCallback: function(m, h) {
                try {
                    (-1 === m.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + m.sInstance + "_" + location.pathname, JSON.stringify(h));
                } catch (p) {}
            },
            fnStateSaveParams: null,
            iStateDuration: 7200,
            iDeferLoading: null,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iTabIndex: 0,
            oClasses: {},
            oLanguage: {
                oAria: {
                    sSortAscending: ": activate to sort column ascending",
                    sSortDescending: ": activate to sort column descending"
                },
                oPaginate: {
                    sFirst: "First",
                    sLast: "Last",
                    sNext: "Next",
                    sPrevious: "Previous"
                },
                sEmptyTable: "No data available in table",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sDecimal: "",
                sThousands: ",",
                sLengthMenu: "Show _MENU_ entries",
                sLoadingRecords: "Loading...",
                sProcessing: "Processing...",
                sSearch: "Search:",
                sSearchPlaceholder: "",
                sUrl: "",
                sZeroRecords: "No matching records found"
            },
            oSearch: aQ.extend({}, aL.models.oSearch),
            sAjaxDataProp: "data",
            sAjaxSource: null,
            sDom: "lfrtip",
            searchDelay: null,
            sPaginationType: "simple_numbers",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET",
            renderer: null,
            rowId: "DT_RowId"
        };
        a3(aL.defaults);
        aL.defaults.column = {
            aDataSort: null,
            iDataSort: -1,
            asSorting: ["asc", "desc"],
            bSearchable: !0,
            bSortable: !0,
            bVisible: !0,
            fnCreatedCell: null,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null
        };
        a3(aL.defaults.column);
        aL.models.oSettings = {
            oFeatures: {
                bAutoWidth: null,
                bDeferRender: null,
                bFilter: null,
                bInfo: null,
                bLengthChange: null,
                bPaginate: null,
                bProcessing: null,
                bServerSide: null,
                bSort: null,
                bSortMulti: null,
                bSortClasses: null,
                bStateSave: null
            },
            oScroll: {
                bCollapse: null,
                iBarWidth: 0,
                sX: null,
                sXInner: null,
                sY: null
            },
            oLanguage: {
                fnInfoCallback: null
            },
            oBrowser: {
                bScrollOversize: !1,
                bScrollbarLeft: !1,
                bBounding: !1,
                barWidth: 0
            },
            ajax: null,
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aIds: {},
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: [],
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: !1,
            bInitialised: !1,
            aoOpenRows: [],
            sDom: null,
            searchDelay: null,
            sPaginationType: "two_button",
            iStateDuration: 0,
            aoStateSave: [],
            aoStateLoad: [],
            oSavedState: null,
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            bAjaxDataGet: !0,
            jqXHR: null,
            json: a,
            oAjaxData: a,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: !1,
            iDrawError: -1,
            _iDisplayLength: 10,
            _iDisplayStart: 0,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            bJUI: null,
            oClasses: {},
            bFiltered: !1,
            bSorted: !1,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function() {
                return "ssp" == az(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length;
            },
            fnRecordsDisplay: function() {
                return "ssp" == az(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length;
            },
            fnDisplayEnd: function() {
                var m = this._iDisplayLength,
                    h = this._iDisplayStart,
                    u = h + m,
                    t = this.aiDisplay.length,
                    s = this.oFeatures,
                    p = s.bPaginate;
                return s.bServerSide ? !1 === p || -1 === m ? h + t : Math.min(h + m, this._iRecordsDisplay) : !p || u > t || -1 === m ? t : u;
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null,
            aLastSort: [],
            oPlugins: {},
            rowIdFn: null,
            rowId: null
        };
        aL.ext = aD = {
            buttons: {},
            classes: {},
            errMode: "alert",
            feature: [],
            search: [],
            selector: {
                cell: [],
                column: [],
                row: []
            },
            internal: {},
            legacy: {
                ajax: null
            },
            pager: {},
            renderer: {
                pageButton: {},
                header: {}
            },
            order: {},
            type: {
                detect: [],
                search: {},
                order: {}
            },
            _unique: 0,
            fnVersionCheck: aL.fnVersionCheck,
            iApiIndex: 0,
            oJUIClasses: {},
            sVersion: aL.version
        };
        aQ.extend(aD, {
            afnFiltering: aD.search,
            aTypes: aD.type.detect,
            ofnSearch: aD.type.search,
            oSort: aD.type.order,
            afnSortData: aD.order,
            aoFeatures: aD.feature,
            oApi: aD.internal,
            oStdClasses: aD.classes,
            oPagination: aD.pager
        });
        aQ.extend(aL.ext.classes, {
            sTable: "dataTable",
            sNoFooter: "no-footer",
            sPageButton: "paginate_button",
            sPageButtonActive: "current",
            sPageButtonDisabled: "disabled",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_asc_disabled",
            sSortableDesc: "sorting_desc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sFilterInput: "",
            sLengthSelect: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sHeaderTH: "",
            sFooterTH: "",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sJUIHeader: "",
            sJUIFooter: ""
        });
        var an = "",
            an = "",
            br = an + "ui-state-default",
            q = an + "css_right ui-icon ui-icon-",
            ah = an + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
        aQ.extend(aL.ext.oJUIClasses, aL.ext.classes, {
            sPageButton: "fg-button ui-button " + br,
            sPageButtonActive: "ui-state-disabled",
            sPageButtonDisabled: "ui-state-disabled",
            sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
            sSortAsc: br + " sorting_asc",
            sSortDesc: br + " sorting_desc",
            sSortable: br + " sorting",
            sSortableAsc: br + " sorting_asc_disabled",
            sSortableDesc: br + " sorting_desc_disabled",
            sSortableNone: br + " sorting_disabled",
            sSortJUIAsc: q + "triangle-1-n",
            sSortJUIDesc: q + "triangle-1-s",
            sSortJUI: q + "carat-2-n-s",
            sSortJUIAscAllowed: q + "carat-1-n",
            sSortJUIDescAllowed: q + "carat-1-s",
            sSortJUIWrapper: "DataTables_sort_wrapper",
            sSortIcon: "DataTables_sort_icon",
            sScrollHead: "dataTables_scrollHead " + br,
            sScrollFoot: "dataTables_scrollFoot " + br,
            sHeaderTH: br,
            sFooterTH: br,
            sJUIHeader: ah + " ui-corner-tl ui-corner-tr",
            sJUIFooter: ah + " ui-corner-bl ui-corner-br"
        });
        var cj = aL.ext.pager;
        aQ.extend(cj, {
            simple: function() {
                return ["previous", "next"];
            },
            full: function() {
                return ["first", "previous", "next", "last"];
            },
            numbers: function(m, h) {
                return [cd(m, h)];
            },
            simple_numbers: function(m, h) {
                return ["previous", cd(m, h), "next"];
            },
            full_numbers: function(m, h) {
                return ["first", "previous", cd(m, h), "next", "last"];
            },
            _numbers: cd,
            numbers_length: 7
        });
        aQ.extend(!0, aL.ext.renderer, {
            pageButton: {
                _: function(F, D, C, B, A, z) {
                    var y = F.oClasses,
                        x = F.oLanguage.oPaginate,
                        w, v, u = 0,
                        s = function(m, M) {
                            var L, K, I, J, H = function(p) {
                                b4(F, p.data.action, true);
                            };
                            L = 0;
                            for (K = M.length; L < K; L++) {
                                J = M[L];
                                if (aQ.isArray(J)) {
                                    I = aQ("<" + (J.DT_el || "div") + "/>").appendTo(m);
                                    s(I, J);
                                } else {
                                    w = null;
                                    v = "";
                                    switch (J) {
                                        case "ellipsis":
                                            m.append('<span class="ellipsis">&#x2026;</span>');
                                            break;
                                        case "first":
                                            w = x.sFirst;
                                            v = J + (A > 0 ? "" : " " + y.sPageButtonDisabled);
                                            break;
                                        case "previous":
                                            w = x.sPrevious;
                                            v = J + (A > 0 ? "" : " " + y.sPageButtonDisabled);
                                            break;
                                        case "next":
                                            w = x.sNext;
                                            v = J + (A < z - 1 ? "" : " " + y.sPageButtonDisabled);
                                            break;
                                        case "last":
                                            w = x.sLast;
                                            v = J + (A < z - 1 ? "" : " " + y.sPageButtonDisabled);
                                            break;
                                        default:
                                            w = J + 1;
                                            v = A === J ? y.sPageButtonActive : "";
                                    }
                                    if (w !== null) {
                                        I = aQ("<a>", {
                                            "class": y.sPageButton + " " + v,
                                            "aria-controls": F.sTableId,
                                            "data-dt-idx": u,
                                            tabindex: F.iTabIndex,
                                            id: C === 0 && typeof J === "string" ? F.sTableId + "_" + J : null
                                        }).html(w).appendTo(m);
                                        a1(I, {
                                            action: J
                                        }, H);
                                        u++;
                                    }
                                }
                            }
                        },
                        h;
                    try {
                        h = aQ(D).find(b.activeElement).data("dt-idx");
                    } catch (G) {}
                    s(aQ(D).empty(), B);
                    h && aQ(D).find("[data-dt-idx=" + h + "]").focus();
                }
            }
        });
        aQ.extend(aL.ext.type.detect, [function(m, h) {
            var p = h.oLanguage.sDecimal;
            return k(m, p) ? "num" + p : null;
        }, function(m) {
            if (m && !(m instanceof Date) && (!bL.test(m) || !a9.test(m))) {
                return null;
            }
            var h = Date.parse(m);
            return null !== h && !isNaN(h) || bj(m) ? "date" : null;
        }, function(m, h) {
            var p = h.oLanguage.sDecimal;
            return k(m, p, !0) ? "num-fmt" + p : null;
        }, function(m, h) {
            var p = h.oLanguage.sDecimal;
            return af(m, p) ? "html-num" + p : null;
        }, function(m, h) {
            var p = h.oLanguage.sDecimal;
            return af(m, p, !0) ? "html-num-fmt" + p : null;
        }, function(h) {
            return bj(h) || "string" === typeof h && -1 !== h.indexOf("<") ? "html" : null;
        }]);
        aQ.extend(aL.ext.type.search, {
            html: function(h) {
                return bj(h) ? h : "string" === typeof h ? h.replace(bE, " ").replace(bo, "") : "";
            },
            string: function(h) {
                return bj(h) ? h : "string" === typeof h ? h.replace(bE, " ") : h;
            }
        });
        var bR = function(m, h, s, p) {
            if (0 !== m && (!m || "-" === m)) {
                return -Infinity;
            }
            h && (m = au(m, h));
            m.replace && (s && (m = m.replace(s, "")), p && (m = m.replace(p, "")));
            return 1 * m;
        };
        aQ.extend(aD.type.order, {
            "date-pre": function(h) {
                return Date.parse(h) || 0;
            },
            "html-pre": function(h) {
                return bj(h) ? "" : h.replace ? h.replace(/<.*?>/g, "").toLowerCase() : h + "";
            },
            "string-pre": function(h) {
                return bj(h) ? "" : "string" === typeof h ? h.toLowerCase() : !h.toString ? "" : h.toString();
            },
            "string-asc": function(m, h) {
                return m < h ? -1 : m > h ? 1 : 0;
            },
            "string-desc": function(m, h) {
                return m < h ? 1 : m > h ? -1 : 0;
            }
        });
        aJ("");
        aQ.extend(!0, aL.ext.renderer, {
            header: {
                _: function(m, h, s, p) {
                    aQ(m.nTable).on("order.dt.DT", function(w, v, u, t) {
                        if (m === v) {
                            w = s.idx;
                            h.removeClass(s.sSortingClass + " " + p.sSortAsc + " " + p.sSortDesc).addClass(t[w] == "asc" ? p.sSortAsc : t[w] == "desc" ? p.sSortDesc : s.sSortingClass);
                        }
                    });
                },
                jqueryui: function(m, h, s, p) {
                    aQ("<div/>").addClass(p.sSortJUIWrapper).append(h.contents()).append(aQ("<span/>").addClass(p.sSortIcon + " " + s.sSortingClassJUI)).appendTo(h);
                    aQ(m.nTable).on("order.dt.DT", function(w, v, u, t) {
                        if (m === v) {
                            w = s.idx;
                            h.removeClass(p.sSortAsc + " " + p.sSortDesc).addClass(t[w] == "asc" ? p.sSortAsc : t[w] == "desc" ? p.sSortDesc : s.sSortingClass);
                            h.find("span." + p.sSortIcon).removeClass(p.sSortJUIAsc + " " + p.sSortJUIDesc + " " + p.sSortJUI + " " + p.sSortJUIAscAllowed + " " + p.sSortJUIDescAllowed).addClass(t[w] == "asc" ? p.sSortJUIAsc : t[w] == "desc" ? p.sSortJUIDesc : s.sSortingClassJUI);
                        }
                    });
                }
            }
        });
        aL.render = {
            number: function(m, h, t, s, p) {
                return {
                    display: function(w) {
                        if ("number" !== typeof w && "string" !== typeof w) {
                            return w;
                        }
                        var v = 0 > w ? "-" : "",
                            w = Math.abs(parseFloat(w)),
                            u = parseInt(w, 10),
                            w = t ? h + (w - u).toFixed(t).substring(2) : "";
                        return v + (s || "") + u.toString().replace(/\B(?=(\d{3})+(?!\d))/g, m) + w + (p || "");
                    }
                };
            }
        };
        aQ.extend(aL.ext.internal, {
            _fnExternApiFunc: bY,
            _fnBuildAjax: ck,
            _fnAjaxUpdate: ce,
            _fnAjaxParameters: aV,
            _fnAjaxUpdateDraw: at,
            _fnAjaxDataSrc: bZ,
            _fnAddColumn: ch,
            _fnColumnOptions: cg,
            _fnAdjustColumnSizing: a2,
            _fnVisibleToColumnIndex: bW,
            _fnColumnIndexToVisible: bg,
            _fnVisbleColumns: aK,
            _fnGetColumns: bN,
            _fnColumnTypes: by,
            _fnApplyColumnDefs: bk,
            _fnHungarianMap: a3,
            _fnCamelToHungarian: bp,
            _fnLanguageCompat: a7,
            _fnBrowserDetect: b7,
            _fnAddData: bi,
            _fnAddTr: bU,
            _fnNodeToDataIndex: function(m, h) {
                return h._DT_RowIndex !== a ? h._DT_RowIndex : null;
            },
            _fnNodeToColumnIndex: function(m, h, p) {
                return aQ.inArray(p, m.aoData[h].anCells);
            },
            _fnGetCellData: bB,
            _fnSetCellData: aM,
            _fnSplitObjNotation: T,
            _fnGetObjectDataFn: bf,
            _fnSetObjectDataFn: bd,
            _fnGetDataMaster: cl,
            _fnClearTable: bv,
            _fnDeleteIndex: aT,
            _fnInvalidate: n,
            _fnGetRowElements: ar,
            _fnCreateTr: aU,
            _fnBuildHead: o,
            _fnDrawHead: bQ,
            _fnDraw: bh,
            _fnReDraw: a8,
            _fnAddOptionsHtml: bt,
            _fnDetectHeader: b9,
            _fnGetUniqueThs: O,
            _fnFeatureHtmlFilter: ao,
            _fnFilterComplete: bn,
            _fnFilterCustom: b1,
            _fnFilterColumn: e,
            _fnFilter: ad,
            _fnFilterCreateSearch: aw,
            _fnEscapeRegex: av,
            _fnFilterData: bH,
            _fnFeatureHtmlInfo: bX,
            _fnUpdateInfo: bm,
            _fnInfoMacros: aN,
            _fnInitialise: aO,
            _fnInitComplete: bF,
            _fnLengthChange: ag,
            _fnFeatureHtmlLength: aR,
            _fnFeatureHtmlPaginate: bD,
            _fnPageChange: b4,
            _fnFeatureHtmlProcessing: E,
            _fnProcessingDisplay: bA,
            _fnFeatureHtmlTable: ci,
            _fnScrollDraw: a0,
            _fnApplyToChildren: bq,
            _fnCalculateColumnWidths: bV,
            _fnThrottle: aX,
            _fnConvertToWidth: r,
            _fnGetWidestNode: cf,
            _fnGetMaxLenString: bT,
            _fnStringToCss: aE,
            _fnSortFlatten: a5,
            _fnSort: bS,
            _fnSortAria: aS,
            _fnSortListener: bK,
            _fnSortAttachListener: bG,
            _fnSortingClasses: g,
            _fnSortData: bu,
            _fnSaveState: b3,
            _fnLoadState: aq,
            _fnSettingsFromNode: bJ,
            _fnLog: bl,
            _fnMap: bs,
            _fnBindAction: a1,
            _fnCallbackReg: ax,
            _fnCallbackFire: aC,
            _fnLengthOverflow: i,
            _fnRenderer: aY,
            _fnDataSource: az,
            _fnRowAttributes: b0,
            _fnCalculateEnd: function() {}
        });
        aQ.fn.dataTable = aL;
        aQ.fn.dataTableSettings = aL.settings;
        aQ.fn.dataTableExt = aL.ext;
        aQ.fn.DataTable = function(h) {
            return aQ(this).dataTable(h).api();
        };
        aQ.each(aL, function(m, h) {
            aQ.fn.DataTable[m] = h;
        });
        return aQ.fn.dataTable;
    };
    "function" === typeof define && define.amd ? define("datatables", ["jquery"], c) : "object" === typeof exports ? module.exports = c(require("jquery")) : jQuery && !jQuery.fn.dataTable && c(jQuery);
})(window, document);
(function(c, b, a) {
    var d = function(f) {
        var e = function(i, h) {
            var k = this;
            if (this instanceof e) {
                "undefined" == typeof h && (h = {});
                var j = f.fn.dataTable.camelToHungarian;
                j && (j(e.defaults, e.defaults, !0), j(e.defaults, h));
                j = f.fn.dataTable.Api ? (new f.fn.dataTable.Api(i)).settings()[0] : i.fnSettings();
                this.s = {
                    dt: j,
                    iTableColumns: j.aoColumns.length,
                    aiOuterWidths: [],
                    aiInnerWidths: []
                };
                this.dom = {
                    scroller: null,
                    header: null,
                    body: null,
                    footer: null,
                    grid: {
                        wrapper: null,
                        dt: null,
                        left: {
                            wrapper: null,
                            head: null,
                            body: null,
                            foot: null
                        },
                        right: {
                            wrapper: null,
                            head: null,
                            body: null,
                            foot: null
                        }
                    },
                    clone: {
                        left: {
                            header: null,
                            body: null,
                            footer: null
                        },
                        right: {
                            header: null,
                            body: null,
                            footer: null
                        }
                    }
                };
                j._oFixedColumns = this;
                j._bInitComplete ? this._fnConstruct(h) : j.oApi._fnCallbackReg(j, "aoInitComplete", function() {
                    k._fnConstruct(h);
                }, "FixedColumns");
            } else {
                alert("FixedColumns warning: FixedColumns must be initialised with the 'new' keyword.");
            }
        };
        e.prototype = {
            fnUpdate: function() {
                this._fnDraw(!0);
            },
            fnRedrawLayout: function() {
                this._fnColCalc();
                this._fnGridLayout();
                this.fnUpdate();
            },
            fnRecalculateHeight: function(g) {
                delete g._DTTC_iHeight;
                g.style.height = "auto";
            },
            fnSetRowHeight: function(h, g) {
                h.style.height = g + "px";
            },
            fnGetPosition: function(h) {
                var g = this.s.dt.oInstance;
                if (f(h).parents(".DTFC_Cloned").length) {
                    if ("tr" === h.nodeName.toLowerCase()) {
                        return h = f(h).index(), g.fnGetPosition(f("tr", this.s.dt.nTBody)[h]);
                    }
                    var i = f(h).index(),
                        h = f(h.parentNode).index();
                    return [g.fnGetPosition(f("tr", this.s.dt.nTBody)[h]), i, g.oApi._fnVisibleToColumnIndex(this.s.dt, i)];
                }
                return g.fnGetPosition(h);
            },
            _fnConstruct: function(i) {
                var h = this;
                if ("function" != typeof this.s.dt.oInstance.fnVersionCheck || !0 !== this.s.dt.oInstance.fnVersionCheck("1.8.0")) {
                    alert("FixedColumns " + e.VERSION + " required DataTables 1.8.0 or later. Please upgrade your DataTables installation");
                } else {
                    if ("" === this.s.dt.oScroll.sX) {
                        this.s.dt.oInstance.oApi._fnLog(this.s.dt, 1, "FixedColumns is not needed (no x-scrolling in DataTables enabled), so no action will be taken. Use 'FixedHeader' for column fixing when scrolling is not enabled");
                    } else {
                        this.s = f.extend(!0, this.s, e.defaults, i);
                        i = this.s.dt.oClasses;
                        this.dom.grid.dt = f(this.s.dt.nTable).parents("div." + i.sScrollWrapper)[0];
                        this.dom.scroller = f("div." + i.sScrollBody, this.dom.grid.dt)[0];
                        this._fnColCalc();
                        this._fnGridSetup();
                        var m;
                        f(this.dom.scroller).on("mouseover.DTFC touchstart.DTFC", function() {
                            m = "main";
                        }).on("scroll.DTFC", function() {
                            if ("main" === m && (0 < h.s.iLeftColumns && (h.dom.grid.left.liner.scrollTop = h.dom.scroller.scrollTop), 0 < h.s.iRightColumns)) {
                                h.dom.grid.right.liner.scrollTop = h.dom.scroller.scrollTop;
                            }
                        });
                        var j = "onwheel" in b.createElement("div") ? "wheel.DTFC" : "mousewheel.DTFC";
                        if (0 < h.s.iLeftColumns) {
                            f(h.dom.grid.left.liner).on("mouseover.DTFC touchstart.DTFC", function() {
                                m = "left";
                            }).on("scroll.DTFC", function() {
                                "left" === m && (h.dom.scroller.scrollTop = h.dom.grid.left.liner.scrollTop, 0 < h.s.iRightColumns && (h.dom.grid.right.liner.scrollTop = h.dom.grid.left.liner.scrollTop));
                            }).on(j, function(g) {
                                h.dom.scroller.scrollLeft -= "wheel" === g.type ? -g.originalEvent.deltaX : g.originalEvent.wheelDeltaX;
                            });
                        }
                        if (0 < h.s.iRightColumns) {
                            f(h.dom.grid.right.liner).on("mouseover.DTFC touchstart.DTFC", function() {
                                m = "right";
                            }).on("scroll.DTFC", function() {
                                "right" === m && (h.dom.scroller.scrollTop = h.dom.grid.right.liner.scrollTop, 0 < h.s.iLeftColumns && (h.dom.grid.left.liner.scrollTop = h.dom.grid.right.liner.scrollTop));
                            }).on(j, function(g) {
                                h.dom.scroller.scrollLeft -= "wheel" === g.type ? -g.originalEvent.deltaX : g.originalEvent.wheelDeltaX;
                            });
                        }
                        f(c).on("resize.DTFC", function() {
                            h._fnGridLayout.call(h);
                        });
                        var k = !0,
                            l = f(this.s.dt.nTable);
                        l.on("draw.dt.DTFC", function() {
                            h._fnDraw.call(h, k);
                            k = !1;
                        }).on("column-sizing.dt.DTFC", function() {
                            h._fnColCalc();
                            h._fnGridLayout(h);
                        }).on("column-visibility.dt.DTFC", function() {
                            h._fnColCalc();
                            h._fnGridLayout(h);
                            h._fnDraw(!0);
                        }).on("destroy.dt.DTFC", function() {
                            l.off("column-sizing.dt.DTFC destroy.dt.DTFC draw.dt.DTFC");
                            f(h.dom.scroller).off("scroll.DTFC mouseover.DTFC");
                            f(c).off("resize.DTFC");
                            f(h.dom.grid.left.liner).off("scroll.DTFC mouseover.DTFC " + j);
                            f(h.dom.grid.left.wrapper).remove();
                            f(h.dom.grid.right.liner).off("scroll.DTFC mouseover.DTFC " + j);
                            f(h.dom.grid.right.wrapper).remove();
                        });
                        this._fnGridLayout();
                        this.s.dt.oInstance.fnDraw(!1);
                    }
                }
            },
            _fnColCalc: function() {
                var h = this,
                    g = 0,
                    i = 0;
                this.s.aiInnerWidths = [];
                this.s.aiOuterWidths = [];
                f.each(this.s.dt.aoColumns, function(l, m) {
                    var n = f(m.nTh),
                        k;
                    if (n.filter(":visible").length) {
                        var j = n.outerWidth();
                        0 === h.s.aiOuterWidths.length && (k = f(h.s.dt.nTable).css("border-left-width"), j += "string" === typeof k ? 1 : parseInt(k, 10));
                        h.s.aiOuterWidths.length === h.s.dt.aoColumns.length - 1 && (k = f(h.s.dt.nTable).css("border-right-width"), j += "string" === typeof k ? 1 : parseInt(k, 10));
                        h.s.aiOuterWidths.push(j);
                        h.s.aiInnerWidths.push(n.width());
                        l < h.s.iLeftColumns && (g += j);
                        h.s.iTableColumns - h.s.iRightColumns <= l && (i += j);
                    } else {
                        h.s.aiInnerWidths.push(0), h.s.aiOuterWidths.push(0);
                    }
                });
                this.s.iLeftWidth = g;
                this.s.iRightWidth = i;
            },
            _fnGridSetup: function() {
                var i = this._fnDTOverflow(),
                    h;
                this.dom.body = this.s.dt.nTable;
                this.dom.header = this.s.dt.nTHead.parentNode;
                this.dom.header.parentNode.parentNode.style.position = "relative";
                var l = f('<div class="DTFC_ScrollWrapper" style="position:relative; clear:both;"><div class="DTFC_LeftWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_LeftHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_LeftBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_LeftBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_LeftFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div></div><div class="DTFC_RightWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_RightHeadWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightHeadBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div><div class="DTFC_RightBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_RightBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_RightFootWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightFootBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div></div></div>')[0],
                    j = l.childNodes[0],
                    k = l.childNodes[1];
                this.dom.grid.dt.parentNode.insertBefore(l, this.dom.grid.dt);
                l.appendChild(this.dom.grid.dt);
                this.dom.grid.wrapper = l;
                0 < this.s.iLeftColumns && (this.dom.grid.left.wrapper = j, this.dom.grid.left.head = j.childNodes[0], this.dom.grid.left.body = j.childNodes[1], this.dom.grid.left.liner = f("div.DTFC_LeftBodyLiner", l)[0], l.appendChild(j));
                0 < this.s.iRightColumns && (this.dom.grid.right.wrapper = k, this.dom.grid.right.head = k.childNodes[0], this.dom.grid.right.body = k.childNodes[1], this.dom.grid.right.liner = f("div.DTFC_RightBodyLiner", l)[0], h = f("div.DTFC_RightHeadBlocker", l)[0], h.style.width = i.bar + "px", h.style.right = -i.bar + "px", this.dom.grid.right.headBlock = h, h = f("div.DTFC_RightFootBlocker", l)[0], h.style.width = i.bar + "px", h.style.right = -i.bar + "px", this.dom.grid.right.footBlock = h, l.appendChild(k));
                if (this.s.dt.nTFoot && (this.dom.footer = this.s.dt.nTFoot.parentNode, 0 < this.s.iLeftColumns && (this.dom.grid.left.foot = j.childNodes[2]), 0 < this.s.iRightColumns)) {
                    this.dom.grid.right.foot = k.childNodes[2];
                }
            },
            _fnGridLayout: function() {
                var k = this.dom.grid,
                    j = f(k.wrapper).width(),
                    q = f(this.s.dt.nTable.parentNode).outerHeight(),
                    n = f(this.s.dt.nTable.parentNode.parentNode).outerHeight(),
                    o = this._fnDTOverflow(),
                    p = this.s.iLeftWidth,
                    m = this.s.iRightWidth,
                    l = function(h, g) {
                        o.bar ? h.style.width = g + o.bar + "px" : (h.style.width = g + 20 + "px", h.style.paddingRight = "20px", h.style.boxSizing = "border-box");
                    };
                o.x && (q -= o.bar);
                k.wrapper.style.height = n + "px";
                0 < this.s.iLeftColumns && (k.left.wrapper.style.width = p + "px", k.left.wrapper.style.height = "1px", k.left.body.style.height = q + "px", k.left.foot && (k.left.foot.style.top = (o.x ? o.bar : 0) + "px"), l(k.left.liner, p), k.left.liner.style.height = q + "px");
                0 < this.s.iRightColumns && (j -= m, o.y && (j -= o.bar), k.right.wrapper.style.width = m + "px", k.right.wrapper.style.left = j + "px", k.right.wrapper.style.height = "1px", k.right.body.style.height = q + "px", k.right.foot && (k.right.foot.style.top = (o.x ? o.bar : 0) + "px"), l(k.right.liner, m), k.right.liner.style.height = q + "px", k.right.headBlock.style.display = o.y ? "block" : "none", k.right.footBlock.style.display = o.y ? "block" : "none");
            },
            _fnDTOverflow: function() {
                var h = this.s.dt.nTable,
                    g = h.parentNode,
                    i = {
                        x: !1,
                        y: !1,
                        bar: this.s.dt.oScroll.iBarWidth
                    };
                h.offsetWidth > g.clientWidth && (i.x = !0);
                h.offsetHeight > g.clientHeight && (i.y = !0);
                return i;
            },
            _fnDraw: function(g) {
                this._fnGridLayout();
                this._fnCloneLeft(g);
                this._fnCloneRight(g);
                null !== this.s.fnDrawCallback && this.s.fnDrawCallback.call(this, this.dom.clone.left, this.dom.clone.right);
                f(this).trigger("draw.dtfc", {
                    leftClone: this.dom.clone.left,
                    rightClone: this.dom.clone.right
                });
            },
            _fnCloneRight: function(h) {
                if (!(0 >= this.s.iRightColumns)) {
                    var g, i = [];
                    for (g = this.s.iTableColumns - this.s.iRightColumns; g < this.s.iTableColumns; g++) {
                        this.s.dt.aoColumns[g].bVisible && i.push(g);
                    }
                    this._fnClone(this.dom.clone.right, this.dom.grid.right, i, h);
                }
            },
            _fnCloneLeft: function(h) {
                if (!(0 >= this.s.iLeftColumns)) {
                    var g, i = [];
                    for (g = 0; g < this.s.iLeftColumns; g++) {
                        this.s.dt.aoColumns[g].bVisible && i.push(g);
                    }
                    this._fnClone(this.dom.clone.left, this.dom.grid.left, i, h);
                }
            },
            _fnCopyLayout: function(w, v) {
                for (var u = [], r = [], s = [], t = 0, q = w.length; t < q; t++) {
                    var p = [];
                    p.nTr = f(w[t].nTr).clone(!0, !0)[0];
                    for (var n = 0, o = this.s.iTableColumns; n < o; n++) {
                        if (-1 !== f.inArray(n, v)) {
                            var l = f.inArray(w[t][n].cell, s); - 1 === l ? (l = f(w[t][n].cell).clone(!0, !0)[0], r.push(l), s.push(w[t][n].cell), p.push({
                                cell: l,
                                unique: w[t][n].unique
                            })) : p.push({
                                cell: r[l],
                                unique: w[t][n].unique
                            });
                        }
                    }
                    u.push(p);
                }
                return u;
            },
            _fnClone: function(G, F, E, B) {
                var C = this,
                    D, A, z, x, y, v, t, u, r, w = this.s.dt;
                if (B) {
                    null !== G.header && G.header.parentNode.removeChild(G.header);
                    G.header = f(this.dom.header).clone(!0, !0)[0];
                    G.header.className += " DTFC_Cloned";
                    G.header.style.width = "100%";
                    F.head.appendChild(G.header);
                    u = this._fnCopyLayout(w.aoHeader, E);
                    x = f(">thead", G.header);
                    x.empty();
                    D = 0;
                    for (A = u.length; D < A; D++) {
                        x[0].appendChild(u[D].nTr);
                    }
                    w.oApi._fnDrawHead(w, u, !0);
                } else {
                    u = this._fnCopyLayout(w.aoHeader, E);
                    r = [];
                    w.oApi._fnDetectHeader(r, f(">thead", G.header)[0]);
                    D = 0;
                    for (A = u.length; D < A; D++) {
                        z = 0;
                        for (x = u[D].length; z < x; z++) {
                            r[D][z].cell.className = u[D][z].cell.className, f("span.DataTables_sort_icon", r[D][z].cell).each(function() {
                                this.className = f("span.DataTables_sort_icon", u[D][z].cell)[0].className;
                            });
                        }
                    }
                }
                this._fnEqualiseHeights("thead", this.dom.header, G.header);
                "auto" == this.s.sHeightMatch && f(">tbody>tr", C.dom.body).css("height", "auto");
                null !== G.body && (G.body.parentNode.removeChild(G.body), G.body = null);
                G.body = f(this.dom.body).clone(!0)[0];
                G.body.className += " DTFC_Cloned";
                G.body.style.paddingBottom = w.oScroll.iBarWidth + "px";
                G.body.style.marginBottom = 2 * w.oScroll.iBarWidth + "px";
                null !== G.body.getAttribute("id") && G.body.removeAttribute("id");
                f(">thead>tr", G.body).empty();
                f(">tfoot", G.body).remove();
                var s = f("tbody", G.body)[0];
                f(s).empty();
                if (0 < w.aiDisplay.length) {
                    A = f(">thead>tr", G.body)[0];
                    for (t = 0; t < E.length; t++) {
                        y = E[t], v = f(w.aoColumns[y].nTh).clone(!0)[0], v.innerHTML = "", x = v.style, x.paddingTop = "0", x.paddingBottom = "0", x.borderTopWidth = "0", x.borderBottomWidth = "0", x.height = 0, x.width = C.s.aiInnerWidths[y] + "px", A.appendChild(v);
                    }
                    f(">tbody>tr", C.dom.body).each(function(h) {
                        var g = this.cloneNode(false);
                        g.removeAttribute("id");
                        h = C.s.dt.aoData[C.s.dt.oFeatures.bServerSide === false ? C.s.dt.aiDisplay[C.s.dt._iDisplayStart + h] : h].anCells || f(this).children("td, th");
                        for (t = 0; t < E.length; t++) {
                            y = E[t];
                            if (h.length > 0) {
                                v = f(h[y]).clone(true, true)[0];
                                g.appendChild(v);
                            }
                        }
                        s.appendChild(g);
                    });
                } else {
                    f(">tbody>tr", C.dom.body).each(function() {
                        v = this.cloneNode(true);
                        v.className = v.className + " DTFC_NoData";
                        f("td", v).html("");
                        s.appendChild(v);
                    });
                }
                G.body.style.width = "100%";
                G.body.style.margin = "0";
                G.body.style.padding = "0";
                w.oScroller !== a && (A = w.oScroller.dom.force, F.forcer ? F.forcer.style.height = A.style.height : (F.forcer = A.cloneNode(!0), F.liner.appendChild(F.forcer)));
                F.liner.appendChild(G.body);
                this._fnEqualiseHeights("tbody", C.dom.body, G.body);
                if (null !== w.nTFoot) {
                    if (B) {
                        null !== G.footer && G.footer.parentNode.removeChild(G.footer);
                        G.footer = f(this.dom.footer).clone(!0, !0)[0];
                        G.footer.className += " DTFC_Cloned";
                        G.footer.style.width = "100%";
                        F.foot.appendChild(G.footer);
                        u = this._fnCopyLayout(w.aoFooter, E);
                        F = f(">tfoot", G.footer);
                        F.empty();
                        D = 0;
                        for (A = u.length; D < A; D++) {
                            F[0].appendChild(u[D].nTr);
                        }
                        w.oApi._fnDrawHead(w, u, !0);
                    } else {
                        u = this._fnCopyLayout(w.aoFooter, E);
                        F = [];
                        w.oApi._fnDetectHeader(F, f(">tfoot", G.footer)[0]);
                        D = 0;
                        for (A = u.length; D < A; D++) {
                            z = 0;
                            for (x = u[D].length; z < x; z++) {
                                F[D][z].cell.className = u[D][z].cell.className;
                            }
                        }
                    }
                    this._fnEqualiseHeights("tfoot", this.dom.footer, G.footer);
                }
                F = w.oApi._fnGetUniqueThs(w, f(">thead", G.header)[0]);
                f(F).each(function(g) {
                    y = E[g];
                    this.style.width = C.s.aiInnerWidths[y] + "px";
                });
                null !== C.s.dt.nTFoot && (F = w.oApi._fnGetUniqueThs(w, f(">tfoot", G.footer)[0]), f(F).each(function(g) {
                    y = E[g];
                    this.style.width = C.s.aiInnerWidths[y] + "px";
                }));
            },
            _fnGetTrNodes: function(h) {
                for (var g = [], j = 0, i = h.childNodes.length; j < i; j++) {
                    "TR" == h.childNodes[j].nodeName.toUpperCase() && g.push(h.childNodes[j]);
                }
                return g;
            },
            _fnEqualiseHeights: function(j, i, o) {
                if (!("none" == this.s.sHeightMatch && "thead" !== j && "tfoot" !== j)) {
                    var l, m, n = i.getElementsByTagName(j)[0],
                        o = o.getElementsByTagName(j)[0],
                        j = f(">" + j + ">tr:eq(0)", i).children(":first");
                    j.outerHeight();
                    j.height();
                    for (var n = this._fnGetTrNodes(n), i = this._fnGetTrNodes(o), k = [], o = 0, j = i.length; o < j; o++) {
                        l = n[o].offsetHeight, m = i[o].offsetHeight, l = m > l ? m : l, "semiauto" == this.s.sHeightMatch && (n[o]._DTTC_iHeight = l), k.push(l);
                    }
                    o = 0;
                    for (j = i.length; o < j; o++) {
                        i[o].style.height = k[o] + "px", n[o].style.height = k[o] + "px";
                    }
                }
            }
        };
        e.defaults = {
            iLeftColumns: 1,
            iRightColumns: 0,
            fnDrawCallback: null,
            sHeightMatch: "semiauto"
        };
        e.version = "3.0.4";
        f.fn.dataTable.FixedColumns = e;
        return f.fn.DataTable.FixedColumns = e;
    };
    "function" === typeof define && define.amd ? define(["jquery", "datatables"], d) : "object" === typeof exports ? d(require("jquery"), require("datatables")) : jQuery && !jQuery.fn.dataTable.FixedColumns && d(jQuery, jQuery.fn.dataTable);
})(window, document);
var ajaxHandler = [];
ajaxHandler[0] = "/portfolios/rank/z2_1rank_tab.php";
ajaxHandler[1] = "/portfolios/rank/z2_rank_by_category_tab.php";
ajaxHandler[2] = "/portfolios/rank/z2_add_del_tab.php";
ajaxHandler[3] = "/portfolios/rank/z2_1rank_perf_tab.php";

function getServername() {
    var a = PROTOCOL_JS.length;
    str1 = String(window.location);
    str2 = str1.substring(a, str1.length);
    str3 = str2.split("/");
    return servername = PROTOCOL_JS + str3[0];
}
$(document).ready(function() {
    $.extend($.fn.DataTable.defaults, {
        responsive: true
    });
    $(".video").click(function() {
        var a = this.id;
        $.ajaxSetup({
            cache: false
        });
        render_you_tube_video(a);
    });
    $("#videos").change(function() {
        var a = this.options[this.selectedIndex].value;
        $.ajaxSetup({
            cache: false
        });
        render_you_tube_video(a);
    });
    $(".esp_screen").change(function(b) {
        $.ajaxSetup({
            cache: false
        });
        var a = $(".esp_screen").val();
        render_esp_screen_table(a);
    });
    $(".top_rank_etf_category,#etf_rank").change(function(b) {
        $.ajaxSetup({
            cache: false
        });
        var a = $(".top_rank_etf_category").val();
        var c = $("#etf_rank").val();
        render_top_rank_etf_table(a, c);
    });
    $(".etf_performance").change(function(b) {
        $.ajaxSetup({
            cache: false
        });
        var a = $(".etf_performance").val();
        z2_render_etf_performance_table(a);
    });
    $("#funds_etf_screens").change(function(a) {
        $.ajaxSetup({
            cache: false
        });
        var b = $("#funds_etf_screens").val();
        z2_render_etf_funds_screens(b);
    });
    $(".tab_data").click(function() {
        var a = $(this).attr("tab_erid");
        $("#tab_id").val(a);
        $.ajaxSetup({
            cache: false
        });
        z2_render_find_similiar_fund();
    });
    $("#familyList").change(function(b) {
        var a = $("#familyList").val();
        $("#fund_name").val(a);
        $.ajaxSetup({
            cache: false
        });
        z2_render_find_similiar_fund();
    });
    $("#opt_chain").click(function() {
        $.ajaxSetup({
            cache: false
        });
        var a = $("#callinfo").val();
        $("#option_chain_table").html("");
        render_option_chain_table(ticker, a, last_price, "opt");
    });
    $("#opt_montage").click(function() {
        $.ajaxSetup({
            cache: false
        });
        var a = $("#grk_info").val();
        $("#option_montage_table").html("");
        render_option_chain_table(ticker, a, last_price, "montage");
    });
    $("#full_one_list_tab").click(function() {
        $.ajaxSetup({
            cache: false
        });
        z2_get_1_rank_tab_data("all", 0, "show_date_added", "Full #1 List", "full_one_list");
    });
    $("#growth_tab").click(function() {
        $.ajaxSetup({
            cache: false
        });
        z2_get_1_rank_tab_data("all", 1, "show_date_added", "Growth", "growth");
    });
    $("#income_tab").click(function() {
        $.ajaxSetup({
            cache: false
        });
        z2_get_1_rank_tab_data("all", 1, "show_date_added", "Income", "income");
    });
    $("#momentum_tab").click(function() {
        $.ajaxSetup({
            cache: false
        });
        z2_get_1_rank_tab_data("all", 1, "show_date_added", "Momentum", "momentum");
    });
    $("#value_tab").click(function() {
        $.ajaxSetup({
            cache: false
        });
        z2_get_1_rank_tab_data("all", 1, "show_date_added", "Value", "value");
    });
    $("#vgm_tab").click(function() {
        $.ajaxSetup({
            cache: false
        });
        z2_get_1_rank_tab_data("all", 1, "show_date_added", "VGM", "vgm");
    });
    $("#additions_deletions_tab").click(function() {
        $.ajaxSetup({
            cache: false
        });
        z2_get_1_rank_tab_data("all", 2, "show_date_added", "additions_deletions", "additions_deletions");
    });
    $("#performance_tab").click(function() {
        $.ajaxSetup({
            cache: false
        });
        z2_get_1_rank_tab_data("all", 3, "show_date_added", "Performance", "performance");
    });
    $(".ertab").click(function() {
        var a = $(this).attr("tab_erid");
        $("#tab_id").val(a);
        $.ajaxSetup({
            cache: false
        });
        render_earnings_tab_data();
    });
});

function render_esp_screen_table(selItem) {
    var column_name_label_mapping = [];
    column_name_label_mapping = {
        PE: {
            label: 5,
            sort_type: "asc"
        },
        "52WK": {
            label: 5,
            sort_type: "desc"
        },
        IND_FACT_50: {
            label: 5,
            sort_type: "asc"
        },
        QR1_SURP: {
            label: 5,
            sort_type: "desc"
        }
    };
    var sort_column = column_name_label_mapping[selItem]["label"];
    var sort_direction = column_name_label_mapping[selItem]["sort_type"];
    var sortValue = [
        [sort_column, sort_direction]
    ];
    var configIdentifier = $(".esp_screen").attr("esp_screens_config");
    $("#esp_screens_table").html("Please wait - loading...");
    strUrl = "/research/earnings/esp_screens_data_handler.php?sel_item=" + selItem + "&output_in_header=1";
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            eval(data);
            $("#esp_screens_table").html('<table cellpadding="0" cellspacing="0" border="0"  id="screen_esp"></table>');
            var oTable = $("#screen_esp").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: true,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: sortValue,
                fnDrawCallback: function(oSettings) {
                    if ($("#screen_esp tr").length < 5) {
                        $(".bottom_value_wrapper").hide();
                    } else {
                        $(".bottom_value_wrapper").show();
                    }
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function render_esp_outperformers_table() {
    $("#esp_outperformers_table").html("Please wait - loading...");
    strUrl = "/research/earnings/esp_expected_outperform_details_data_handler.php";
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            eval(data);
            $("#esp_outperformers_table").html('<table cellpadding="0" cellspacing="0" border="0" id="esp_outperform"></table>');
            var oTable = $("#esp_outperform").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: true,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [2, "asc"]
                ],
                fnDrawCallback: function(oSettings) {
                    if ($("#esp_outperform tr").length < 5) {
                        $(".bottom_value_wrapper").hide();
                    } else {
                        $(".bottom_value_wrapper").show();
                    }
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function render_option_chain_table(ticker, selItem, last_price, option_type, ticker_type, div_id) {
    var column_name_label_mapping = [];
    column_name_label_mapping = {
        opt: {
            div_id: "#option_chain_table",
            table_id: "option_chain",
            data_path: "/stock/option/option_output_data_handler.php?ticker=" + ticker + "&calltype=" + selItem + "&last_price=" + last_price + "&opt_type=" + option_type + "&ticker_type=" + ticker_type,
            heading: true,
            header_div: "call_put_header",
            def_sort_col: 2
        },
        montage: {
            div_id: "#option_montage_table",
            table_id: "montage",
            data_path: "/stock/option/option_output_data_handler.php?ticker=" + ticker + "&calltype=" + selItem + "&last_price=" + last_price + "&opt_type=" + option_type + "&ticker_type=" + ticker_type,
            heading: true,
            header_div: "montage_call_put_header",
            def_sort_col: 0
        },
        etf_opt: {
            div_id: false,
            table_id: false,
            heading: false,
            header_div: false,
            def_sort_col: 0
        },
        etf_montage: {
            div_id: false,
            table_id: false,
            heading: false,
            header_div: false,
            def_sort_col: 0
        }
    };
    $(column_name_label_mapping[option_type]["div_id"]).html('<span id="option_chain_loader">Please wait - Loading...</span>');
    var selectedActions = selItem.toUpperCase();
    var selectedActionText;
    switch (selectedActions) {
        case "CALLS":
            selectedActionText = "CALLS";
            break;
        case "PUTS":
            selectedActionText = "PUTS";
            break;
        case "CALLPUT":
            selectedActionText = "CALLS & PUTS";
            break;
        default:
            selectedActionText = "CALLS";
    }
    if (column_name_label_mapping[option_type]["heading"] == true) {
        var heading = selectedActionText + " for " + ticker.toUpperCase();
        $("#" + column_name_label_mapping[option_type]["header_div"]).html(heading);
    }
    strUrl = column_name_label_mapping[option_type]["data_path"];
    if (option_type == "opt") {
        postfix_text = '<p class="highlight_info">Highlighted Symbols are in-the-money.</p>';
    } else {
        postfix_text = '<p class="highlight_info">Highlighted Strikes are in-the-money.</p>';
    }
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            eval(data);
            $.each(app_data, function(key, win_app_data) {
                var table_id = column_name_label_mapping[option_type]["table_id"] + "_" + selItem + "_" + key;
                $(column_name_label_mapping[option_type]["div_id"]).append('<table cellpadding="0" cellspacing="0" border="0"  id="' + table_id + '"></table>');
                $("#" + table_id).append(win_app_data.caption);
                var oTable = $("#" + table_id).dataTable({
                    oLanguage: {
                        oPaginate: {
                            sFirst: "<<",
                            sLast: ">>",
                            sPrevious: "<",
                            sNext: ">"
                        }
                    },
                    oLanguage: {
                        sEmptyTable: "No data available in table",
                        sInfoPostFix: postfix_text
                    },
                    sDom: 'rt<"bottom_value_wrapper"ilp><"clear">',
                    bDeferRender: true,
                    iDisplayLength: 10,
                    aLengthMenu: [
                        [10, 50, 100, -1],
                        [10, 50, 100, "ALL"]
                    ],
                    bPaginate: true,
                    bInfo: true,
                    sPaginationType: "full_numbers",
                    aaData: win_app_data.data,
                    aoColumns: win_app_data.columns,
                    aaSorting: [
                        [column_name_label_mapping[option_type]["def_sort_col"], "asc"]
                    ],
                    fnDrawCallback: function(oSettings) {
                        if ($("#" + table_id + " tr").length < 5) {
                            $(".bottom_value_wrapper").hide();
                        } else {
                            $(".bottom_value_wrapper").show();
                        }
                    }
                });
                $("#option_chain_loader").remove();
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function render_etf_holdings_table() {
    $("#etf_holding_table").html("Please wait - loading...");
    $("#etf_holding_table").html('<table cellpadding="0" cellspacing="0" border="0" id="etf_holding"></table>');
    $("#etf_holding").append(app_data.caption);
    var a = $("#etf_holding").dataTable({
        oLanguage: {
            oPaginate: {
                sFirst: "<<",
                sLast: ">>",
                sPrevious: "<",
                sNext: ">"
            }
        },
        oLanguage: {
            sEmptyTable: "No data available in table"
        },
        sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
        bDeferRender: true,
        iDisplayLength: 25,
        aLengthMenu: [
            [25, 50, 100, -1],
            [25, 50, 100, "ALL"]
        ],
        bFilter: true,
        bPaginate: true,
        bInfo: true,
        sPaginationType: "full_numbers",
        aaData: app_data.data,
        aoColumns: app_data.columns,
        aaSorting: [
            [3, "desc"]
        ],
        fnDrawCallback: function(b) {
            if ($("#etf_holding tr").length < 5) {
                $(".bottom_value_wrapper").hide();
            } else {
                $(".bottom_value_wrapper").show();
            }
        }
    });
}

function render_earnings_stock_table(div_id, table_id, app_name) {
    $("#" + div_id).html("Please wait - loading...");
    $("#" + div_id).html('<table cellpadding="0" cellspacing="0" border="0" id="' + table_id + '"></table>');
    var oTable = $("#" + table_id).dataTable({
        oLanguage: {
            oPaginate: {
                sFirst: "<<",
                sLast: ">>",
                sPrevious: "<",
                sNext: ">"
            }
        },
        oLanguage: {
            sEmptyTable: "No data available in table"
        },
        sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
        bDeferRender: true,
        iDisplayLength: 25,
        aLengthMenu: [
            [25, 50, 100, -1],
            [25, 50, 100, "ALL"]
        ],
        bFilter: true,
        bPaginate: true,
        bInfo: true,
        sPaginationType: "full_numbers",
        aaData: eval(app_name).data,
        aoColumns: eval(app_name).columns,
        scrollX: true,
        bAutoWidth: true,
        responsive: true,
        aaSorting: [
            [0, "desc"]
        ]
    });
    new $.fn.dataTable.FixedColumns(oTable);
}

function render_mf_holdings_table() {
    $("#mf_holding_table").html("Please wait - loading...");
    $("#mf_holding_table").html('<table cellpadding="0" cellspacing="0" border="0" id="mf_holding"></table>');
    $("#mf_holding").append(app_data.caption);
    var a = $("#mf_holding").dataTable({
        oLanguage: {
            oPaginate: {
                sFirst: "<<",
                sLast: ">>",
                sPrevious: "<",
                sNext: ">"
            }
        },
        oLanguage: {
            sEmptyTable: "No data available in table"
        },
        sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
        bDeferRender: true,
        iDisplayLength: 25,
        aLengthMenu: [
            [25, 50, 100, -1],
            [25, 50, 100, "ALL"]
        ],
        bFilter: true,
        bPaginate: true,
        bInfo: true,
        sPaginationType: "full_numbers",
        aaData: app_data.data,
        aoColumns: app_data.columns,
        aaSorting: [
            [3, "desc"]
        ],
        fnDrawCallback: function(b) {
            if ($("#mf_holding tr").length < 5) {
                $(".bottom_value_wrapper").hide();
            } else {
                $(".bottom_value_wrapper").show();
            }
        }
    });
}

function render_you_tube_video(a) {
    strUrl = "/research/earnings/video_data_handler.php?video_id=" + a;
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        once: false,
        contentType: "application/javascript",
        success: function(c, b) {
            $(".first").html(c);
        },
        error: function(b, d, c) {}
    });
}

function render_zer_data_table() {
    $("#zer").html('<table cellpadding="0" cellspacing="0" border="0" id="zer_table"></table>');
    var a = $("#zer_table").dataTable({
        oLanguage: {
            oPaginate: {
                sFirst: "<<",
                sLast: ">>",
                sPrevious: "<",
                sNext: ">"
            }
        },
        oLanguage: {
            sEmptyTable: "No data available in table"
        },
        sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
        bDeferRender: true,
        iDisplayLength: 25,
        aLengthMenu: [
            [25, 50, 100, -1],
            [25, 50, 100, "ALL"]
        ],
        bFilter: true,
        bPaginate: true,
        bInfo: true,
        sPaginationType: "full_numbers",
        aaData: app_data.data,
        aoColumns: app_data.columns,
        aaSorting: [
            [1, "asc"]
        ],
        fnDrawCallback: function(b) {
            if ($("#zer_table tr").length < 5) {
                $(".bottom_value_wrapper").hide();
            } else {
                $(".bottom_value_wrapper").show();
            }
        }
    });
}

function render_insider_table() {
    var insider_table_attribute = [];
    insider_table_attribute = {
        all: {
            div_id: "all",
            table_id: "table_all",
            app_id: "app_data_all"
        },
        buy: {
            div_id: "buy",
            table_id: "table_buy",
            app_id: "app_data_buy"
        },
        sell: {
            div_id: "sell",
            table_id: "table_sell",
            app_id: "app_data_sell"
        },
        option: {
            div_id: "option",
            table_id: "table_option",
            app_id: "app_data_option"
        }
    };
    $.each(insider_table_attribute, function(key, data) {
        $("#" + data.div_id).html("Please wait - loading...");
        $("#" + data.div_id).html('<table cellpadding="0" cellspacing="0" border="0" id="' + data.table_id + '"></table>');
        var oTable = $("#" + data.table_id).dataTable({
            oLanguage: {
                oPaginate: {
                    sFirst: "<<",
                    sLast: ">>",
                    sPrevious: "<",
                    sNext: ">"
                }
            },
            oLanguage: {
                sEmptyTable: "No data available in table"
            },
            sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
            bDeferRender: true,
            iDisplayLength: 25,
            aLengthMenu: [
                [25, 50, 100, -1],
                [25, 50, 100, "ALL"]
            ],
            bFilter: true,
            bPaginate: true,
            bInfo: true,
            sPaginationType: "full_numbers",
            aaData: eval(data.app_id).data,
            aoColumns: eval(data.app_id).columns,
            aaSorting: [
                [2, "desc"]
            ]
        });
    });
}

function render_zrank_industry_table(premium_string) {
    $("#zrank_industry_rank_table").html("Please wait - loading...");
    if (premium_string == false) {
        strUrl = "/zrank/zrank_industry_data_handler.php";
        var defaultsort = 2;
    } else {
        strUrl = "/zrank/zrank_industry_data_handler.php?premium_string=" + premium_string;
        var defaultsort = 0;
    }
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            eval(data);
            $("#zrank_industry_rank_table").html('<table cellpadding="0" cellspacing="0" border="0" id="zrank_industry_rank_outperform"></table>');
            var oTable = $("#zrank_industry_rank_outperform").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 50,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [defaultsort, "asc"]
                ],
                fnDrawCallback: function(oSettings) {
                    if ($("#zrank_industry_rank_outperform tr").length < 5) {
                        $(".bottom_value_wrapper").hide();
                    } else {
                        $(".bottom_value_wrapper").show();
                    }
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function render_top_rank_etf_table(category, rank) {
    $("#top_rank_etf_table").html("Please wait - loading...");
    strUrl = "/funds/top_etf_ajax_datahelper.php";
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        data: {
            category_id: category,
            rank_id: rank
        },
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            eval(data);
            var rows = app_data.data.length;
            $("#top_rank_etf_table").html('<table cellpadding="0" cellspacing="0" border="0" id="top_rank_etf_table_outperform"></table>');
            var oTable = $("#top_rank_etf_table_outperform").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                oSearch: {
                    bCaseInsensitive: false
                },
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [4, "desc"]
                ],
                fnDrawCallback: function(oSettings) {
                    if (rows < 25) {
                        $(".bottom_value_wrapper").hide();
                    } else {
                        $(".bottom_value_wrapper").show();
                    }
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_render_etf_performance_table(category) {
    $("#etf_funds_data").html("Please wait - loading...");
    strUrl = "/data_handler/etf/z2_ajax_etf_performance_data_handler.php";
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        data: {
            category_id: category
        },
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            eval(data);
            $("#etf_funds_data").html('<table cellpadding="0" cellspacing="0" border="0" id="etf_data_list"></table>');
            var oTable = $("#etf_data_list").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 10,
                aLengthMenu: [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: etf_data.data,
                aoColumns: etf_data.col_defs,
                aaSorting: [
                    [4, "desc"]
                ]
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function render_zacks_rank_in_industry_table(premium_string, industry_id) {
    $("#zacks_industry_rank_table").html("<p>Please wait - loading...</p>");
    if (premium_string == false) {
        strUrl = "/zrank/zacks_industry_rank_data_handler.php?i=" + industry_id;
        var defaultsort = 0;
    } else {
        strUrl = "/zrank/zacks_industry_rank_data_handler.php?premium_string=" + premium_string + "&i=" + industry_id;
        var defaultsort = 2;
    }
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            data_all = data.split("^");
            data = data_all[1];
            industry_name = data_all[0];
            eval(data);
            $("#rank_in_industry").html("Zacks Rank in Industry: " + industry_name);
            $("#zacks_industry_rank_table").html('<table cellpadding="0" cellspacing="0" border="0" id="zrank_industry_rank_data"></table>');
            var oTable = $("#zrank_industry_rank_data").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 50,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [defaultsort, "asc"]
                ]
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function render_earnings_tab_data() {
    var type = $("#tab_id").val();
    var _current_date = $("#current_date").val();
    var mmToMonth = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var dt = new Date(_current_date * 1000);
    var mm = mmToMonth[dt.getMonth()];
    var _date_string = dt.getDate() + "-" + mm + "-" + dt.getFullYear();
    $("#heading").html(_date_string + " Earnings Releases");
    var SortArray = {
        "1": {
            sorttab: 0,
            order: "asc"
        },
        "2": {
            sorttab: 5,
            order: "desc"
        },
        "3": {
            sorttab: 5,
            order: "asc"
        },
        "4": {
            sorttab: 5,
            order: "desc"
        },
        "5": {
            sorttab: 5,
            order: "asc"
        }
    };
    var DefaultTab = SortArray[type].sorttab;
    var SortOrder = SortArray[type].order;
    var DisplayId = {
        "1": {
            divid: "earnings_rel_data_all"
        },
        "2": {
            divid: "plus_earnings_surprise"
        },
        "3": {
            divid: "minus_earnings_surprise"
        },
        "4": {
            divid: "plus_sales_surprise"
        },
        "5": {
            divid: "minus_sales_surprise"
        }
    };
    var data_populate_id = DisplayId[type].divid;
    var ear_rel = "ear_rel" + type;
    strUrl = "/research/earnings/z2_earnings_tab_data.php?type=" + type + "&timestamp=" + _current_date;
    $("#" + data_populate_id).html('<div class="center reports_loader"><span style="display:block;" class="center"></span><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></div>');
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            eval(data);
            $("#" + data_populate_id).html('<table cellpadding="0" cellspacing="0" border="0"  id="' + ear_rel + '"></table>');
            var rows = app_data.data.length;
            var oTable = $("#" + ear_rel).dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bProcessing: false,
                bFilter: false,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [DefaultTab, SortOrder]
                ],
                fnDrawCallback: function(oSettings) {
                    if (rows < 1) {
                        $(".bottom_value_wrapper").hide();
                    } else {
                        $(".bottom_value_wrapper").show();
                    }
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_get_1_rank_tab_data(id, handlerid, sort_menu, tab_name, tab_id) {
    tab = "#" + tab_id;
    loadrer_image = '<p class="align_center loader_height"><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></p>';
    $(tab).html(loadrer_image);
    strUrl = getServername() + ajaxHandler[handlerid];
    if (tab_id == "full_one_list") {
        if (sort_menu != "show_date_added") {
            var column_no_sort = 5;
            if (sort_menu == "show_pe" || sort_menu == "show_peg" || sort_menu == "show_price_sales" || sort_menu == "show_dividend_yield") {
                var sort_type_per_menu = "asc";
            } else {
                var sort_type_per_menu = "desc";
            }
        } else {
            var column_no_sort = 4;
            var sort_type_per_menu = "desc";
        }
    }
    var column_sorting_arr = [];
    column_sorting_arr = {
        full_one_list: {
            column_no: column_no_sort,
            sort_type: sort_type_per_menu,
            tab_index: 0
        },
        growth: {
            column_no: 3,
            sort_type: "asc",
            tab_index: 2
        },
        income: {
            column_no: 5,
            sort_type: "desc",
            tab_index: 5
        },
        momentum: {
            column_no: 3,
            sort_type: "asc",
            tab_index: 3
        },
        value: {
            column_no: 3,
            sort_type: "asc",
            tab_index: 1
        },
        vgm: {
            column_no: 3,
            sort_type: "asc",
            tab_index: 4
        },
        additions_deletions: {
            column_no: 0,
            sort_type: "asc",
            tab_index: 6
        },
        performance: {
            column_no: 0,
            sort_type: "desc",
            tab_index: 7
        }
    };
    var sort = column_sorting_arr[tab_id]["sort_type"];
    var column_no = column_sorting_arr[tab_id]["column_no"];
    var tab_index = column_sorting_arr[tab_id]["tab_index"];
    $(".tab_container").tabs({
        active: tab_index,
        activate: function(event, ui) {}
    });
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        data: {
            reference_id: id,
            sort_menu: sort_menu,
            tab_name: tab_name
        },
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            data_arr = data.split("^");
            data = data_arr[0];
            eval(data);
            var rows = app_data.data.length;
            if (rows > 1) {
                column_sort = column_no;
            } else {
                column_sort = 0;
            }
            if (tab_id == "full_one_list") {
                $(tab).html(data_arr[1] + '<table cellpadding="0" cellspacing="0" border="0" id="full_one_list_table_' + tab_id + '"></table><p class="compperform">Narrow this list down even further using over 100 different items with Zacks <a class="in_copy" href="/stock/screener/">custom screener.</a></p>');
            } else {
                if (tab_id == "performance") {
                    $(tab).html(data_arr[1]);
                } else {
                    if (tab_id == "additions_deletions") {
                        $(tab).html(data_arr[1] + '<table cellpadding="0" cellspacing="0" border="0" id="full_one_list_table_' + tab_id + '"></table>');
                    } else {
                        $(tab).html(data_arr[1] + '<table cellpadding="0" cellspacing="0" border="0" id="full_one_list_table_' + tab_id + '"></table><p class="compperform">Narrow down this list even further with <strong>' + tab_name + '</strong> Predefined Screens <a class="fancy_button green" href="/screening/premium-screens#' + tab_id + '">Screen</a></p>');
                    }
                }
            }
            var oTable = $("#full_one_list_table_" + tab_id).dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: 'B<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: false,
                bInfo: false,
                sPaginationType: false,
                oSearch: {
                    bCaseInsensitive: false
                },
                aaData: app_data.data,
                aoColumns: app_data.columns,
                scrollX: true,
                bAutoWidth: true,
                responsive: true,
                buttons: ["print"],
                aaSorting: [
                    [column_sort, sort]
                ],
                fnDrawCallback: function(oSettings) {
                    $("#dateformat").change(function() {
                        document.getElementById("sector_menu").value, 0, document.getElementById("sort_menu").value;
                        $.ajaxSetup({
                            cache: false
                        });
                        z2_get_1_rank_tab_data("all", 2, "show_date_added", "additions_deletions", "additions_deletions");
                    });
                }
            });
            new $.fn.dataTable.FixedColumns(oTable);
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_doAddDel(id, handlerId, sort_menu, tab_name, tab_id) {
    var add_del = document.getElementById("opt").value;
    var date_format = document.getElementById("dateformat").value;
    tab = "#" + tab_id;
    loadrer_image = '<p class="align_center loader_height"><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></p>';
    $(tab).html(loadrer_image);
    var strUrl = getServername() + ajaxHandler[handlerId] + "?flag=" + add_del + "&date=" + date_format;
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        data: {
            reference_id: id,
            sort_menu: sort_menu,
            tab_name: tab_name
        },
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            data1 = data.split("^");
            data = data1[0];
            eval(data);
            var rows = app_data.data.length;
            if (data.length > 0) {
                $(tab).html(data1[1] + '<table cellpadding="0" cellspacing="0" border="0" id="full_one_list_table_' + tab_id + '"></table>');
            } else {
                $(tab).html(data1[1]);
            }
            if (add_del == "D") {
                var sortValue = [
                    [3, "asc"]
                ];
            } else {
                var sortValue = [
                    [0, "asc"]
                ];
            }
            var oTable = $("#full_one_list_table_" + tab_id).dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: 'B<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: false,
                bInfo: false,
                sPaginationType: false,
                oSearch: {
                    bCaseInsensitive: false
                },
                aaData: app_data.data,
                aoColumns: app_data.columns,
                scrollX: true,
                bAutoWidth: true,
                responsive: true,
                aaSorting: sortValue,
                buttons: ["print"],
                fnDrawCallback: function(oSettings) {
                    $("#dateformat").change(function() {
                        document.getElementById("sector_menu").value, 0, document.getElementById("sort_menu").value;
                        $.ajaxSetup({
                            cache: false
                        });
                        z2_get_1_rank_tab_data("all", 2, "show_date_added", "additions_deletions", "additions_deletions");
                    });
                }
            });
            new $.fn.dataTable.FixedColumns(oTable);
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_render_zacks_five_rank_table(reference_id) {
    $("#five_rank_table").html("Please wait - loading...");
    if (reference_id === false) {
        strUrl = "/data_handler/rank/z2_five_rank_data_handler.php";
    } else {
        strUrl = "/data_handler/rank/z2_five_rank_data_handler.php?reference_id=" + reference_id;
    }
    var defaultsort = 0;
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        cache: true,
        success: function(data, status) {
            eval(data);
            $("#five_rank_table").html('<table cellpadding="0" cellspacing="0" border="0" id="zacks_five_rank_data"></table>');
            var oTable = $("#zacks_five_rank_data").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: false,
                bInfo: false,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                scrollX: true,
                bAutoWidth: true,
                responsive: true,
                aaSorting: [
                    [defaultsort, "asc"]
                ]
            });
            new $.fn.dataTable.FixedColumns(oTable);
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_render_etf_category_details(etf_category_id) {
    $("#etf_category_display").html('<div class="center reports_loader"><span style="display:block;" class="center"></span><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></div>');
    strUrl = "/data_handler/etf/z2_ajax_etf_category_details_data_handler.php?etf_category_id=" + etf_category_id;
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        cache: true,
        success: function(data, status) {
            eval(data);
            $("#etf_category_display").html('<table cellpadding="0" cellspacing="0" border="0" id="etf_display"></table>');
            var oTable = $("#etf_display").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [5, "desc"]
                ]
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_render_etf_funds_screens(scn_iden) {
    $("#etf_funds_screens").html('<div class="center reports_loader"><span style="display:block;" class="center"></span><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></div>');
    strUrl = "/data_handler/etf/z2_ajax_screens_data_handler.php?reference_id=" + scn_iden;
    var SortArray = {
        monthly_volume: {
            order: "desc"
        },
        market_value: {
            order: "desc"
        },
        annual_operating_expense: {
            order: "asc"
        },
        monthly_low_price: {
            order: "asc"
        },
        monthly_high_price: {
            order: "desc"
        },
        dividend_yield: {
            order: "desc"
        }
    };
    var SortOrder = SortArray[scn_iden].order;
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        cache: true,
        success: function(data, status) {
            eval(data);
            $("#etf_funds_screens").html('<table cellpadding="0" cellspacing="0" border="0" id="etf_data"></table>');
            var oTable = $("#etf_data").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 25,
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "ALL"]
                ],
                bFilter: false,
                bPaginate: true,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [4, SortOrder]
                ]
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function z2_render_find_similiar_fund() {
    tab_id = $("#tab_id").val();
    selected_fund = $("#fund_name").val();
    if (selected_fund != "") {
        var DisplayId = {
            YTD: {
                divid: "ytd"
            },
            "1MO": {
                divid: "1_mo"
            },
            "3MO": {
                divid: "3_mos"
            },
            "6MO": {
                divid: "6_mos"
            },
            "1YR": {
                divid: "1_yr"
            },
            "3YR": {
                divid: "3_yr"
            },
            "5YR": {
                divid: "5_yr"
            },
            "10YR": {
                divid: "10_yr"
            }
        };
        setting_id = DisplayId[tab_id].divid;
        $("#" + setting_id).html('<div class="center reports_loader"><span style="display:block;" class="center"></span><img src="' + STATIC_CONTENT_ROOT_JS + '/images/icons/loaders/35.gif"></div>');
        strUrl = "/data_handler/funds/z2_ajax_similiar_funds_data_handler.php?tab_id=" + tab_id + "&selected_fund=" + selected_fund;
        jQuery.ajax({
            url: strUrl,
            type: "GET",
            dataType: "text",
            cache: true,
            success: function(data, status) {
                eval(data);
                $("#" + setting_id).html('<table cellpadding="0" cellspacing="0" border="0" id="' + setting_id + '_data"></table>');
                var oTable = $("#" + setting_id + "_data").dataTable({
                    oLanguage: {
                        oPaginate: {
                            sFirst: "<<",
                            sLast: ">>",
                            sPrevious: "<",
                            sNext: ">"
                        }
                    },
                    oLanguage: {
                        sEmptyTable: "No data available in table"
                    },
                    sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                    bDeferRender: true,
                    iDisplayLength: 25,
                    aLengthMenu: [
                        [25, 50, 100, -1],
                        [25, 50, 100, "ALL"]
                    ],
                    bFilter: false,
                    bPaginate: true,
                    bInfo: true,
                    sPaginationType: "full_numbers",
                    aaData: app_data.data,
                    aoColumns: app_data.columns,
                    aaSorting: [
                        [2, "asc"]
                    ]
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {}
        });
    }
}

function render_qm_factors_and_performance() {
    $("#qm_factors_and_performance_table").html("Please wait - loading...");
    strUrl = "/data_handler/quant_monitor/quant_monitor_data_handler.php";
    jQuery.ajax({
        url: strUrl,
        type: "GET",
        dataType: "text",
        once: false,
        contentType: "application/javascript",
        success: function(data, status) {
            eval(data);
            $("#qm_factors_and_performance_table").html('<table cellpadding="0" cellspacing="0" border="0" id="qm_factors_and_performance"></table>');
            var oTable = $("#qm_factors_and_performance").dataTable({
                oLanguage: {
                    oPaginate: {
                        sFirst: "<<",
                        sLast: ">>",
                        sPrevious: "<",
                        sNext: ">"
                    }
                },
                oLanguage: {
                    sEmptyTable: "No data available in table"
                },
                sDom: '<"top_value_wrapper"f>rt<"bottom_value_wrapper"ilp><"clear">',
                bDeferRender: true,
                iDisplayLength: 32,
                aLengthMenu: [
                    [-1, 10, 25, 50, 100],
                    ["ALL", 10, 25, 50, 100]
                ],
                bFilter: false,
                bPaginate: false,
                bInfo: true,
                sPaginationType: "full_numbers",
                aaData: app_data.data,
                aoColumns: app_data.columns,
                aaSorting: [
                    [0, "asc"]
                ]
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function render_esp_buysell_data_table(a, b) {
    $("#zacks_esp_buysell_table").append('<tr class="loading"><td colspan="100" style="text-align:center;"><img src="{$_static_uri}/images/icons/loaders/01.gif" alt="" title="" /><br/><strong>Loading Data&hellip;</strong></td></tr>');
    $(window).load(function() {
        $(".loading").hide();
        var c = 2;
        var d = $("#zacks_esp_buysell_table").DataTable({
            ajax: {
                url: "/esp/esp_buysell_data_handler.php?premium_string?espType=esp_type&queryString=query_string",
                type: "GET"
            },
            bDestroy: true,
            bFilter: false,
            scrollX: true,
            bAutoWidth: true,
            responsive: true,
            aaSorting: [
                [c, "asc"]
            ],
            iDisplayLength: 50,
            language: {
                emptyTable: "No record found"
            }
        });
        new $.fn.dataTable.FixedColumns(d, {});
    });
}
jQuery.fn.dataTableExt.oSort["numsort-asc"] = function(d, c) {
    d = parseInt(d.replace(/[^-0-9]/g, ""), 10);
    c = parseInt(c.replace(/[^-0-9]/g, ""), 10);
    if (isNaN(d)) {
        d = Number.MAX_VALUE;
    }
    if (isNaN(c)) {
        c = Number.MAX_VALUE;
    }
    var e = (d - c);
    return e;
};
jQuery.fn.dataTableExt.oSort["numsort-desc"] = function(d, c) {
    d = parseInt(d.replace(/[^-0-9]/g, ""), 10);
    c = parseInt(c.replace(/[^-0-9]/g, ""), 10);
    if (isNaN(d)) {
        d = -Number.MAX_VALUE;
    }
    if (isNaN(c)) {
        c = -Number.MAX_VALUE;
    }
    var e = (c - d);
    return e;
};
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "numeric-comma-pre": function(c) {
        var b = (c == "-") ? 0 : c.replace(/,/, ".");
        return parseFloat(b);
    },
    "numeric-comma-asc": function(d, c) {
        return ((d < c) ? -1 : ((d > c) ? 1 : 0));
    },
    "numeric-comma-desc": function(d, c) {
        return ((d < c) ? 1 : ((d > c) ? -1 : 0));
    }
});
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "num-stringsort-pre": function(b) {
        b = (b === "NA" || b === "") ? 0 : b.replace(/[^\d]/g, "");
        return parseFloat(b);
    },
    "num-stringsort-asc": function(d, c) {
        return parseFloat(d - c);
    },
    "num-stringsort-desc": function(d, c) {
        return parseFloat(c - d);
    }
});
jQuery.fn.dataTableExt.oSort["string-case-asc"] = function(a, b) {
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
};
jQuery.fn.dataTableExt.oSort["string-case-desc"] = function(a, b) {
    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
};
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "string-pre": function(b) {
        return strip_tags(b);
    },
    "string-asc": function(d, c) {
        return ((d < c) ? -1 : ((d > c) ? 1 : 0));
    },
    "string-desc": function(d, c) {
        return ((d < c) ? 1 : ((d > c) ? -1 : 0));
    }
});
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function(b) {
        b = (b === "-") ? 0 : b.replace(/[^\d\-\.]/g, "");
        return parseFloat(b);
    },
    "currency-asc": function(d, c) {
        return d - c;
    },
    "currency-desc": function(d, c) {
        return c - d;
    }
});
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "percent-pre": function(c) {
        var b = (c == "-") ? 0 : c.replace(/%/, "");
        return parseFloat(b);
    },
    "percent-asc": function(d, c) {
        return ((d < c) ? -1 : ((d > c) ? 1 : 0));
    },
    "percent-desc": function(d, c) {
        return ((d < c) ? 1 : ((d > c) ? -1 : 0));
    }
});
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "us_date-pre": function(c) {
        var g = c.split("/");
        var f = c.split("/");
        var b = parseInt(g[0], 10);
        b = (b > 9) ? b : "0" + b;
        var d = parseInt(g[1], 10);
        d = (d > 9) ? d : "0" + d;
        var e = (g[2] + b + d) * 1;
        var b = parseInt(g[0], 10);
        b = (b > 9) ? b : "0" + b;
        var d = parseInt(g[1], 10);
        d = (d > 9) ? d : "0" + d;
        var e = (g[2] + b + d) * 1;
        return e;
    },
    "us_date-asc": function(d, c) {
        if (isNaN(c) || d < c) {
            return 1;
        }
        if (isNaN(d) || d > c) {
            return -1;
        }
        return ((d < c) ? -1 : ((d > c) ? 1 : 0));
    },
    "us_date-desc": function(d, c) {
        if (isNaN(c) || d < c) {
            return 1;
        }
        if (isNaN(d) || d > c) {
            return -1;
        }
        return ((d < c) ? 1 : ((d > c) ? -1 : 0));
    }
});
jQuery.fn.dataTableExt.oSort["date_null-asc"] = function(e, d) {
    if (e == "NA") {
        return 1;
    } else {
        if (d == "NA") {
            return -1;
        } else {
            var g = e.split("/");
            var f = d.split("/");
            var c = (g[2] + g[0] + g[1]) * 1;
            var h = (f[2] + f[0] + f[1]) * 1;
            return (c < h) ? -1 : ((c > h) ? 1 : 0);
        }
    }
};
jQuery.fn.dataTableExt.oSort["date_null-desc"] = function(e, d) {
    if (e == "NA") {
        return 1;
    } else {
        if (d == "NA") {
            return -1;
        } else {
            var g = e.split("/");
            var f = d.split("/");
            var c = (g[2] + g[0] + g[1]) * 1;
            var h = (f[2] + f[0] + f[1]) * 1;
            return (c > h) ? -1 : ((c < h) ? 1 : 0);
        }
    }
};
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "datetime-us-pre": function(k) {
        var j = k.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4}) (\d{1,2}):(\d{1,2}) (am|pm|AM|PM|Am|Pm)/),
            g = j[1],
            i = j[2],
            h = j[3],
            c = j[4],
            d = j[5],
            e = j[6];
        if (c == "12") {
            c = "0";
        }
        if (e == "pm") {
            c = parseInt(c, 10) + 12;
        }
        if (h.length == 2) {
            if (parseInt(h, 10) < 70) {
                h = "20" + h;
            } else {
                h = "19" + h;
            }
        }
        if (g.length == 1) {
            g = "0" + g;
        }
        if (i.length == 1) {
            i = "0" + i;
        }
        if (c.length == 1) {
            c = "0" + c;
        }
        if (d.length == 1) {
            d = "0" + d;
        }
        var f = h + g + i + c + d;
        return f;
    },
    "datetime-us-asc": function(d, c) {
        return d - c;
    },
    "datetime-us-desc": function(d, c) {
        return c - d;
    }
});
jQuery.fn.dataTableExt.aTypes.unshift(function(a) {
    if (a !== null && a.match(/\d{1,2}\/\d{1,2}\/\d{2,4} \d{1,2}:\d{1,2} (am|pm|AM|PM|Am|Pm)/)) {
        return "datetime-us";
    }
    return null;
});
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "monthYear-pre": function(c) {
        var d = c.split("/");
        var a = parseInt(d[0], 10);
        a = (a > 9) ? a : "0" + a;
        var b = (d[1] + a) * 1;
        return b;
    },
    "monthYear-asc": function(d, c) {
        return ((d < c) ? -1 : ((d > c) ? 1 : 0));
    },
    "monthYear-desc": function(d, c) {
        return ((d < c) ? 1 : ((d > c) ? -1 : 0));
    }
});

function strip_tags(a, c) {
    c = (((c || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
    var b = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        d = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return a.replace(d, "").replace(b, function(f, e) {
        return c.indexOf("<" + e.toLowerCase() + ">") > -1 ? f : "";
    });
}
var origHtmlMargin = parseFloat($("html").css("margin-top"));
$(function() {
    var i = navigator.userAgent.match(/Android/i) != null;
    var h = navigator.userAgent.match(/iPhone/i) != null;
    var l = navigator.userAgent.match(/iPad/i) != null;
    var b = navigator.userAgent.match(/iPod/i) != null;
    var g = ($.cookie("appbanner_dis") == null) ? false : true;
    if (i && (!l || !h || !b) && (g == false)) {
        if (android_app_banner_conf != null) {
            $.cookie("appbanner_dis", 1, {
                expires: 1
            });
            var j, a, e, d, f, c;
            j = android_app_banner_conf.appName;
            a = android_app_banner_conf.playStoreUrl;
            e = android_app_banner_conf.logo;
            d = (2 * (android_app_banner_conf.score));
            f = android_app_banner_conf.price;
            c = android_app_banner_conf.category;
            var k = '<div class="smart-banner">';
            k += '<a href="#" id="swb-close">X</a>';
            k += '<img src="' + e + '" alt="" class="smart-glossy-icon" />';
            k += '<div id="swb-info"><strong>' + c + "</strong>";
            k += "<span>" + j + "</span>";
            k += "<span>" + f + "</span></div>";
            k += '<a href="' + a + '" id="swb-save">VIEW</a></div>';
            $("body").append(k);
            $("#swb-close").click(function(m) {
                m.preventDefault();
                $(".smart-banner").stop().animate({
                    top: "-146px"
                }, 300);
                $("html").animate({
                    marginTop: origHtmlMargin
                }, 300);
            });
            $(".smart-banner").stop().animate({
                top: 0
            }, 300);
            $("html").animate({
                marginTop: origHtmlMargin + 142
            }, 300);
        }
    }
});
(function(a) {
    a.fn.stickySidebar = function(d) {
        var c = a.extend({
            headerSelector: "#banner",
            navSelector: ".left_subnav",
            contentSelector: ".right_sticky_wrapper",
            stickySelector: ".sticky_element",
            footerSelector: "footer",
            sidebarTopMargin: 20,
            footerThreshold: 40
        }, d);
        var b = function() {
            var j = window.location.href;
            var f = a(this);
            var k = a(window).height();
            var m = a(window).width();
            var t = a(document).height();
            var i = a(c.headerSelector).outerHeight();
            var s = a(c.stickySelector).outerHeight();
            var e = a(c.navSelector).outerHeight();
            var g = f.outerHeight();
            var r = a(c.contentSelector).outerHeight();
            var q = a(c.footerSelector).outerHeight();
            var o = a(window).scrollTop();
            var l = r - g;
            var p = i + e;
            var n = t - (g + q + c.footerThreshold);
            if ((r > g) && (k > g)) {
                if ((o < p) || (s + e + 100 >= r)) {
                    if (/\/funds\/etf\//i.test(j)) {
                        f.removeClass("etf_sticky_ad");
                        f.removeClass("sticky");
                        a(".sticky_element").css({
                            "margin-top": "0px"
                        });
                        a(".sticky_element").css("top", "5px");
                    } else {
                        f.removeClass("sticky");
                        f.removeClass("etf_sticky_ad");
                        a(".sticky_element").css("top", "5px");
                    }
                } else {
                    if ((o >= p) && (o < n)) {
                        if (/\/funds\/etf\//i.test(j)) {
                            a("#main_menu_wrapper").css({
                                position: "fixed"
                            });
                            f.removeClass("sticky");
                            f.addClass("etf_sticky_ad").css("top", "40px");
                        } else {
                            f.removeClass("etf_sticky_ad");
                            f.addClass("sticky").css("top", c.sidebarTopMargin);
                        }
                    } else {
                        console.log("breakingpoint2  " + n);
                        console.log("scroll_top  " + o);
                        console.log("negative  " + h);
                        var h = n - o;
                        if (/\/funds\/etf\//i.test(j)) {
                            f.removeClass("sticky");
                            f.addClass("etf_sticky_ad").css("top", h);
                        } else {
                            f.removeClass("etf_sticky_ad");
                            f.addClass("sticky").css("top", h);
                        }
                    }
                }
            }
        };
        return this.each(function() {
            a(window).on("scroll", a.proxy(b, this));
            a(window).on("resize", a.proxy(b, this));
            a.proxy(b, this)();
        });
    };
}(jQuery));