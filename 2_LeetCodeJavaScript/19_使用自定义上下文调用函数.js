//增强所有函数，使其具有 callPolyfill 方法。该方法接受一个对象 obj 作为第一个参数，以及任意数量的附加参数。
//obj 成为函数的 this 上下文。附加参数将传递给该函数（即 callPolyfill 方法所属的函数）。
// 例如，如果有以下函数：
// function tax(price, taxRate) {
//   const totalCost = price * (1 + taxRate);
//   console.log(`The cost of ${this.item} is ${totalCost}`);
// }
//调用 tax(10, 0.1) 将输出 "The cost of undefined is 11" 。这是因为 this 上下文未定义。
//然而，调用 tax.callPolyfill({item: "salad"}, 10, 0.1) 将输出 "The cost of salad is 11" 。
//this 上下文被正确设置，函数输出了适当的结果。
//请在不使用内置的 Function.call 方法的情况下解决这个问题。

Function.prototype.callPolyfill = function(context, ...args) {
    context = context || globalThis;//处理 context 为 null / undefined 的情况
    context = Object(context); //确保 context 是一个对象
    //原始值（number, string, boolean 等）不能作为 this 的绑定目标
    //我们需要在 context 上临时添加方法属性，所以必须确保它是对象
    //(也可以不使用context作为中转 而创建全新的对象)
    let fnKey = Symbol(); // 创建唯一属性名 避免覆盖原有属性
    context[fnKey] = this; // 将【当前函数（this）】赋值给 context 的临时属性
    const result = context[fnKey](...args);
    //【！！！作为context的方法调用 里面this自然指向context】
    delete context[fnKey]; // 删除临时属性
    return result;
};

// test1
function showInfo(age, profession) {
  console.log(`Name: ${this.name}, Age: ${age}, Profession: ${profession}`);
}
const person = { name: 'Bob' };
showInfo.call(person, 30, 'Engineer'); // 使用原生 call // Name: Bob, Age: 30, Profession: Engineer
showInfo.callPolyfill(person, 30, 'Engineer');// Name: Bob, Age: 30, Profession: Engineer

// test2
function tax(price, taxRate) {
  const totalCost = price * (1 + taxRate);
  console.log(`The cost of ${this.item} is ${totalCost}`);
}
tax.callPolyfill({item: "salad"}, 10, 0.1); // The cost of salad is 11

//[call]    接受参数列表（多个单独参数）
//[apply]   接受参数数组（单个数组参数）