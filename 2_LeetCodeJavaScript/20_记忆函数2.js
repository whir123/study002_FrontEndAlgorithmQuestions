//现给定一个函数 fn ，返回该函数的一个记忆化版本。
//一个记忆化的函数是一个函数，它不会被相同的输入调用两次。而是会返回一个缓存的值。
//函数 fn 可以是任何函数，对它所接受的值类型没有任何限制。
//如果两个输入值在 JavaScript 中使用 === 运算符比较时相等，则它们被视为相同。

//【基础版memoize】
function memoizeSimple(fn) {
  const cache = new Map(); //Map储存缓存结果
  return function (...args) {
    const key = JSON.stringify(args); //缓存键：参数的字符串形式
    if (cache.has(key)) { return cache.get(key); }; //缓存有 直接返回结果
    const result = fn.apply(this, args);
    // const result = fn.call(this,...args);
    cache.set(key, result); //缓存结果
    return result;
  };
}
//存在问题：
// 1：无法区分不同的空对象 {}（示例 2）：{} 和 {} 在 JavaScript 中不是 === 相等的，但 JSON.stringify 后都是 "{}"
// 2：如果 args 包含函数、Symbol、循环引用等，JSON.stringify 会失败或丢失信息
// 3：=== 比较要求参数完全相同（如示例 3 中的 o 是同一个对象引用），而 JSON.stringify 无法精确模拟这种行为

//【改进版】：
function memoize(fn) {
  const cache = new Map();

  return function (...args) { //「返回一个新的函数 剩余参数语法...接受所有传入参数」
    // 生成基于 引用和值 的复合键
    const key = args.map(arg => {
      // 处理对象类型 包括数组、函数等
      if (typeof arg === 'object' && arg !== null) {//「对参数数组args进行map操作，将每个参数转换为一个字符串标识」
        //typeof null 也是 'object'，所以需要额外排除 null
        //调用辅助函数 为每个对象创建一个唯一标识符
        return `obj:${getObjectId(arg)}`; //「返回格式为 "obj:<唯一ID>" 的字符串」
        //「相同对象引用会得到相同ID，不同对象即使内容相同也会得到不同ID」
      }

      // 处理 Symbol 类型
      if (typeof arg === 'symbol') {
        return `symbol:${Symbol.keyFor(arg) || getObjectId(arg)}`;
      }// 「Symbol.keyFor() 从全局 Symbol 注册表中检索 Symbol 的键」

      // 处理其他类型
      return `${typeof arg}:${String(arg)}`; // 「返回格式为 "<类型>:<值>"的字符串」
    }).join('|');//「将转换后的所有参数标识用 | 连接起来」

    if (cache.has(key)) { return cache.get(key); };
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
//【为对象生成唯一ID的辅助函数】
let objectIdCounter = 0;
const objectIdMap = new WeakMap();
function getObjectId(obj) {
  if (!objectIdMap.has(obj)) {
    objectIdMap.set(obj, ++objectIdCounter);
  }
  return objectIdMap.get(obj);
}

//示例 1：
const getInputs1 = () => [[2, 2], [2, 2], [1, 2]], fn1 = function (a, b) { return a + b; };
const inputs1 = getInputs1();
const memoized1 = memoize(fn1);
for (const arr of inputs1) {
  console.log(memoized1(...arr));
}
// [{"val":4,"calls":1},{"val":4,"calls":1},{"val":3,"calls":2}]
// 对于参数为 (2, 2) 的输入: 2 + 2 = 4，需要调用 fn() 。
// 对于参数为 (2, 2) 的输入: 2 + 2 = 4，这些输入之前已经出现过，因此不需要再次调用 fn()。
// 对于参数为 (1, 2) 的输入: 1 + 2 = 3，需要再次调用 fn()，总共调用了 2 次。

//示例 2：
const getInputs2 = () => [[{}, {}], [{}, {}], [{}, {}]], fn2 = function (a, b) { return a + b; }
const inputs2 = getInputs2();
const memoized2 = memoize(fn2);
for (const arr of inputs2) {
  console.log(memoized2(...arr));
}
// [{"val":{},"calls":1},{"val":{},"calls":2},{"val":{},"calls":3}]
// 将两个空对象合并总是会得到一个空对象。尽管看起来应该缓存命中并只调用一次 fn()，但是这些空对象彼此之间都不是 === 相等的。

//示例 3：
const getInputs3 = () => { const o = {}; return [[o, o], [o, o], [o, o]]; }, fn3 = function (a, b) { return ({ ...a, ...b }); }
const inputs3 = getInputs3();
const memoized3 = memoize(fn3);
for (const arr of inputs3) {
  console.log(memoized3(...arr));
}
// [{"val":{},"calls":1},{"val":{},"calls":1},{"val":{},"calls":1}]
// 将两个空对象合并总是会得到一个空对象。因为传入的每个对象都是相同的(===)，所以第二个和第三个函数调用都会命中缓存。
