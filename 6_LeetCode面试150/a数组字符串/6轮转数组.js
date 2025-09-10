/**
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 */

var rotate0 = function(nums, k) {
    // for(let i=0; i<k; i++){
    //     nums.unshift(nums.pop());
    // };
    // ⚠️⬆️ 超时了！
    let trueK = k % nums.length;
    let tem = nums.splice(nums.length-trueK, trueK);
    nums.unshift(...tem);
    return nums;
    // ⚠️⬆️ 也不够快
};

//❕❕三次反转法
function reverse(nums,left,right){
    while(left<right){
        [nums[left],nums[right]] = [nums[right],nums[left]];
        left++;
        right--;
    };
};
var rotate = function(nums, k) {
    k = k % nums.length;
    reverse(nums, 0, nums.length-1);
    reverse(nums, 0, k-1);
    reverse(nums, k, nums.length-1);
    return nums;
}

const nums1 = [1,2,3,4,5,6,7], k1 = 3;
console.log(rotate(nums1, k1));
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]

const nums2 = [-1,-100,3,99], k2 = 2;
console.log(rotate(nums2, k2));
// 输出：[3,99,-1,-100]
// 解释: 
// 向右轮转 1 步: [99,-1,-100,3]
// 向右轮转 2 步: [3,99,-1,-100]