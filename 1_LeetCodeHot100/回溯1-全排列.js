// 给定一个不含重复数字的数组nums ，返回其所有可能的全排列 你可以按任意顺序返回答案
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

//【方法1：回溯法】【交换元素】【时间复杂度：O(n×n!)，因为有n!个排列，每个排列需要O(n)时间生成】
var permute = function(nums) {
    const result = [];

    function backtrack(start){
        if(start === nums.length){
            result.push([...nums]);
            return;
        }
        for(let i=start;i<nums.length;i++){
            [nums[start],nums[i]] = [nums[i],nums[start]];//当前元素与起始元素交换
            backtrack(start+1);//递归处理下一个位置
            [nums[start],nums[i]] = [nums[i],nums[start]];//回溯 恢复交换
        }
    }

    backtrack(0);
    return result;
};

//【方法2：回溯法】【使用额外空间】【更直观易懂】
var permute2 = function(nums) {
    const result = [];
    const used = new Array(nums.length).fill(false);

    function backtrack(path){
        if(path.length === nums.length){
            result.push([...path]);
            return;
        }
        for(let i=0;i<nums.length;i++){
            if(!used[i]) {
                used[i] = true;
                path.push(nums[i]);
                backtrack(path);
                path.pop();
                used[i] = false;
            }
        }
    };

    backtrack([]);
    return result;
};

const nums = [1,2,3];
console.log(permute(nums));
console.log(permute2(nums));