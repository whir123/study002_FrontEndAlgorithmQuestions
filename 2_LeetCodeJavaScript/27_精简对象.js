/**
 * 现给定一个 [对象] 或 [数组] obj，返回一个精简对象。
 * 精简对象与原始对象相同，只是将包含[假值]的键移除。该操作适用于对象及其嵌套对象。
 * 数组被视为索引作为键的对象。当 Boolean(value) 返回 false 时，值被视为假值。
 * 你可以假设 obj 是 JSON.parse 的输出结果。换句话说，它是有效的 JSON。
 */

var compactObject = function(obj) {
    const flag = (x) => x!==null && typeof(x)==='object';

    if(Array.isArray(obj)){
        let res = [];
        for(const ele of obj){
            if (flag(ele)) { res.push(compactObject(ele)) }
            else if (Boolean(ele)) { // ⚠️ 仅保留真值
                res.push(ele);
            };
        };
        return res;
    };

    if(flag(obj)){
        let res = {};
        for(const [k, v] of Object.entries(obj)){
            //❗普通对象不是可迭代的 (not iterable)，for...of 只适用于数组、Map、Set、字符串等
            //❗Object.entries(obj) 得到 [[key, value], ...] 再 for...of | 返回一个由给定对象自有的可枚举字符串键属性的键值对组成的数组
            if (flag(v)) { res[k]=compactObject(v) }
            else if (Boolean(v)) {
                res[k] = v;
            };
        };
        return res;
    };
};

obj1 = [null, 0, false, 1];
console.log(compactObject(obj1));
// 输出：[1] | 解释：数组中的所有假值已被移除。

obj2 = {"a": null, "b": [false, 1]};
console.log(compactObject(obj2));
// 输出：{"b": [1]} | 解释：obj["a"] 和 obj["b"][0] 包含假值，因此被移除。

obj3 = [null, 0, 5, [0], [false, 16]];
console.log(compactObject(obj3));
// 输出：[5, [], [16]] | 解释：obj[0], obj[1], obj[3][0], 和 obj[4][0] 包含假值，因此被移除。