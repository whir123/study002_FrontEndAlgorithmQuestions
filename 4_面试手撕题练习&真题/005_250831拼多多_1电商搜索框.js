//电商搜索框：
//输入第一个字符时 立即输出固定推荐匹配热词“猜你想搜：xxx，yyy”（不区分大小写 无匹配不输出）
//继续输入时 需等待停止输入500ms再调用搜索接口
//删除所有内容时 立即取消搜索 并在控制台输出“重新搜索”

//已提供搜索接口
async function searchGoods(keyword){
    await new Promise(r => setTimeout(r, 300)); // ⚠️ 模拟网络请求延时 300ms
    return [`${keyword}_商品1`, `${keyword}_商品2`];
}
//固定热词推荐
const hotKeys = ['iPhone', 'iPad', '华为', '小米'];

//创建搜索处理器
function createSearchManager() {
    let timer = null;
    return function(keyword){
        //【 输入第一个字符 】
        if(keyword.length===1){
            let lowerKey = keyword.toLowerCase();
            let matched = hotKeys.filter(h => h.toLowerCase().startsWith(lowerKey));
            if(matched.length>0){console.log(`猜你想搜：`, matched.join(","));}
        };

        //【 输入后续的字符 】
        if(keyword.length>1){
            if(timer) clearTimeout(timer);
            timer = setTimeout(async ()=>{ // ⚠️ 既是赋值，也是调用
                const res = await searchGoods(keyword);
                console.log(`搜索结果：`, res);
            }, 500);
        };
        
        //【 删除所有内容 】
        if(!keyword){
            if(timer) clearTimeout(timer); // ⚠️ 必须清除未执行的定时器
            console.log("重新搜索");
            return; // ⚠️ 此时直接结束函数
        }
    }
}
const searchManager = createSearchManager();

//【测试】
// 输入一个字符 → 立即推荐
searchManager("i");  

// 输入多个字符 → 等待500ms触发搜索
setTimeout(() => searchManager("ip"), 600); //❗️开启一个 500ms 的定时器（计划在 t=1100ms 执行接口调用）

// 输入后立刻删除 → 不会触发搜索
setTimeout(() => {
    searchManager("ipad"); //❗️先调用 searchManager("ipad")（开启一个定时器，计划在 t=1700ms 执行调用接口）
    searchManager("");  //❗️紧接着 searchManager("")（清除上面这个定时器，输出 "重新搜索"）
}, 1200);//❗️❗️❗️现在是1200ms 上面的1700的已被清除 但1100的已经调用接口了 在1400ms输出

// 连续输入 → 只触发最后一次搜索
setTimeout(() => searchManager("hua"), 2000);
setTimeout(() => searchManager("huawe"), 2200);
setTimeout(() => searchManager("华为"), 2400); // 只有这个会被搜索
