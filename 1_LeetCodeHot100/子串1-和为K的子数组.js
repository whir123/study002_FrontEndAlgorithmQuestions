//给你一个整数数组nums和一个整数k ，请你统计并返回该数组中和为k的子数组的个数
//子数组是数组中元素的【连续非空】序列

var subarraySum = function(nums, k) {
    //设 sum[j] - sum[i] = k，即子数组 [i+1, j] 的和为 k
    let preSum = 0;//preSum 用于记录当前遍历到的元素之前所有元素的累计和【前缀和】
    let count = 0;
    const map = new Map();
    //！！！map.set(key, value);设置键值对
    map.set(0, 1); //初始化：前缀和为0开始就出现1次
    for (let num of nums){
        preSum += num;
        if (map.has(preSum - k)){
            //当前位置前缀和preSum 如果曾经出现过preSum-k 就找到一个子序列
            count += map.get(preSum - k);//【加的是出现次数】
            //每次找到一次合法的 preSum - k，就将其出现的次数加到结果里
        }
        //！！！map.get(key);获取指定键的值key ——> value;
        map.set(preSum, (map.get(preSum)||0)+1);//将当前preSum存入哈希表 / 更新出现次数
    }
    return count;
};

const nums = [1,1,1];
const k = 2;
console.log(subarraySum(nums, k));