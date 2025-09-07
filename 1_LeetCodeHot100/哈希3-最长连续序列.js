//给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
//请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
var longestConsecutive = function(nums){
    let numSet = new Set(nums);
    let longest = 0;
    for(const num of numSet){
        if(!numSet.has(num-1)){//如果没有num-1 就把这个num看作一个开头
            let currentLong = 1;
            let currentNum = num;
            while(numSet.has(currentNum+1)){//不断检查扩展序列
                currentLong++;
                currentNum++;
            }
            longest = Math.max(currentLong, longest);
        }
    }
    return longest;
}

const nums = [100,4,200,1,3,2];
console.log(longestConsecutive(nums));//4