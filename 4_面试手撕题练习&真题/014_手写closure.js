// ⭐️ 闭包
function outer() {
    let count = 0;
    return function inner (){
        count++;
        console.log(count);
    };
};

let a = outer();
a(); // 1
a(); // 2
a(); // 3