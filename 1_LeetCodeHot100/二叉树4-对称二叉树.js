//给你一个二叉树的根节点root 检查它是否轴对称

//【检查轴对称】
//【方法1：借助辅助函数递归】
var isSymmetric = function(root) {
    if(root===null)return true;
    return isMirror(root.left, root.right);
};
var isMirror = function(left, right) {
    if(left===null && right===null)return true;
    if(left===null || right===null)return false;
    return(
        left.val === right.val &&
        isMirror(left.left, right.right) &&
        isMirror(left.right, right.left)
    )
};
//【方法2：迭代法】
var isSymmetric2 = function(root){
    if(root===null)return true;
    let queue = [root.left, root.right];//左右成对入队列
    while(queue.length){
        let left = queue.shift();
        let right = queue.shift();
        if(left===null && right===null){continue;}//都为空 跳过这次循环 拿后面的节点
        if(left===null || right===null){return false;}//只有一个为空 false
        if(left.val !== right.val){return false;}
        //【对称成对入队列】
        queue.push(left.left, right.right);
        queue.push(left.right, right.left);
    };
    return true;
};

//【生成二叉树】[完整二叉树]数组 ——> 二叉树
var arrayToTree = function(arr){
    if(!arr){return null;}
    //const nodes = arr.map(val => val===null ? null : {val, left:null, right:null});
    const nodes = arr.map(function(val){return val===null ? null : {val,left:null,right:null}});//【和上面箭头函数一样】
    //array.map(function(element, index, array) { /* ... */ })
    //function 是你想要对数组中每个元素执行的函数
    let root = nodes[0];
    let i = 1;//从第一个非根结点开始
    for(let j=0;j<nodes.length;j++){
        if(nodes[j]!==null){
            if(i<nodes.length){nodes[j].left = nodes[i++];}
            if(i<nodes.length){nodes[j].right = nodes[i++];}
        };
        //后续分配给node[2\3\4...]会同步到nodes[0]
    };
    return root;
};
const root = arrayToTree([1,2,2,3,4,4,3]);
console.log(root);

console.log(isSymmetric(root));//true
console.log(isSymmetric2(root));//true