/**
 * 深度优先遍历(递归)
 * @param {*} tree
 * @param {*} callback
 * @param {*} stack
 * @param {*} childName
 */
export const dfsForEach = (tree, callback, nodes = [], childName = 'children') => {
    nodes.push(tree);
    callback(tree, nodes);
    const children = tree[childName] || [];
    if (children.length) {
        children.forEach(item => {
            dfsForEach(item, callback, nodes, childName);
        });
    }
};
/**
 * 广度优先遍历(递归)
 * @param {*} tree
 * @param {*} callback
 * @param {*} nodes
 * @param {*} childName
 */
export const bfsForEach = (tree, callback, nodes = [], childName = 'children', queue = []) => {
    queue.push(...tree);
    const node = queue.shift();
    if (node) {
        nodes.push(node);
        callback(node, nodes);
        const children = node[childName] || [];
        if (!children.length) {
            bfsForEach([], callback, nodes, childName, queue);
        } else {
            bfsForEach(children, callback, nodes, childName, queue);
        }
    }
};
/**
 * 深度优先遍历(栈)
 * @param {*} tree
 * @param {*} callback
 * @param {*} nodes
 * @param {*} childName
 */
export const dfsForEachStack = (tree, callback, nodes = [], childName = 'children') => {
    const stack = [tree];
    while (stack.length) {
        const node = stack.pop();
        nodes.push(node);
        callback(node, nodes);
        const children = node[childName] || [];
        if (children.length) {
            stack.push(...children.reverse());
        }
    }
};
/**
 * 广度优先遍历(队列)
 * @param {*} tree
 * @param {*} callback
 * @param {*} nodes
 * @param {*} childName
 */
export const bfsForEachQueue = (tree, callback, nodes = [], childName = 'children') => {
    const queue = [tree];
    while (queue.length) {
        const node = queue.shift();
        nodes.push(node);
        callback(node, nodes);
        const children = node[childName] || [];
        if (children.length) {
            queue.push(...children);
        }
    }
};
