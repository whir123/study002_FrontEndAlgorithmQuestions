/**
 * 编写一个函数来查找字符串数组中的最长公共前缀
 * 如果不存在公共前缀，返回空字符串
 */

function longestCommonPrefix(strs: string[]): string {
    if(!strs || strs.length==0) return "";
    if(strs.length===1) return strs[0]!;
    let result:string = "";
    let index:number = 0;
    while(strs[0]![index]){
        let cur:string = strs[0]![index]!;
        for(let i=1; i<strs.length; i++){
            if(cur!==strs[i]![index]){
                return result;
            };
        };
        result = result.concat(cur);
        index++;
    };
    return result;
};

console.log(longestCommonPrefix(["flower","flow","flight"])); //"fl"
console.log(longestCommonPrefix(["aaaa","bbcc"])); //""
console.log(longestCommonPrefix(["apple","apple","apple"])) //"apple"