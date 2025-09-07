/**
 * 给你二叉树的根节点 root ，返回其节点值的层序遍历  
 * 层序遍历：即逐层地，从左到右访问所有节点
 * ( 中序遍历： 「先访问左子树 再访问当前节点 最后访问右子树」 )
 *            3
 *           / \
 *          9  20
 *            /  \
 *           15   7
 * 层序遍历结果为：[[3], [9, 20], [15, 7]]
 */

// BFS，广度优先搜索
var levelOrder = function(root) {
    if(!root) return []; // 空树 ——> 空数组

    const result = []; // 存放结果
    const queue = [root]; // 队列

    while(queue.length>0) {
        const levelLength = queue.length; // 当前层的长度
        const levelArr = []; // 本层的数组

        for(let i=0; i<levelLength; i++) {
            let node = queue.shift();
            levelArr.push(node.val);
            // 如果存在左右节点 加入队列
            if(node.left){queue.push(node.left)};
            if(node.right){queue.push(node.right)};
        };

        result.push(levelArr); // 本层数组加入结果
    };

    return result;
};

// 创建函数：[完整二叉树]数组 ——> 二叉树
var arrayToTreeOld = function(arr){
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
// BFS方法：广度优先搜索
var arrayToTree = function(arr) {
    if (!arr || arr.length===0 || arr[0]===null) return null;

    const root = {val:arr[0], left:null, right:null};
    const queue = [root];
    let i = 1;

    while(queue.length>0 && i<arr.length) {
        const cur = queue.shift();

        if (arr[i]!==null && arr[i]!==undefined){
            cur.left = {val:arr[i], left:null, right:null};
            queue.push(cur.left);
        };
        i++;
        if (arr[i]!==null && arr[i]!==undefined){
            cur.right = {val:arr[i], left:null, right:null};
            queue.push(cur.right);
        };
        i++;
    };

    return root;
};

const root = arrayToTree([3,9,20,null,null,15,7]);
console.log(levelOrder(root));