/**
 * 给你一个有序数组nums ，请你[原地]删除重复出现的元素，
 * 使得出现次数[超过两次]的元素[只出现两次] ，返回删除后[数组的新长度]。
 * 不要使用额外的数组空间，你必须在[原地]修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 */

var removeDuplicates = function(nums) {
    let slow = 1, fast = 1;
    let flag = 1;
    const n = nums.length;
    while(fast<n){
        if(nums[slow-1]!==nums[fast]){
            nums[slow++] = nums[fast];
            flag = 1;
        } else if (flag===1){
            nums[slow++] = nums[fast];
            flag = 2;
        };
        fast++;
    };
    return slow;
};

const nums = [0,0,1,1,1,1,2,3,3];
console.log(removeDuplicates(nums));