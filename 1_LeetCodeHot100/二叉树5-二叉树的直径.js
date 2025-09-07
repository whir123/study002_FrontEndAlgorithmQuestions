/**
 * 二叉树的「直径」是指树中任意两个节点之间最长路径的长度
 * 这条路径可能经过也可能不经过根节点 root
 * 两节点之间路径的长度由它们之间边数表示
 */

//【本质是“某个节点的左子树最大深度 + 右子树最大深度”的最大值】
var diameterOfBinaryTree = function(root) {
    let maxDiameter = 0;
    // 递归函数，返回以node为根的最大深度
    function depth(node) {
        if (!node) return 0;
        const left = depth(node.left);
        const right = depth(node.right);
        // 更新最大直径（左子树深度+右子树深度）
        maxDiameter = Math.max(maxDiameter, left + right);
        // 返回当前节点最大深度
        return Math.max(left, right) + 1;
    }
    depth(root);
    return maxDiameter;
};

// 创建函数：[完整二叉树]数组 ——> 二叉树
var arrayToTree = function(arr){
    if(!arr)return null;
    // 箭头函数 用{}得写return 要么直接不用
    const nodes = arr.map(val => val===null ? null : {val, left:null, right:null})
    // {}里面等价于{val:val,……}
    let root = nodes[0], i=1; // 下标 1 第一个非根节点
    for(let j=0; j<nodes.length; j++){
        if(nodes[j]!==null){
            if(i<nodes.length){nodes[j].left = nodes[i++]};
            if(i<nodes.length){nodes[j].right = nodes[i++]};
        };
    };
    return root;
};
const root1 = arrayToTree([1,2,3,4,5]);
console.log(diameterOfBinaryTree(root1));//3
//取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。

const root2 = arrayToTree([1,2]);
console.log(diameterOfBinaryTree(root2));//1