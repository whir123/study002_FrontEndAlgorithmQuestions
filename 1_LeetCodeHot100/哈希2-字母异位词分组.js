//给你一个字符串数组，请你将【字母异位词】组合在一起。可以按任意顺序返回结果列表。
//字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

function groupAnagrams(strs){
    const map = new Map();//new一个Map对象
    for (const word of strs) {//遍历strs中每一个字符串："eat", "tea"……
        const sorted = word.split('').sort().join('');//将字符串按照字母排序后作为key
        //word.split('') ： 将单词分割成字符数组，如 "eat" → ["e", "a", "t"]【按空字符串切割】
        //.sort()：按字母排序 → ["a", "e", "t"]
        //.join('')：重新拼成字符串 → "aet"【用空字符串连接】
        if (!map.has(sorted)) {//判断 map 中是否已经有当前 sorted 作为 key
            map.set(sorted, []);//如果没有 就新建一个空数组 准备存放
        }
        map.get(sorted).push(word);//将原始字符串放入对应分组
        //map.get("aet") 就是 ["eat", "tea"]  现在再加上 "ate"
    }
    //返回Map中所有分组
    return Array.from(map.values());//map.values() 返回的是一个迭代器，包含 Map 中所有的值（即每组的数组）
    //map.values() 是所有值（value，即每组单词数组）的迭代器
    //Array.from() 把它转换成真正的数组【将类数组或可迭代对象转换成数组的方法】
}
let strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(strs));//[ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]

console.log(Array.from('Hello'));//[ 'H', 'e', 'l', 'l', 'o' ]
const s = new Set([1,2,3]);
console.log(Array.from(s));//[ 1, 2, 3 ]
const m = new Map([['a',1],['b',2]]);
console.log(Array.from(m));//[ [ 'a', 1 ], [ 'b', 2 ] ]
//Map 本身就是一个可迭代对象，它的默认迭代器就是 .entries()（即键值对）
//Array.from(m) === Array.from(m.entries())
//如果你只想要 Map 的值部分，就必须手动 .values()