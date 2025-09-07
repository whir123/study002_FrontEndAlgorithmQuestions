// 请补全JavaScript代码，要求以数组的形式返回字符串参数的所有排列组合。
// 1. 字符串参数中的字符无重复且仅包含小写字母
// 2. 返回的排列组合数组不区分顺序
// 输入描述：_permute('abc')
// 输出描述：['abc','acb','bac','bca','cab','cba']

function _permute(str){
    const arr = str.split('');
    //console.log(arr); //[ 'a', 'b', 'c' ]
    const res = [];

    function traceBack(start){
        if(start===arr.length){
            res.push(arr.join(''));
            return;
        };

        for(let i=start; i<arr.length; i++){
            [arr[start], arr[i]] = [arr[i], arr[start]];
            traceBack(start+1);
            [arr[start], arr[i]] = [arr[i], arr[start]];
        };
    };

    traceBack(0);
    return res;
};
// ⭐️ 回溯就是深度优先搜索 + 撤销选择：
// 在每一层你做一个选择（把某个元素放到当前位置），递归进入下一层，完成后把选择撤销（回溯），以便尝试其它选择
console.log(_permute('abc')); //[ 'abc', 'acb', 'bac', 'bca', 'cba', 'cab' ]