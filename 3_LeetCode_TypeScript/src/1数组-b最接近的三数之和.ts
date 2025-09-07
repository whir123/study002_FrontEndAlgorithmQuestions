/**
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target
 * 请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 * 返回这三个数的和。
 * 假定每组输入只存在恰好一个解。
 */

// 排序 + 双指针
function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a,b) => a-b);
    let result = nums[0]!+nums[1]!+nums[2]!;

    for(let i=0; i<nums.length-2; i++){ // i从首 -> 倒数第三位 接下来是left right
        let left:number = i+1
        let right:number = nums.length-1;

        while(left<right){
            let curSum = nums[i]!+nums[left]!+nums[right]!;

            if(Math.abs(curSum-target)<Math.abs(result-target)){
                result = curSum;
            };

            if(curSum<target){
                left++;
            } else if(curSum>target){
                right--;
            } else return result; // 等于 直接返回
        };
    }
    return result;
};
console.log(threeSumClosest([-1,2,1,-4], 1)); // 2
console.log(threeSumClosest([0,0,0], 1)) // 0
console.log(threeSumClosest([1,1,1,0], -100)) // 2