// 为 Array 对象添加一个去除重复项的方法
Array.prototype.uniq = function () {
    return Array.from(new Set(this));
    //❗️Set只能去除基本类型的重复项 对于{}这样的对象 没个对象引用都不同 无法去重
    //❗️对象无法去重是 JS 的特性
};

const arr = [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN];
console.log(arr.uniq());
// [ false, true, undefined, null, NaN, 0, 1, {}, {}, 'a' ]