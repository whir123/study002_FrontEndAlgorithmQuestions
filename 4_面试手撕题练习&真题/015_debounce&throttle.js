// ⭐️ 防抖和节流
function debounce (fn, delay) {
    let timer = null;
    return function debounced (...args) {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn(...args);
        }, delay)
    };
};
function throttle (fn, delay) {
    let lastT = 0, nowT = null;
    return function throttled (...args) {
        nowT = Date.now();
        if(nowT - lastT >= delay){
            fn(...args);
            lastT = nowT;
        };
    };
};

function add(x,y){console.log(x+y)};
let debouncedAdd = debounce(add, 200);
setTimeout(() => debouncedAdd(1,1), 100);
setTimeout(() => debouncedAdd(2,2), 200);
setTimeout(() => debouncedAdd(3,3), 300); // ✅ 6
setTimeout(() => debouncedAdd(4,4), 600); // ✅ 8

let throttledAdd = throttle(add, 100);
setTimeout(() => throttledAdd(7,7), 800); // ✅ 14
setTimeout(() => throttledAdd(8,8), 850);
setTimeout(() => throttledAdd(9,9), 900); // ✅ 18
setTimeout(() => throttledAdd(10,10), 950);
setTimeout(() => throttledAdd(12,12), 1000); // ✅ 24