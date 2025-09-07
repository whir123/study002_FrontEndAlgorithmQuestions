/**
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums
 * 原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色
 * 必须在不使用库内置的 sort 函数的情况下解决这个问题
 */

// Dutch National Flag 算法（荷兰国旗问题）
// 专门用于对只有三种值的数组进行排序的高效算法
// 其核心思想是通过一次遍历将数组分为三个部分
var sortColors = function(nums) {
    let low = 0;
    let mid = 0;
    let high = nums.length-1; // 三个指针
    while(mid<=high){
        //！！不能独立if 一次循环处理一种情况
        if(nums[mid]===0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++; mid++;
        } else if(nums[mid]===1) {
            mid++;
        } else { // (nums[mid]===2)
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--; mid++;
        };
    };
    return nums;
};

// 自己写的：冒泡排序
var sortColors2 = function(nums) {
    let n = nums.length;
    let flag = true;
    while(flag){
        flag = false;
        for(let i=0; i<n-1; i++){
            if(nums[i]>nums[i+1]){
                [nums[i], nums[i+1]] = [nums[i+1], nums[i]];
                flag = true;
            };
        };
    };
    return nums;
};

const nums1 = [2,0,2,1,1,0];
console.log(sortColors(nums1));
const nums2 = [2,0,1];
console.log(sortColors(nums2));