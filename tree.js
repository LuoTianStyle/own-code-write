/**
 * 深度优先遍历(递归)
 * @param {*} tree
 * @param {*} callback
 * @param {*} stack
 * @param {*} childName
 */
const dfsForEach = (tree, callback, nodes = [], childName = 'children') => {
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
const bfsForEach = (tree, callback, nodes = [], childName = 'children', queue = []) => {
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
const dfsForEachStack = (tree, callback, nodes = [], childName = 'children') => {
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
const bfsForEachQueue = (tree, callback, nodes = [], childName = 'children') => {
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
/**
 * 广度优先搜索
 * @param tree 树
 * @param callback bfs每次遍历时调用的方法，会传入每个节点
 * @param searchMore 是否查找多个
 */
const bfsSearch = (tree, callback, searchMore = false) => {
    const queue = [tree];
    const children = [];
    while (queue.length) {
        const child = queue.shift();
        if (callback(child)) {
            if (searchMore) {
                children.push(child);
            } else {
                return child;
            }
        }
        if (child.children) {
            queue.push(...child.children);
        }
    }
    return searchMore ? children : null;
};
const tree = {
    id: 0,
    child: [
        {
            id: 1,
            child: [
                {
                    id: 2
                },
                {
                    id: 3
                }
            ]
        },
        {
            id: 4,
            child: [
                {
                    id: 5,
                    child: [
                        {
                            id: 6
                        },
                        {
                            id: 7
                        }
                    ]
                }
            ]
        }
    ]
};
let nodes = [];
let dfsForEachObj = {
    doing: [],
    result: []
};
dfsForEach(JSON.parse(JSON.stringify(tree)), (a, b) => dfsForEachObj.doing.push(`${a.id}=>${b.map(i => i.id)}`), nodes, 'child');
dfsForEachObj.result = nodes.map(i => i.id);
nodes = [];
let dfsForEachStackObj = {
    doing: [],
    result: []
};
dfsForEachStack(JSON.parse(JSON.stringify(tree)), (a, b) => dfsForEachStackObj.doing.push(`${a.id}=>${b.map(i => i.id)}`), nodes, 'child');
dfsForEachStackObj.result = nodes.map(i => i.id);
nodes = [];
let bfsForEachObj = {
    doing: [],
    result: []
};
bfsForEach(JSON.parse(JSON.stringify([tree])), (a, b) => bfsForEachObj.doing.push(`${a.id}=>${b.map(i => i.id)}`), nodes, 'child');
bfsForEachObj.result = nodes.map(i => i.id);
nodes = [];
let bfsForEachQueueObj = {
    doing: [],
    result: []
};
bfsForEachQueue(JSON.parse(JSON.stringify(tree)), (a, b) => bfsForEachQueueObj.doing.push(`${a.id}=>${b.map(i => i.id)}`), nodes, 'child');
bfsForEachQueueObj.result = nodes.map(i => i.id);
console.log(JSON.stringify(dfsForEachObj));
console.log(JSON.stringify(dfsForEachStackObj));
console.log(JSON.stringify(bfsForEachObj));
console.log(JSON.stringify(bfsForEachQueueObj));
