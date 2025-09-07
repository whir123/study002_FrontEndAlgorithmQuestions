/**
 * 现给定两个数组 arr1 和 arr2 ，返回一个新的数组 joinedArray 。
 * 两个输入数组中的每个对象都包含一个 id 字段。
 * joinedArray 是一个通过 id 将 arr1 和 arr2 连接而成的数组。
 * joinedArray 的长度应为唯一值 id 的长度。返回的数组应按 id 升序排序。
 * 如果一个 id 存在于一个数组中但不存在于另一个数组中，则该对象应包含在结果数组中且不进行修改。
 * 如果两个对象共享一个 id ，则它们的属性应进行合并：
 * 如果一个键只存在于一个对象中，则该键值对应该包含在对象中。
 * 如果一个键在两个对象中都包含，则 arr2 中的值应覆盖 arr1 中的值。
 */

var join = function(arr1, arr2) {
    const m = new Map();

    for(const obj of arr1){
        m.set(obj.id, {...obj});
    };
    for(const obj of arr2){
        if(m.has(obj.id)){
            m.set(obj.id, {...m.get(obj.id), ...obj})
        } else {
            m.set(obj.id, {...obj});
        };
    };

    return Array.from(m.values()).sort((a,b) => a.id - b.id);
    // ⭐️ Map 实例的 values() 方法返回一个新的【map迭代器对象】，该对象包含此 map 中每个元素的值，按插入顺序排列
    // ⭐️ Array.from() 静态方法从【可迭代】或【类数组】对象创建一个新的浅拷贝的数组实例
    // ⭐️ sort(compareFn) | compareFn返回值>0 a排在b之后
};

//【测试】
const arr1 = [
    {"id": 1, "x": 1},
    {"id": 2, "x": 9}
], 
arr2 = [
    {"id": 3, "x": 5}
];
console.log(join(arr1, arr2));
// 输出：
// [
//     {"id": 1, "x": 1},
//     {"id": 2, "x": 9},
//     {"id": 3, "x": 5}
// ]

const arr3 = [
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 3, "y": 6}
], 
arr4 = [
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
];
console.log(join(arr3, arr4));
// 输出：
// [
//     {"id": 1, "x": 2, "y": 3},
//     {"id": 2, "x": 10, "y": 20},
//     {"id": 3, "x": 0, "y": 0}
// ]