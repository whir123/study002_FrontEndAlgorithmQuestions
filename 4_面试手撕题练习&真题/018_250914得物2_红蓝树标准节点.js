// 一个树 每个节点涂成红色or蓝色
// 标准节点概念：
// 蓝色节点：该节点没有子节点，或子节点中至少有一个为红色节点，该节点是标准节点
// 红色节点：该节点没有子节点，或子节点中至少有一个为蓝色节点，该节点是标准节点
// 找出树红色标准节点和蓝色标准节点各有几个
// 输入：colors：n个正整数，每个节点颜色：蓝色0 红色1
// 输入：parents：n个正整数，第i个正整数v表示节点i的父节点是v 0表示这个节点是根

// ⚠️ 把 parents 转成孩子列表 children
function buildChildren (parents) {
    const n = parents.length;
    const roots = [];
    const children = Array.from({length:n}, ()=>[]);
    for (let i=0; i<n; i++) {
        let p = parents[i];
        if (p===0) { roots.push(i); } // 根节点是 0
        else { children[p-1].push(i); } // 其余节点 1-n
        // children 的第几项代表了他的子代是哪几个节点
    };
    // console.log({roots, children});
    return {roots, children};
};

function countStandard(colors, parents) {
    const n = colors.length;
    const {roots, children} = buildChildren(parents);
    const standard = new Array(n).fill(false);

    for (let u=0; u<n; u++) {
        if (children[u].length===0) {
            standard[u] = true;
        } else {
            const need = 1-colors[u]; // 该节点的反色
            standard[u] = children[u].some(v => colors[v]===need);
            //⚠️ some() 方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。有一个就返回 true
        };
    };

    let blue = 0, red = 0;
    for (let i=0; i<n; i++) {
        if (standard[i]) {
            if (colors[i]===0) blue++; else red++;
        };
    };

    return {blue, red};
};

//           1(蓝)
//           /   \
//         2(红) 3(蓝)
//         /   \    \
//      4(红) 5(蓝)  6(红)
//       /
//     7(蓝)
const colors = [0, 1, 0, 1, 0, 1, 0];
const parents = [0, 1, 1, 2, 2, 3, 4];
console.log(countStandard(colors, parents)); // { blue: 4, red: 3 }