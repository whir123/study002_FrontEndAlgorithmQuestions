//编写一个类，它允许获取和设置键-值对，并且每个键都有一个过期时间 。
//该类有三个公共方法：
//set(key, value, duration) ：接收参数为整型键 key 、整型值 value 和以毫秒为单位的持续时间 duration 
//                            一旦 duration 到期后，这个键就无法访问
//                            如果相同的未过期键已经存在，该方法将返回 true ，否则返回 false 
//                            如果该键已经存在，则它的值和持续时间都应该被覆盖
//get(key) ：如果存在一个未过期的键，它应该返回这个键相关的值。否则返回 -1 。
//count() ：返回未过期键的总数。

//【方法1：使用 setTimeout 直接删除键】
var TimeLimitedCache = function() {
    this.cache = {};//用来存储键值对和定时器
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
    let exists = false;
    if(this.cache[key] !== undefined){
        exists = true;//相同的未过期键已经存在 返回true
        clearTimeout(this.cache[key].timer);//清除旧的定时器
    };
    const timer = setTimeout(()=>{delete this.cache[key]},duration)
    this.cache[key] = {value,timer};
    return exists;
};

TimeLimitedCache.prototype.get = function(key) {
    if(this.cache[key]===undefined){return -1;}
    return this.cache[key].value;
};

TimeLimitedCache.prototype.count = function() {
    //return this.cache.length;【错误！！！】
    //this.cache 是一个普通对象（如 {}），用于存储键值对
    //Object.keys(this.cache) 返回一个数组，包含 this.cache 的所有 可枚举属性名（即所有的 key）
    //JavaScript 的普通对象（如 {}）没有 length 属性。
    //只有数组（Array）或类数组对象（如 arguments、NodeList）才有 length 属性。
    //如果想获取对象的键的数量，必须用 Object.keys(obj).length
    return Object.keys(this.cache).length;
};