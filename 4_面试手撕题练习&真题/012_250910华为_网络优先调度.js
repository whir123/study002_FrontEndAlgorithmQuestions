/**
 * 提升VIP用户流量优先级 网络拥塞时优先调度
 * 用户唯一身标识：MAC地址 在网络中配置所有VIP用户的MAC地址白名单
 * xx-xx-xx-xx-xx-xx/M
 * MAC地址：48bit 6字节 表示为6个十六进制数（如 00-d8-61-ef-31-3e）
 * 掩码长度：进行MAC地址匹配时关注的bit位数（40:ff-ff-ff-ff-ff-00 最后8bit不关注）
    
    //输入行1: n 需要配置为VIP的MAC地址
    //输入接下来n行: xx-xx-xx-xx-xx-xx/M
    //输入行1: m 待处理的报文MAC地址数
    //输入接下来m行：xx-xx-xx-xx-xx-xx
    
    //输出：m个是否可以优先调度【所有报文都是VIP -> YES】
 */
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let input = '';
process.stdin.on('data', (data) => {
    input += data;
});
process.stdin.on('end', () => {
    let inputArray = input.split('\n');
    // 第一段：VIP 配置
    let n = parseInt(inputArray[0], 10);
    let nArr = inputArray.slice(1, 1 + n);
    // 第二段：待检测 MAC
    let m = parseInt(inputArray[1 + n], 10);
    let mArr = inputArray.slice(2 + n, 2 + n + m);

    doFunc(n, nArr, m, mArr);

    /**
     * 待实现函数，在此函数中填入答题代码
     * doFunc()
     */
    
    function macToBigInt(macStr) {
        // "xx-xx-xx-xx-xx-xx" 转成 BigInt
        //⚠️ 【/-/g 全局匹配- 替换为空】去掉'-'后变成十六进制字符串，转为 BigInt，方便位操作
        return BigInt("0x" + macStr.replace(/-/g, ""));
    }

    function doFunc(n, nArr, m, mArr) {
        // 处理 VIP 配置数组
        let vipConfigs = nArr.map(cfg => {
            let [mac, mStr] = cfg.split("/");
            let M = parseInt(mStr, 10); //⚠️ M:掩码长度
            let macInt = macToBigInt(mac); //⚠️ MAC地址:十六进制字符串转为BigInt 
            // 生成掩码【根据M 用位操作生成掩码】
            let mask = M === 0 ? 0n : ((1n << BigInt(M)) - 1n) << (48n - BigInt(M));
            //⚠️ 1n ：BigInt字面量 代表1 但类型为大整数
            //⚠️ (1n << BigInt(M)) - 1n ：二进制左移 生成高M位的1 再-1 生成M位全是1的二进制掩码
            //⚠️ (48n - BigInt(M)) ：再次左移，把高M位1补到 48位MAC整数的高位
            return { macInt, mask };
        });

        // 处理每一个待检测 MAC
        let allVip = true;
        for (let macStr of mArr) {
            let macIntCur = macToBigInt(macStr); //⚠️ MAC地址:十六进制字符串转为BigInt

            let matched = false;
            for (let { macInt, mask } of vipConfigs) {
                if ((macIntCur & mask) === (macInt & mask)) { //⚠️ &：按位与
                    matched = true;
                    break;
                };
            };

            if (!matched) {
                allVip = false;
                break;
            };
        };

        console.log(allVip ? "YES" : "NO");
    };

    process.exit();
});

//【 输入 】
// 2
// 00-d8-61-ef-31-3e/48
// 40-ff-ff-ff-ff-00/40
// 3
// 00-d8-61-ef-31-3e
// 40-11-22-33-44-55
// 12-34-56-78-9a-bc

//【 输出 】
// NO