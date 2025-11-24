/**
 * 给定一个二进制数组 nums ( 索引从0开始 )。
 * 将 xi 定义为：其二进制表示形式为子数组 nums[0..i] (从最高有效位到最低有效位)。
 * 例如，如果 nums =[1,0,1] ，那么 x0 = 1, x1 = 2, 和 x2 = 5。
 * 返回布尔值列表 answer，只有当 xi 可以被 5 整除时，答案 answer[i] 为 true，否则为 false。
*/

// ⭐️ A % 5 == (A mod 5)
// ⭐️ A_new = A_old * 2 + bit
// ⭐️ (A_old * 2 + bit) % 5 = ( (A_old % 5) * 2 + bit ) % 5

var prefixesDivBy5 = function(nums) {
    let answer = [];
    let cur = 0; // 只维护当前 xi mod 5
    for (let bit of nums){
        cur = (cur * 2 + bit) % 5;
        answer.push(cur===0);
    };
    return answer;
};

const nums1 = [0,1,1];
console.log(prefixesDivBy5(nums1));
// 输出：[true,false,false]
// 解释：输入数字为 0, 01, 011；也就是十进制中的 0, 1, 3 。只有第一个数可以被 5 整除，因此 answer[0] 为 true 。

const nums2 = [1,1,1];
console.log(prefixesDivBy5(nums2));
// 输出：[false,false,false]