/**
 * 【动态模式匹配】
 * 给定一个字符串s 一个模式串p
 * 模式串可能包含动态部分：由一对括号表示 内用逗号分割多个选项：
 * 模式串"a(b,c)d"可以匹配"abd"或"acd"
 * 模式串"a(b,c(d,e))f"可以匹配"abf" "acdf"或"acef"
 * 动态部分可以嵌套 保证括号正确匹配 判断字符串s是否能匹配模式串p
 */
function match(i, j) {
    if (i === s.length && j === p.length) return true;
    if (j === p.length) return false;

    if (p[j] === '(') {
        let cnt = 0;
        let k = j;
        for (; k < p.length; k++) {
            if (p[k] === '(') cnt++;
            else if (p[k] === ')') cnt--;
            if (cnt === 0) break;
        };
        const inside = p.slice(j + 1, k);
        const options = splitOptions(inside);
        for (const opt of options) {
            if (tryMatch(i, opt, 0, k + 1)) return true;
        };
        return false;
    };
    if (i < s.length && p[j] === s[i]) {
        return match(i + 1, j + 1);
    };
    return false;
};

function splitOptions(str) {
    let res = [];
    let cur = '';
    let cnt = 0;
    for (let ch of str) {
        if (ch === ',' && cnt === 0) {
            res.push(cur);
            cur = '';
        } else {
            if (ch === '(') cnt++;
            else if (ch === ')') cnt--;
            cur += ch;
        };
    };
    if (cur) res.push(cur);
    return res;
};

function tryMatch(i, sub, subIndex, nextJ) {
    // 将 s[i:] 与 sub 拼接到 p[nextJ:] 继续匹配
    let t = i, u = 0;
    while (u < sub.length && t < s.length) {
        if (sub[u] === '(') {
            let cnt = 0;
            let k = u;
            for (; k < sub.length; k++) {
                if (sub[k] === '(') cnt++;
                else if (sub[k] === ')') cnt--;
                if (cnt === 0) break;
            };
            const inside = sub.slice(u + 1, k);
            const opts = splitOptions(inside);
            for (const opt of opts) {
                if (tryMatch(t, opt + sub.slice(k + 1), 0, nextJ)) return true;
            };
            return false;
        } else {
            if (s[t] !== sub[u]) return false;
            t++; u++;
        };
    };
    return match(t, nextJ);
};

// ⭐️ 测试：
// 需先定义全局变量s, p，并调用match(0, 0)
function test(s1, p1, expected) {
    s = s1; p = p1;
    console.log(`s="${s1}", p="${p1}" => ${match(0,0)} (期望:${expected})`);
};
test("abd", "a(b,c)d", true);
test("acd", "a(b,c)d", true);
test("abf", "a(b,c)d", false);
test("abf", "a(b,c)f", true);
test("abf", "a(b,c(d,e))f", true);
test("acdf", "a(b,c(d,e))f", true);
test("acef", "a(b,c(d,e))f", true);
test("acf", "a(b,c(d,e))f", false);
test("a", "a", true);
test("a", "b", false);
test("", "", true);
test("a", "", false);
test("", "a", false);
