//给定一个二叉树 root ，返回其最大深度。
//二叉树的最大深度是指从根节点到最远叶子节点的最长路径上的节点数。

var maxDepth = function(root){
    if (!root) return 0;
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    return Math.max(leftDepth, rightDepth)+1;// 当前节点深度 = max(左, 右)+1
};

const arr = [3,9,20,null,null,15,7];
function arrayToTree(arr){
    if(!arr.length) return null;
    const nodes = arr.map(val => val===null ? null : {val, left:null, right:null});
    let root = nodes[0];
    let i = 1;
    for(let j=0; j<nodes.length; j++){
        if(nodes[j] !== null){//j 表示当前父节点的索引，只有【非空节点】才需要处理
            if(i < nodes.length) nodes[j].left = nodes[i++];
            if(i < nodes.length) nodes[j].right = nodes[i++];
        }
    }
    return root;
};
const root = arrayToTree(arr);
console.log(root);
//已默认转为【二叉树结构对象】
console.log(maxDepth(root));//3

//【联系二叉树5 - 改进即可返回直径】
var diameterOfBinaryTree = function(root) {
    let max = 0;
    var maxDepth1 = function(root){
        if(!root)return 0;
        const left = maxDepth1(root.left);
        const right = maxDepth1(root.right);
        max = Math.max(left+right, max);
        return Math.max(left, right)+1;
    };
    maxDepth1(root);
    return max;
};
console.log(diameterOfBinaryTree(root));//3