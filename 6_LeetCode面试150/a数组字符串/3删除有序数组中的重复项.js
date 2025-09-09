/**
 * 给你一个非严格递增排列的数组 nums
 * 请你[原地]删除重复出现的元素，使每个元素只出现一次 ，返回删除后数组的新长度。
 * 元素的相对顺序应该保持一致 。然后返回 nums 中唯一元素的个数。
 * 考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：
 * 更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。
 * nums 的其余元素与 nums 的大小不重要。返回 k 。
 */

var removeDuplicates = function(nums) {
    // nums = Array.from(new Set(nums));
    // return nums;
    // ⬆️ 只改变了函数内的nums 外部nums不会变化

    // ⬇️ 快慢指针
    let slow = 1, fast = 1;
    while(fast<nums.length){
        if(nums[fast]!==nums[slow-1]){
            nums[slow++] = nums[fast];
        };
        fast++;
    };
    return slow;
};

const nums = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(nums));