// 复制到浏览器运行 Node.js 环境下无法运行 
// document、window、Element、Node 等这些对象 都是浏览器里的 Web API，在 Node.js 环境里并不存在

// 元素节点 Element Node
let el = document.createElement("div");
console.log(el.nodeName);       // DIV
console.log(el.nodeType);       // 1
console.log(el);                // <div></div>
// ⬆️ 实际上这是一个 HTMLDivElement 对象（继承自 Element、Node）
// 如果展开，会看到它的属性（id, className, style…）
console.log(el.toString());     // [object HTMLDivElement]

// 文本节点 Text Node
let txt = document.createTextNode("Hello");
console.log(txt.nodeName);      // #text
console.log(txt.nodeType);      // 3
console.log(txt);               // "Hello"
// ⬆️ 它是 Text 对象，不是纯字符串

// 文档节点 Document
console.log(document);
// 👉 输出整个文档对象，一般会显示为：
// #document
// <html>...</html>
// 它是 Document 对象的实例

/**
 * 🌟 控制台里显示的 <div>、#text、#comment、#document 等只是直观表示。
 * 真正上是对象（继承自 Node）。 可以用 toString() 或 nodeName 来看它的字符串形式。
 */

console.log(document instanceof Node);          // true
console.log(document instanceof Document);      // true
console.log(document instanceof HTMLDocument);  // true

let div = document.createElement("div");
console.log(div instanceof Node);               // true
console.log(div instanceof Element);            // true
console.log(div instanceof HTMLElement);        // true
console.log(div instanceof HTMLDivElement);     // true
