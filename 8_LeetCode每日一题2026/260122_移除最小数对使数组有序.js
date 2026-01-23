/**
 * 难度：🟢
 * 
 * 给你一个数组 nums，你可以执行以下操作任意次数：
 * 选择相邻元素对中【和最小】的一对。如果存在多个这样的对，选择最左边的一个。用它们的和替换这对元素。
 * 返回将数组变为【非递减】所需的最小操作次数。
 * 如果一个数组中每个元素都大于或等于它前一个元素（如果存在的话），则称该数组为非递减。
 */

var minimumPairRemoval = function(nums) {
    let opt = 0;

    function isOK(arr){
        for (let i=1; i<arr.length; i++){
            if(arr[i-1]>arr[i]) return false;
        };
        return true;
    };

    while (!isOK(nums)){
        let minSum = Infinity;
        let idx = 0;
        for (let i=0; i<nums.length-1; i++){
            const s = nums[i]+nums[i+1];
            if (s<minSum){
                minSum = s;
                idx = i;
            };
        };
        nums.splice(idx, 2, nums[idx]+nums[idx+1]); // 在idx处，移除2个元素，插入nums[idx]+nums[idx+1]
        opt++;
    };

    return opt;
};

const nums1 = [5,2,3,1];
console.log(minimumPairRemoval(nums1));
// 输出： 2
// 元素对 (3,1) 的和最小，为 4。替换后 nums = [5,2,4]。
// 元素对 (2,4) 的和为 6。替换后 nums = [5,6]。
// 数组 nums 在两次操作后变为非递减。

const nums2 = [1,2,2];
console.log(minimumPairRemoval(nums2));
// 输出： 0