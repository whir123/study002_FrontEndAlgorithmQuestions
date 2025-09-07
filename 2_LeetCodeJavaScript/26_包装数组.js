/**
 * 创建一个名为 ArrayWrapper 的类，它在其构造函数中接受一个整数数组作为参数。该类应具有以下两个特性：
 * 当使用 + 运算符将两个该类的实例相加时，结果值为两个数组中所有元素的总和。
 * 当在实例上调用 String() 函数时，它将返回一个由逗号分隔的括在方括号中的字符串。例如，[1,2,3] 。
 */

var ArrayWrapper = function(nums){ // ⭐️ 此构造函数可能会转换为类声明
    this.nums = nums;
};

// ⚠️ 在 JavaScript 里，类实例本身不能直接重载运算符，但可以通过 valueOf 方法 来控制当实例用于算术运算时的值
// ⚠️ 当执行 obj1 + obj2 时，JS 会自动调用 obj1.valueOf() 和 obj2.valueOf()，然后把结果相加
ArrayWrapper.prototype.valueOf = function(){
    return this.nums.reduce((a,b) => a+b, 0);// ⚠️ reduce不能用于空数组 但是参数中传入空数组0就可以
    // 逐个遍历数组元素，每一步都将当前元素的值与前一步的结果相加
};

// ⚠️ 当执行 String(obj) 或者 obj.toString() 时，会调用对象的 toString() 方法
ArrayWrapper.prototype.toString = function(){
    // ⭐️ 1 用 JSON.stringify 最简单
    // return JSON.stringify(this.nums);
    // ⭐️ 2 手写
    return "[" + this.nums.join(",") + "]";
};

const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
console.log(obj1 + obj2); // 10
const obj3 = new ArrayWrapper([23,98,42,70]);
console.log(String(obj3)); // "[23,98,42,70]"
const obj4 = new ArrayWrapper([]);
const obj5 = new ArrayWrapper([]);
console.log(obj4 + obj5); // 0