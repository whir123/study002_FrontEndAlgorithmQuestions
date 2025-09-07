//给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 
//满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
//注意：答案中不可以包含重复的三元组

let nums = [-1, 0, 1, 2, -1, -4];
function threeSum(nums){
    nums.sort((a,b)=>a-b);//排序去重（升序）
    //JavaScript 的 sort() 默认将元素【转为字符串】后【按 Unicode 排序】，导致数字排序错误
    //里面是 sort()方法的比较函数，告诉JavaScript如何比较两个元素a和b的大小【数字升序排序】
    //返回值：负数 → a 排在 b 前面（a 更小）  正数 → b 排在 a 前面（b 更小）
    const n =nums.length;
    let result = [];
    for(let i=0; i<n-2; i++){
        if(i>0 && nums[i]===nums[i-1]) continue;//!!跳过重复的
        let target = -nums[i];
        //Map对象：键值对存储：键可以是任意类型（对象、函数等），而普通对象的键只能是字符串或 Symbol
        const numMap = new Map();//哈希表存储 nums[j]
        for(let j=i+1; j<n; j++){
            let complement = target - nums[j];
            if (numMap.has(complement)){
                result.push([nums[i],nums[j],complement]);
                while(j<n-1 && nums[j]===nums[j+1]) j++;//！！跳过重复的
            }
            numMap.set(nums[j],j);
        }
    }
    return result;
};
console.log(threeSum(nums));