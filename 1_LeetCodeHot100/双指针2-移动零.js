//给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
//请注意 必须在不复制数组的情况下原地对数组进行操作。(不能使用额外空间)

let nums = [0, 1, 0, 3, 12];
function moveZeroes(nums){
    let left = 0; // 指向下一个非零元素的位置
    const n = nums.length;
    // 第一步：将所有非零元素移到前面
    for (let i = 0; i < n; i++) {
        if (nums[i] !== 0) {
            nums[left] = nums[i];
            left++;
        }
    }
    // 第二步：将剩余位置补零
    for (let i = left; i < n; i++) {
        nums[i] = 0;
    }
};
moveZeroes(nums);
console.log(nums);
