//给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点
//输入：root = [4,2,7,1,3,6,9]
//输出：[4,7,2,9,6,3,1]

//【翻转二叉树】
//【递归法】代码简洁，但可能栈溢出（对极深树不友好）
var invertTree = function(root) {
    if(root === null){return root;};
    let tem = root.left;
    root.left = root.right;
    root.right = tem;//左右交换
    invertTree(root.left);
    invertTree(root.right);//递归处理
    return root;
};
//【迭代法】更安全，适合大规模数据
var invertTree2 = function(root) {
    if(root === null){return root;};
    let queue = [root];//queue存储的是节点的引用（内存地址），而不是副本
    while(queue.length){
        const node = queue.shift();//去头并返回去掉的头
        //左右交换
        let tem = node.left;
        node.left = node.right;
        node.right = tem;
        //将子节点加入队列
        if(node.left){queue.push(node.left)};
        if(node.right){queue.push(node.right)};
    };
    return root;
};

//【生成二叉树】
var arrayToTree = function(arr){
    if(!arr){return null;}
    //const nodes = arr.map(val => val===null ? null : {val, left:null, right:null});
    const nodes = arr.map(function(val){return val===null ? null : {val,left:null,right:null}});//【和上面箭头函数一样】
    //array.map(function(element, index, array) { /* ... */ })
    //function 是你想要对数组中每个元素执行的函数
    let root = nodes[0];
    i = 1;//从第一个非根结点开始
    for(j=0;j<nodes.length;j++){
        if(nodes[j]!==null){
            if(i<nodes.length){nodes[j].left = nodes[i++];}
            if(i<nodes.length){nodes[j].right = nodes[i++];}
        };
        //后续分配给node[2\3\4...]会同步到nodes[0]
    };
    return root;
};
const root = arrayToTree([4,2,7,1,3,6,9]);
console.log(root);
console.log(invertTree(root));
console.log(invertTree2(root));