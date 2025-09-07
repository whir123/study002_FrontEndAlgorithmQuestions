//给定一个【排序数组】和一个【目标值】，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
//请必须使用时间复杂度为 O(log n) 的算法。
var searchInsert = function(nums,target){
    let left = 0;
    let right = nums.length - 1;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if (nums[mid]===target){return mid;}
        else if (nums[mid]<target){left=mid+1;}
        else {right=mid-1;}
    };
    return left;//如果没找到 left是插入位置
};

const nums1 = [1,3,5,6];
const target1 = 5;
const nums2 = [1,3,5,6];
const target2 = 7;
console.log(searchInsert(nums1,target1));//2
console.log(searchInsert(nums2,target2));//4