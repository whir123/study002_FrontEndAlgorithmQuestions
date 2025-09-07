//给你一个字符串s 找到s中最长的回文子串

//遍历字符串 从「每个字符」/「每两个字符中心展开」
function longestPalindrome(s: string): string {
    if(s.length<2)return s;

    let max:number = 1;
    let result:string = s[0]!; // s不为空的时候 至少返回一个

    function expand(i:number,j:number): number {
        let left = i, right = j;
        while(left>=0 && right<s.length && s[left]===s[right]){
            left--;
            right++;
        };
        return right-left+1-2;
    };

    for(let i=0; i<s.length-1; i++){
        let len1 = expand(i,i); // 一个字符
        let len2 = expand(i,i+1); // 两个字符
        let len = Math.max(len1,len2);
        if(len>max){
            max = len;
            let start = i-Math.floor((len-1)/2);
            result = s.slice(start, start+len);
        };
    };
    return result;
};

//【时间复杂度是 O(n^3) 超出时间限制】
function longestPalindrome2(s: string): string {
    let max:number = 0;
    let result:string = "";

    function ifPalindrome(ss:string):boolean {
        let left = 0, right = ss.length-1
        while(left<=right){
            if(ss[left]!==ss[right]) return false;
            left++;
            right--;
        };
        return true;
    };

    for(let i=0; i<s.length; i++){
        let left = i, right = s.length-1;
        while(left<=right){
            if(s[left]===s[right]){
                if(ifPalindrome(s.slice(left,right+1))){
                    let nowMax:number = right-left+1;
                    if(nowMax>max){
                        max = nowMax;
                        result = s.slice(left,right+1);
                    };
                };
            };
            right--;
        };
    };
    return result;
};

console.log(longestPalindrome("babad"));
console.log(longestPalindrome("asssaaadhede"));