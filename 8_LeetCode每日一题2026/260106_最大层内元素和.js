/**
 * 难度：🟡
 * 
 * 给你一个二叉树的根节点root。设根节点位于二叉树的第 1 层，而根节点的子节点位于第 2 层，依此类推。
 * 返回总和最大的那一层的层号x。如果有多层的总和一样大，返回其中最小的层号 x。
 *         1    第一层
 *        / \
 *       7   0  第二层
 *      / \
 *     7  -8    第三层
 */

var maxLevelSum = function(root) {
    if (!root) return 0;
    
    let queue = [root];
    let level = 1;
    let ansLevel = 1;
    let maxSum = -Infinity;

    while (queue.length>0){
        let len = queue.length;
        let curSum = 0;

        for (let i=0; i<len; i++){
            let node = queue.shift();
            curSum += node.val;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        };

        if (curSum>maxSum) {
            ansLevel = level;
            maxSum = curSum;
        };
        level++;
    };

    return ansLevel;
};

// 🛠️ 数组转二叉树｜层序遍历
function arr2root(arr){
    if (!arr || arr.length===0 || arr[0]===null) return null;

    const root = {
        val: 0,
        left: null,
        right: null,
    };

    const queue = [root];
    let i = 1;

    while(queue.length && i<arr.length){
        const node = queue.shift();
        if (i<arr.length && arr[i]!==null) {
            node.left = {val:arr[i], left:null, right:null};
            queue.push(node.left);
        };
        i++;
        if (i<arr.length && arr[i]!==null) {
            node.right = {val:arr[i], left:null, rigth:null};
            queue.push(node.right);
        };
        i++
    };
    return root;
}

const arr1 = [1,7,0,7,-8,null,null];
const root1 = arr2root(arr1);
console.log(maxLevelSum(root1));
// 输出：2
// 解释：
// 第 1 层各元素之和为 1，
// 第 2 层各元素之和为 7 + 0 = 7，
// 第 3 层各元素之和为 7 + -8 = -1，
// 所以我们返回第 2 层的层号，它的层内元素之和最大。

const arr2 = [989,null,10250,98693,-89388,null,null,null,-32127];
const root2 = arr2root(arr2);
console.log(maxLevelSum(root2));
// 输出：2