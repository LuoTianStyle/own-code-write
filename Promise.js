/**
 * 延时函数，用来模拟异步操作
 * @param {*} fun 异步函数
 * @param {*} time 延时时间
 */
const delay = (fun, time = 0) => {
    setTimeout(fun, time);
};
/**
 * 构造函数
 * @param {*} fun 传入的实例函数
 */
function MyPromise(fun) {
    // 存储promise的处理函数resolve的集合
    this.resolveFuns = [];
    /**
     * 处理函数resolve，异步
     * @param {*} data
     */
    const resolve = data => {
        delay(() => {
            // 挂载data到实例
            this.data = data;
            // 执行resolve集合函数
            this.resolveFuns.forEach(fun => fun(data));
        });
    };
    // 执行传入函数, 并将处理函数resolve当作参数传入
    fun(resolve);
}
/**
 * 链式调用
 * @param {*} onResolved then传入的函数
 * @returns 新的MyPromise对象
 */
MyPromise.prototype.then = function (onResolved) {
    // 返回新的MyPromise实例
    return new MyPromise(resolve => {
        // 存储新的resolve到resolveFuns回调函数集
        this.resolveFuns.push(() => {
            const result = onResolved(this.data);
            //  如果是新的MyPromise 就继续执行then，如果是普通值 就直接resolve
            if (result instanceof MyPromise) {
                result.then(resolve);
            } else {
                resolve(result);
            }
        });
    });
};
// 实例
new MyPromise(resolve => {
    delay(() => {
        const data = {
            msg: 'sucess',
            data: (new Date().getTime() + ' ').slice(-5, -1)
        };
        resolve(data);
    }, 300);
})
    .then(result => {
        console.log(result.data, 'MyPromise1');
        // 必须return 新的MyPromise
        return new MyPromise(resolve => {
            delay(() => {
                const data = {
                    msg: 'sucess',
                    data: (new Date().getTime() + ' ').slice(-5, -1)
                };
                resolve(data);
            }, 300);
        });
    })
    .then(result => console.log(result.data, 'MyPromise2'));
