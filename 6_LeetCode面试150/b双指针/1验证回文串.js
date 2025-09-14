/**
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，
 * 短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
 * 字母和数字都属于字母数字字符。
 * 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false
 */

var isPalindrome = function(s) {
    const sClear = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    //⚠️ 字符类 [...] 内部（必须写在最前面）^ 表示 取反 / 非

    const n = sClear.length;
    let left = 0, right = n-1;
    while(left<right) {
        if(sClear[left]!==sClear[right]) return false;
        left++;
        right--;
    };
    return true;
};

const s1 = "A man, a plan, a canal: Panama";
const s2 = "race a car";
const s3 = " ";

console.log(isPalindrome(s1));
// true "amanaplanacanalpanama" 是回文串。
console.log(isPalindrome(s2));
// false
console.log(isPalindrome(s3));
// true