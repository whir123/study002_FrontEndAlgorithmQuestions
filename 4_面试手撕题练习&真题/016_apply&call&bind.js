// ⭐️ apply
// 🚨 1 传入的 thisArg 会被处理为 context 对象（null/undefined 映射到 globalThis，其余用 Object() 装箱）。
// 🚨 2 函数会被临时挂载到 context 上，然后以 context 作为 this 执行。
// 🚨 3 执行时，函数内部访问 this，就会指向你传入的 thisArg（或其装箱对象）。
Function.prototype.myApply = function (thisArg, arrArg) {
    if(typeof this !== 'function'){
        throw new TypeError('need function!');
    };

    // ⚠️ null/undefined 映射到 globalThis，其余用 Object() 装箱
    // 在 JS 规范中，1️⃣ 如果 thisArg 传入 null 或 undefined，实际调用时 this 会被自动指向全局对象（浏览器下是 window，Node.js 下是 global，这里用 globalThis 兼容所有环境）。
    // 2️⃣ 如果传入的是基本类型（如数字、字符串、布尔值），JS 会自动用 Object() 把它“装箱”为对应的对象类型（如 new Number(1)、new String('a')）。
    // 3️⃣ 如果传入的是对象，则直接用该对象作为 this
    let context = (thisArg===null||thisArg===undefined) ? globalThis : Object(thisArg);

    let fnKey = Symbol();
    context[fnKey] = this; // 函数临时挂载到context上 this就指向thisArg

    let result;
    if(!arrArg){
        result = context[fnKey]();
    } else {
        result = context[fnKey](...arrArg);
    }
    delete context[fnKey];
    return result;
};

Function.prototype.myCall = function (thisArg, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('need function!');
    };

    let context = (thisArg===null||thisArg===undefined) ? globalThis : Object(thisArg);

    let fnKey = Symbol();
    context[fnKey] = this;
    let result = context[fnKey](...args);
    delete context[fnKey];
    return result;
}