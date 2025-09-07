//给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数
//请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案
//示例 1：输入：nums = [1,2,0]          输出：3     解释：范围 [1,2] 中的数字都在数组中。
//示例 2：输入：nums = [3,4,-1,1]       输出：2     解释：1 在数组中，但 2 没有。
//示例 3：输入：nums = [7,8,9,11,12]    输出：1     解释：最小的正数 1 没有出现。
var firstMissingPositive = function(nums) {
    let n = nums.length;
    for(i=0;i<n;i++){//哈希 索引<——>数值
        while(nums[i]>0 && nums[i]<n && nums[nums[i]-1]!==nums[i]){
            const j = nums[i]-1;
            [nums[i], nums[j]] = [nums[j],nums[i]];//交换到正确的位置上
        }
    };
    for(i=0;i<n;i++){
        if(nums[i]!==i+1){
            return i+1;
        }
    }
    return n+1; //前面所有位置都正确的情况
};
const nums1 = [1,2,0], nums2 = [3,4,-1,1];
console.log(firstMissingPositive(nums1));
console.log(firstMissingPositive(nums2));