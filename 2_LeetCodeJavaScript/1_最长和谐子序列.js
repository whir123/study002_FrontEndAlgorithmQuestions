//和谐数组是指一个数组里元素的最大值和最小值之间的差别正好是 1
//给你一个整数数组nums ，请你在所有可能的【子序列】中找到【最长的和谐子序列】的长度
//数组的子序列是一个由数组派生出来的序列，它可以通过删除一些元素或不删除元素、且【不改变其余元素的顺序】而得到
var findLHS = function(nums) {
    //思路：和谐数组只能由两个相邻的数字（差为1）组成
    if(!nums || nums.length===0){return 0};
    let numsMap = new Map();
    let Max = 0;
    for(let i=0;i<nums.length;i++){
        numsMap.set(nums[i], (numsMap.get(nums[i])||0)+1);
    };
    for(const [key, value] of numsMap){//直接const k of numsMap k就是[key,val]数组 无法numsMao.get(key)
        if (numsMap.has(key+1)){
            Max = Math.max(Max,(value+numsMap.get(key+1)));
        }
    };
    return Max;
};
const nums1 = [1,3,2,2,5,2,3,7];
const nums2 = [1,2,3,4];
const nums3 = [1,1,1,1];
console.log(findLHS(nums1));//5
console.log(findLHS(nums2));//2
console.log(findLHS(nums3));//0