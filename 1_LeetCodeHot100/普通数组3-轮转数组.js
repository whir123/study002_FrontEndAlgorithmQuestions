//给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数
//输入: nums = [1,2,3,4,5,6,7], k = 3
//输出: [5,6,7,1,2,3,4]
var rotate = function(nums, k) {//时间复杂度是 O(n*k) n:数组长度
    for(i=0;i<k;i++){
        let num = nums[nums.length-1];
        nums.pop();
        nums.unshift(num);//O(n)，因为需要移动所有剩余元素
    };
    return nums;
};
//【三次反转法】
var rotate2 = function(nums, k) {
    k = k % nums.length; //处理 k>数组长度
    //数组的 reverse() 方法不接受参数，它会直接反转整个数组
    //需要自定义反转函数
    function reverse(arr, start, end){
        while(start < end){
            [arr[start],arr[end]] = [arr[end],arr[start]];
            start++;
            end--
        };
        //return arr; //修改了原数组 无需返回
    };
    reverse(nums, 0, nums.length-1);    //反转整个数组
    reverse(nums, 0, k-1);              //反转前k个元素
    reverse(nums, k, nums.length-1);    //反转后面的元素
    return nums;
};
//【使用额外空间】
var rotate3 = function(nums, k) {
    k = k % nums.length;
    const rotated = [];
    //slice(start?, end?) 返回数组的浅拷贝片段（不修改原数组）
    //包含start 不包含end 
    //参数是【负数】 表示从数组末尾开始计算的索引  -1：倒数第一个元素……
    rotated.push(...nums.slice(-k));//先放原数组后k个元素
    rotated.push(...nums.slice(0,nums.length-k));//再放原数组前n-k个元素
    //splice(start, deleteCount?, ...items?) 修改原数组，删除或插入元素
    //(起始索引 要删除的元素个数 要插入的元素)
    nums.splice(0, nums.length, ...rotated);//复制回原数组
    return nums;
}
let nums = [1,2,3,4,5,6,7], k = 3;
console.log(rotate(nums,k));
let nums1 = [1,2,3,4,5,6,7], k1 = 3;
console.log(rotate2(nums1,k1));
let nums2 = [1,2,3,4,5,6,7], k2 = 3;
console.log(rotate3(nums2,k2));
