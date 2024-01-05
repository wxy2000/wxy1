"use strict";

const wxy = {
    // 定向灯和射灯
    light: s => {
        let o = q(s);

        o.g('on') == 'true'
            ? o.g('on', 'false')
            : o.g('on', 'true')
    },

    // 最佳视野
    best: () => {
        q('wBest').g('set_bind', 'true')
    },

    // 右面
    right: () => {
        q('wRight').g('set_bind', 'true')
    },

    // 前面
    front: () => {
        q('wFront').g('set_bind', 'true')
    },

    // 点我
    redNose: () => {
        let o = q('Deer__MA_Nose');

        o.g('diffuseColor') == '1 0 0'
            ? o.g('diffuseColor', '0 0 0')
            : o.g('diffuseColor', '1 0 0')
    },

    // 获得日期
    to: () => {
        const ut = m.ut();

        q("wTime").h = ut.cn

    },

    //to函数延迟
    go: () => { setTimeout(wxy.to, 127) }
};

try { window.onload = wxy.go } catch (e) { }
