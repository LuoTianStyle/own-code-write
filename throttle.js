/**
 *
 * 节流函数 规定时间内频繁触发，间隔执行
 * @param {*} fn
 * @param {*} delay
 */
const throttle = (fun, delay) => {
    let timer = null;
    // 防止最后一次不触发
    let timerPro = null;
    return (...args) => {
        // 是否发送数据
        let isSend = false;
        if (timerPro) {
            clearTimeout(timerPro);
            timerPro = null;
        }
        if (!timer) {
            timer = setTimeout(() => {
                fun.apply(this, args);
                isSend = true;
                clearTimeout(timer);
                timer = null;
            }, delay);
        } else {
            // setTimeout多一些，优先执行周期性请求
            timerPro = setTimeout(() => {
                if (!isSend) {
                    fun.apply(this, args);
                    isSend = true;
                    clearTimeout(timerPro);
                    timerPro = null;
                }
            }, delay + 100);
        }
    };
};
