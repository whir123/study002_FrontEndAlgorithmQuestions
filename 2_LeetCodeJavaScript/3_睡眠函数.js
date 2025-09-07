//编写一个异步函数，它接收一个正整数参数 millis ，并休眠 millis 毫秒。要求此函数可以解析任何值
//请注意，实际睡眠持续时间与 millis 之间的微小偏差是可以接受的
async function sleep(millis) {
    const prom = new Promise(resolved => 
        {setTimeout(resolved, millis);}
    );
    return prom;
}

sleep(1000).then(()=>{console.log('等了1000ms')})