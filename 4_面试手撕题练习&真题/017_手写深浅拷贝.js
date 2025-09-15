// ⭐️ 浅拷贝
function clone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const copy = Array.isArray(obj) ? [] : {};
    for (const k in obj) {
        // for...in 会遍历对象自身和原型链上的可枚举属性
        if (obj.hasOwnProperty(k)) {
            copy[k] = obj[k];
        };
    };
    return copy;
};

// ⭐️ 一般深拷贝
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const copy = Array.isArray(obj) ? [] : {};
    for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
            copy[k] = deepClone(obj[k]);
        };
    };
    return copy;
};

// ⭐️ 考虑循环引用的深拷贝
function deepClonePlus(obj, map=new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (map.has(obj)) return map.get(obj); // ⚠️ 检查循环引用

    const copy = Array.isArray(obj) ? [] : {};
    map.set(obj, copy); // ⚠️

    for (const k in copy) {
        if(obj.hasOwnProperty(k)) {
            copy[k] = deepClonePlus(obj[k], map); // ⚠️ 递归记得把map传回去
        };
    };
    return copy;
};