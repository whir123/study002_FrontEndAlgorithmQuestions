/**
 * 按所给的时间格式输出指定的时间,格式说明: 
 * 对于 2014.09.05 13:14:20
 * yyyy: 年份，2014
 * yy: 年份，14
 * MM: 月份，补满两位，09
 * M: 月份, 9
 * dd: 日期，补满两位，05
 * d: 日期, 5
 * HH: 24制小时，补满两位，13
 * H: 24制小时，13
 * hh: 12制小时，补满两位，01
 * h: 12制小时，1
 * mm: 分钟，补满两位，14
 * m: 分钟，14
 * ss: 秒，补满两位，20
 * s: 秒，20
 * w: 星期，为 ['日', '一', '二', '三', '四', '五', '六'] 中的某一个，本 demo 结果为 五
*/
function formatDate(dateObject, format) {
    function lessThan10ZeroPadding(num){
        if(num < 10) { return "0" + num.toString() };
        return num.toString();
    };
    let dictionary = {
        yyyy: dateObject.getFullYear().toString(),
        yy: dateObject.getFullYear().toString().slice(2),
        MM: lessThan10ZeroPadding(dateObject.getMonth() + 1),
        M: (dateObject.getMonth() + 1).toString(),
        dd: lessThan10ZeroPadding(dateObject.getDate()),
        d: dateObject.getDate().toString(),
        HH: lessThan10ZeroPadding(dateObject.getHours()),
        H: dateObject.getHours().toString(),
        hh: lessThan10ZeroPadding(dateObject.getHours() % 12),
        h: dateObject.getHours() % 12,
        mm: lessThan10ZeroPadding(dateObject.getMinutes()),
        m: dateObject.getMinutes().toString(),
        ss: lessThan10ZeroPadding(dateObject.getSeconds()),
        s: dateObject.getSeconds().toString(),
        w: (function(){
            let day = dateObject.getDay();
            week = {0:"日", 1:"一", 2:"二", 3:"三", 4:"四", 5:"五", 6:"六"};
            return week[day];
        }())
    };

    for(let key of Object.keys(dictionary)){
        format = format.replace(key, dictionary[key]);
    }

    return format;
};

let s = formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w');
console.log('✅',s);
// 2014-09-05 13:14:20 星期五

// ⭐️ date对象回顾
const d = new Date();
console.log(d); // 直接输出 Date 对象时，控制台会调用其 toString() 方法，输出本地时间字符串
console.log(d.toString());
// ⬆️ 浏览器环境：上面两个一致：Mon Oct 06 2025 16:36:02 GMT+0800 (中国标准时间)
// 第一个在终端：但如果直接输出 Date 对象到 REPL（交互式命令行），会显示 ISO 字符串（toISOString()）

console.log(d.toLocaleString());
// 返回本地化的日期和时间字符串，格式随操作系统和浏览器语言设置变化。
// 2025/10/6 16:37:09

console.log(d.valueOf());
console.log(d.getTime());
// ⬆️ 返回自 1970-01-01 00:00:00 UTC 到当前时间的毫秒数（时间戳）

//❗️Date.now() 是 JavaScript 获取当前时间戳（毫秒数）的最简便方法之一。
const ts = Date.now();
console.log(ts); // 例如：1765029999567 （类型：Number）
// 无需创建 Date 实例，适合性能统计、存储、比较等场景，代码简洁高效。

console.log(new Date(-1409894060000)); // 负数是可以的