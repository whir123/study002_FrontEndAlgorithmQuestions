//配置中心：存储多语言多环境的配置数据（JSON）
//实现一个工具函数 getValue 根据路径读取配置值
//对象属性 a.b.c | 数组索引 items.0/items[0] | 负索引 items[-1] | 混合 a.b[0].c
//空路径返回defaultValue 路径中允许连续点号(a..b===a.b) 空数组访问负索引defaultValue
//任一层访问失败(或null/undefined) 返回defaultValue
//不出现数组索引访问对象/对象属性访问数组的非法路径

function getValue(data, path, defaultValue = undefined) {
    //【 下面config就是测试data 】
    if(path==null || path==="") return defaultValue; // ⚠️ null/undefined/空字符串 提前返回 所以第一个“==”

    // ⚠️【 把 [数字] 或 [-数字] 形式转换成 .数字，例如 items[0] -> items.0 】
    const normalized = String(path).replace(/\[(-?\d+)\]/g, ".$1");
    // \[ 和 \]：字面量中括号
    // (-?\d+)：捕获一个整数，允许可选的负号（-?），后面至少一位数字（\d+）
    // g：全局替换（替换所有匹配项）｜ 替换为 .$1，即把 [...] 变成 .数字（把捕获组内容插回）

    // ⚠️ 【 按 '.' 拆分并去掉空段（处理 a..b 的情况） 】
    const parts = normalized.split(".").filter(Boolean);
    // 先以点号拆分成数组，再用 filter(Boolean) 去掉空字符串
    // 处理 a..b → ["a","","b"] 的情况，最终得到 ["a","b"]）｜ 是一个数组

    let cur = data; // ⚠️ 当前遍历到的数据层
    for(let key of parts){
        if(cur == null) return defaultValue; // ⚠️ null/undefined提前返回 所以“==”

        if(Array.isArray(cur) && /^-?\d+$/.test(key)){ // ⚠️ 检查当前层是数组 ｜ 且 key 看起来像整数索引（可负）
            let idx = parseInt(key, 10);
            if (idx < 0) idx = cur.length + idx; // 负索引
            if (idx < 0 || idx >= cur.length) return defaultValue;
            cur = cur[idx];
        } else { // ⚠️ 按对象属性访问 ｜ 判断属性存在
            if (!(key in cur)) return defaultValue;
            cur = cur[key];
        }
    }

    return cur == null ? defaultValue : cur;
};

//精简配置数据
const config = {
    api: {
        endpoints: { prod: 'https://api.prod.com' },
        timeout: 5000
    },
    features: {
        flags: ['feature_a', 'feature_b', 'feature_c'],
        settings: { 'enbale-cache': true }
    },
    user: [],
};
//【测试】
console.log(getValue(config, "", "DEFAULT"))                                // => "DEFAULT"  （空路径）
console.log(getValue(config, "api.endpoints.prod"))                         // => "https://api.prod.com"
console.log(getValue(config, "features.flags.0"))                           // => "feature_a"
console.log(getValue(config, "features.flags[-1]"))                         // => "feature_c"
console.log(getValue(config, "features..settings.enbale-cache"))            // => true (连续点被过滤)
console.log(getValue(config, "user[-1]", "EMPTY"))                          // => "EMPTY" （空数组，负索引越界）
console.log(getValue(config, "api.unknown", "NF"))                          // => "NF" （不存在）
console.log(getValue(config, "features.flags.10", "NF"))                    // => "NF" （越界）
console.log(getValue(config, "features.settings['enbale-cache']", "NF"))    // => "NF"（不支持这种带引号的写法）