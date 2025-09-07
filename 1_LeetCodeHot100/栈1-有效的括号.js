/*
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
有效字符串需满足：
    左括号必须用相同类型的右括号闭合。 
    左括号必须以正确的顺序闭合。
    每个右括号都有一个对应的相同类型的左括号。
*/

var isValid = function(s) {
    const stack = [];
    const map = {
        '(':')',
        '[':']',
        '{':'}'
    };
    for(let char of s){
        if(map[char]){
            //如果是左括号，压入栈
            stack.push(char);
        } else {
            //如果是右括号，检查是否匹配
            if(stack.length===0 || map[stack.pop()]!==char)return false;
        }
    };
    //最后检查栈是否为空
    return stack.length===0;
};

const s1 = "()", s2 = "(){}[]", s3 = "";
console.log(isValid(s1));
console.log(isValid(s2));
console.log(isValid(s3));