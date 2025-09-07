/**
 * Trie（发音类似 "try"）“前缀树”
 * 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。
 * 这一数据结构有相当多的应用情景，例如自动补全和拼写检查。
 * 
 * 请你实现 Trie 类：
 * Trie() 初始化前缀树对象。
 * void insert(String word) ｜向前缀树中插入字符串 word 。
 * boolean search(String word) ｜如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
 * boolean startsWith(String prefix) ｜如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
 * 
 * 示例：
 * 输入：
 * ["Trie", "insert",   "search",   "search",   "startsWith",   "insert",   "search"]
 * [[],     ["apple"],  ["apple"],  ["app"],    ["app"],        ["app"],    ["app"]]
 * 输出：
 * [null,   null,       true,       false,      true,           null,       true]
 */

//[用 var 构造函数实现 Trie]
var Trie = function () {
    this.root = {}; //用普通对象代替 class 的实例
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let node = this.root;
    for (const char of word) {
        if (!node[char]) {
            node[char] = {}; // 不存在则创建子节点
        };
        node = node[char];
    };
    node.isEnd = true; // 标记单词结束
};
//假如插入"app" 结构会变成：
// this.root = {
//     a: {
//         p: {
//             p: {
//                 isEnd: true  // 标记 "app" 结束
//             }
//         }
//     }
// }

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    let node = this.root;
    for (const char of word){
        if(!node[char]){
            return false;
        };
        node = node[char];
    };
    return !!node.isEnd; // 最后检查是否是完整单词
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    let node = this.root;
    for (const char of prefix){
        if(!node[char]){
            return false;
        };
        node = node[char];
    };
    return true; // 前缀存在即可
};

// 插入adbb 再插入adcc：
// this.root = {
//     a: {
//         d: {
//             b: {
//                 b: { isEnd: true }
//             },
//             c: {
//                 c: { isEnd: true }
//             }
//         }
//     }
// }
//搜索中不会误判