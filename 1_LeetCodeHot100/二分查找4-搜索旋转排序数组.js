//整数数组 nums 按【升序排列】，数组中的值【互不相同】
//在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了旋转
//使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]
//例如，[0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 
//给你旋转后的数组nums和一个整数target，如果nums中存在这个目标值target，则返回它的下标（旋转后的下标），否则返回-1
//必须设计一个时间复杂度为 O(log n) 的算法解决此问题
var search = function(nums, target) {
    let left = 0, right = nums.length-1;
    while(left <= right){
        let mid = Math.floor((left+right)/2);
        if(nums[mid]===target){return mid}
        //判断有序的一侧
        if(nums[left]<=nums[mid]){//左半边是有序的 
            if(nums[left]<=target && target<=nums[mid]){//target落在左半边
                right = mid-1;
            }else{left = mid+1};
        } else {//右半边是有序的
            if(nums[mid]<=target && target<=nums[right]){//target落在右半边
                left = mid+1;
            }else{right = mid-1};
        }
    };
    return -1;
};

let nums = [4,5,6,7,0,1,2], target = 0;
let nums1 = [5,1,3], target1 = 3;
console.log(search(nums,target));
console.log(search(nums1,target1));