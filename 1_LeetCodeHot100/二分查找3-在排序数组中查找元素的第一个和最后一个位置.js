//给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
//如果数组中不存在目标值 target，返回 [-1, -1]。
//你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

var searchRange = function(nums, target) {//一次找左边界 一次找右边界
    function findLeft(nums, target){
        let left = 0, right = nums.length-1;
        while(left<right){
            let mid = Math.floor((left+right)/2);
            if(nums[mid]>=target){right=mid;}//重点等号跟着大于号还是小于号
            else{left=mid+1};
        };
        if (nums[left]!==target) return -1;
        return left;
    };
    function findRight(nums, target){
        let left = 0, right = nums.length-1;
        while(left<right){
            let mid = Math.ceil((left+right)/2);
            if(nums[mid]<=target){left=mid;}
            else{right=mid-1};
        };
        if (nums[right]!==target) return -1
        return right;
    };
    let result = [findLeft(nums,target),findRight(nums,target)];
    return result;
};

const nums = [5,7,7,8,8,10], target = 8
const nums1 = [5,7,7,8,8,8,10], target1 = 8
console.log(searchRange(nums, target));//[3,4]
console.log(searchRange(nums1, target1));//[3,5]