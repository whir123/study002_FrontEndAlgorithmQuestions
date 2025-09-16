/**
 * 给你一个整数数组 nums 。请你对数组执行下述操作：
 * 1 从 nums 中找出任意两个相邻的非互质数。
 * 2 如果不存在这样的数，终止这一过程。
 * 3 否则，删除这两个数，并替换为它们的最小公倍数（Least Common Multiple，LCM）。
 * 4 只要还能找出两个相邻的非互质数就继续重复这一过程。
 * 返回修改后得到的最终数组。可以证明的是，以任意顺序替换相邻的非互质数都可以得到相同的结果。
 * 生成的测试用例可以保证最终数组中的值小于或者等于 108 。
 * 两个数字 x 和 y 满足 非互质数 的条件是：GCD(x, y) > 1
 * 其中 GCD(x, y) 是 x 和 y 的 最大公约数 。
 */

var replaceNonCoprimes = function(nums) {
    function gcd(a,b){ // 返回最大公约数
        while(b!==0){
            [a,b] = [b,a%b];
        };
        return a;
    };
    function lcm(a,b){
        return a*b/gcd(a,b);
    };

    const stack = [];
    for (let num of nums) {
        // 栈：从数组尾进出 ｜ 如果数组有东西 且【上一个进去的】和【当前num】不互质：
        while (stack.length && gcd(stack[stack.length-1], num)>1) {
            num = lcm(stack.pop(), num);
        };
        stack.push(num);
    };
    return stack;
};

const nums1 = [6,4,3,2,7,6,2];
console.log(replaceNonCoprimes(nums1));
// 输出：[12,7,6]
// 解释：
// - (6, 4) 是一组非互质数，且 LCM(6, 4) = 12 。得到 nums = [12,3,2,7,6,2] 。
// - (12, 3) 是一组非互质数，且 LCM(12, 3) = 12 。得到 nums = [12,2,7,6,2] 。
// - (12, 2) 是一组非互质数，且 LCM(12, 2) = 12 。得到 nums = [12,7,6,2] 。
// - (6, 2) 是一组非互质数，且 LCM(6, 2) = 6 。得到 nums = [12,7,6] 。
// 现在，nums 中不存在相邻的非互质数。
// 因此，修改后得到的最终数组是 [12,7,6] 。
// 注意，存在其他方法可以获得相同的最终数组。

const nums2 = [2,2,1,1,3,3,3];
console.log(replaceNonCoprimes(nums2));
// 输出：[2,1,1,3]
// 解释：
// - (3, 3) 是一组非互质数，且 LCM(3, 3) = 3 。得到 nums = [2,2,1,1,3,3] 。
// - (3, 3) 是一组非互质数，且 LCM(3, 3) = 3 。得到 nums = [2,2,1,1,3] 。
// - (2, 2) 是一组非互质数，且 LCM(2, 2) = 2 。得到 nums = [2,1,1,3] 。
// 现在，nums 中不存在相邻的非互质数。 
// 因此，修改后得到的最终数组是 [2,1,1,3] 。 
// 注意，存在其他方法可以获得相同的最终数组。