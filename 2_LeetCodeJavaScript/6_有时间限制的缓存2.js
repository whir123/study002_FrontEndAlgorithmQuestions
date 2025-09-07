//编写一个类，它允许获取和设置键-值对，并且每个键都有一个过期时间 。
//该类有三个公共方法：
//set(key, value, duration) ：接收参数为整型键 key 、整型值 value 和以毫秒为单位的持续时间 duration 
//                            一旦 duration 到期后，这个键就无法访问
//                            如果相同的未过期键已经存在，该方法将返回 true ，否则返回 false 
//                            如果该键已经存在，则它的值和持续时间都应该被覆盖
//get(key) ：如果存在一个未过期的键，它应该返回这个键相关的值。否则返回 -1 。
//count() ：返回未过期键的总数。

//【方法2：基于过期时间检查】
var TimeLimitedCache = function() {
    this.cache = {};//用来存储键值对和定时器
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
    const currentTime = Date.now();
    const expiredAt = currentTime + duration;
    const exists = this.cache[key]!==undefined && this.cache[key].expiredAt>currentTime;//每次调用了Date.now()获取当前时间
    this.cache[key] = {value, expiredAt};
    return exists;
    // this.cache = {
    // key1: { value: value1, expiredAt: timestamp1 },
    // key2: { value: value2, expiredAt: timestamp2 },
    // };
};

TimeLimitedCache.prototype.get = function(key) {
    const currentTime = Date.now();//记得重新定义一下
    if(this.cache[key]===undefined || this.cache[key].expiredAt<=currentTime){return -1;}
    return this.cache[key].value;
};

TimeLimitedCache.prototype.count = function() {
    const currentTime = Date.now();//记得重新定义一下
    let count = 0;
    for(const key in this.cache){
        if(this.cache[key].expiredAt>currentTime)count++;
    };
    return count;
};