/**
 * 给你一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素。
 * 元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。
 * 假设 nums 中不等于 val 的元素数量为 k，要通过此题，您需要执行以下操作：
 * 更改 nums 数组，使 nums 的前 k 个元素包含不等于 val 的元素。
 * nums 的其余元素和 nums 的大小并不重要。返回 k。
 */

var removeElement = function(nums, val) {
    // ⚠️ 快慢指针 快指针遇到就赋值到慢指针那里
    let slow = 0, fast = 0;
    const n = nums.length;
    while(fast<n){
        if(nums[fast]!==val){
            nums[slow++] = nums[fast];
        };
        fast++;
    };
    return slow; // slow 就是 k
};

const nums = [3,2,2,3], val = 3;
console.log(removeElement(nums, val))
// 输出：2, nums = [2,2,_,_]
// 解释：你的函数函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。