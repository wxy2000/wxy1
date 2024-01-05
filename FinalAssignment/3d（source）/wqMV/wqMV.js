/*!
 * wqMV.js v 1.0
 * (c) 2019 WangXiaoyu
 * date: 2020-3-1
 */

"use strict";

// q
(() => {
    // S String, E Element, J Json
    const q = (S, E, J) => {
        let l = 0;

        const s = E => {
            if (!E.g) {
                // 设置或读取属性值
                E.g = (S, V) => {
                    if (S && (V || V === "")) E.setAttribute(S, V);
                    return E.getAttribute(S) || "";
                };
                // 获取文本数据
                E.t = E.textContent || "";
                Object.defineProperties(E, {
                    // 设置或读取classname
                    c: {
                        get: () => E.className || "",
                        set: S => { E.className = S }
                    },
                    // 设置或读取html数据
                    h: {
                        get: () => E.type ? E.value : E.innerHTML,
                        set: S => { E.type ? E.value = S : E.innerHTML = S }
                    }
                });
            }
        };

        // 对S,E,J参数修正
        J = typeof J === "object" && J.d ? J : 0;
        if (typeof E === "object" && E.d) J = E, E = document.body;
        E = E || document.body;

        // .代表classname，返回数组
        if (S.startsWith(".")) E = E.querySelectorAll(S.substr(1));
        // ：代表name，返回数组
        else if (S.startsWith(":")) E = document.getElementsByName(S.substr(1));
        // @代表tagname，返回数组
        else if (S.startsWith("@")) {
            let k = E.getElementsByTagName(S.substr(1));
            E = [];
            for (let i = 0; i < k.length; i++) k[i].tagName === S.substr(1) && E.push(k[i]);
        }
        //代表id，返回节点
        else if (S) E = document.getElementById(S);

        if (E) {
            l = E.nodeType === 1 ? 0 : E.length;
            if (l) {
                // 修正节点数组为数组
                E = [].slice.call(E);
                for (const i of E) s(i);
            } else s(E);
        } else return;

        return E;
    };

    // 简称
    Array.prototype.p = Array.prototype.push;
    Array.prototype.j = Array.prototype.join;
    window.q = q;
})();

// m
(() => {
    const m = {
        // T daTe
        ut: T => {
            let k = {}, s = T ? new Date(T) : new Date();

            // 今天
            k.y = s.getFullYear();
            k.n = s.getMonth() + 1;
            k.d = s.getDate();
            k.h = s.getHours();
            k.m = s.getMinutes();
            k.s = s.getSeconds();
            k.i = s.getMilliseconds();
            for (const i in k) if (k[i] < 10) k[i] = "0" + k[i];
            for (let i = 0; i < 3 - String(k.i).length; i++) k.i = "0" + k.i;
            k.w = s.getDay();

            k.w = 1 == k.w ? "一" : 2 == k.w ? "二" : 3 == k.w ? "三" : 4 == k.w ? "四" : 5 == k.w ? "五" : 6 == k.w ? "六" : "日";
            k.cn = k.y + "年" + k.n + "月" + k.d + "日 星期" + k.w;
            return k;
        }
    };

    window.m = m
})();
