//给定一个二叉树的根节点 root ，返回它的中序遍历

//中序遍历（Inorder Traversal）是二叉树的一种遍历方式。遍历顺序如下：
//「先访问左子树 再访问当前节点 最后访问右子树」

//  1
//   \
//    2
//   /
//  3
//（从上到下、从左到右）构造数组: [1,null,2,3,null]

//方法1：递归方式
function inorderTraversal(root) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.left);   // 1.遍历左子树
        result.push(node.val); // 2.访问当前节点
        traverse(node.right);  // 3.遍历右子树
    }
    traverse(root);
    return result;
}

//方法2：使用栈的迭代方式
function inorderTraversal2(root){
    const result = [];
    const stack = [];
    let current = root;
    while (current || stack.length > 0){
        while(current){
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    return result;
}

const arr = [1,null,2,3,null];
//先写一个函数arrayToTree: 将【数组】构造成【二叉树结构对象】：
//目标形式：
//{
//  val:1,
//  left: null,
//  right:{
//      val:2,
//      left:{val:3,left:null,right:null},
//      right:null
//  }
//}

function arrayToTree(arr){
    if(!arr.length) return null;
    const nodes = arr.map(val => val===null ? null : {val, left:null, right:null});
    //.map() 是 JavaScript 数组的方法，用来对数组中的每一个元素执行相同的操作，并【返回一个新的数组】
    //数组中的元素是 null，则对应为 null（表示这个位置没有节点） 否则就构造一个【节点对象】 { val, left: null, right: null }
    //  [1, null, 2] 会变成：
    //  新数组：[
    //    { val: 1, left: null, right: null },
    //    null,
    //    { val: 2, left: null, right: null }
    //  ]
    let root = nodes[0];//取第一个元素作为根节点 对这个对象的引用，并不是复制它，而是指向同一个内存地址
    //后面的操作会动态更新这个nodes[0]
    let i = 1;//0是根 子节点从1开始
    for(let j=0; j<nodes.length; j++){
        if(nodes[j] !== null){//j 表示[当前父节点]的索引，只有【非空节点】才需要处理
            if(i < nodes.length) nodes[j].left = nodes[i++];
            if(i < nodes.length) nodes[j].right = nodes[i++];
        }
    }
    return root;
};
console.log(inorderTraversal(arrayToTree(arr)));//[ 1, 3, 2 ]
console.log(inorderTraversal2(arrayToTree(arr)));//[ 1, 3, 2 ]