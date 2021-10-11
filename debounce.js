/**
 * 防抖函数 规定时间内频繁触发，只执行最后一次
 * @param {*} fn
 * @param {*} delay
 */
export const debounce = (fun, delay = 300) => {
    let timer = null;
    return (...arg) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fun.apply(this, arg);
            clearTimeout(timer);
            timer = null;
        }, delay);
    };
};
