/**
 * 难度：🟡
 * 
 * 这里有一个非负整数数组 arr，你最开始位于该数组的起始下标 start 处。
 * 当你位于下标 i 处时，你可以跳到 i + arr[i] 或者 i - arr[i]。
 * 请你判断自己是否能够跳到对应元素值为 0 的 任一 下标处。
 * 注意，不管是什么情况下，你都无法跳到数组之外。
 */

var canReach = function(arr, start) {
    const visited = new Set();

    function dfs(index){ //【 ⚠️ 深度优先搜索 】
        if (index<0 || index>=arr.length){
            return false;
        };

        if (visited.has(index)) return false;

        if (arr[index]===0) return true;

        visited.add(index);

        const jump = arr[index];
        return (dfs(index-jump) || dfs(index+jump)); // ⚠️
    };

    return dfs(start);
};

const arr1 = [4,2,3,0,3,1,2], start1 = 5;
console.log(canReach(arr1, start1));
// 输出：true
// 解释：
// 到达值为 0 的下标 3 有以下可能方案： 
// 下标 5 -> 下标 4 -> 下标 1 -> 下标 3 
// 下标 5 -> 下标 6 -> 下标 4 -> 下标 1 -> 下标 3 

const arr2 = [4,2,3,0,3,1,2], start2 = 0;
console.log(canReach(arr2, start2));
// 输出：true 
// 解释：
// 到达值为 0 的下标 3 有以下可能方案： 
// 下标 0 -> 下标 4 -> 下标 1 -> 下标 3