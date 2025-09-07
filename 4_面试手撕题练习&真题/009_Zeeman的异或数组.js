/**
 * Zeeman 有一个长度为 n 的数组 a1,a2,…,an。他想构造一个长度为 n 的数组 b1,b2,…,bn，满足：
 * 对于全部的下标 1 <= i,j <= n，有 ai⊕bi=aj⊕bj 成立 其中，⊕表示按位异或运算
 * 请你求出满足条件的 [字典序] 最小的数组 b1,b2,…,bn。
 * 字典序：从两个数组的第一个元素开始逐个比较，直到找到第一个不同的元素，较大元素所在的数组的字典序较大。
 * 如果比较到其中一个数组的结尾时依旧全部相同，则较短的数组字典序更小。(ai bi 都是非负的)
 */

function outputB (a){
	const n = a.length;
	const maxA = Math.max(...a); // ⚠️ 最大数对应的二进制位数
	const bit = Math.floor(Math.log2(maxA))+1; // Math.log2返回以2为底的对数
	const maxC = 1 << bit;

	let res = Array(n).fill(Infinity);
	for(let c=0; c<maxC; c++){
		let b = a.map(x => x ^ c); // ⚠️ a ^ b = 常数 故常数 ^ a = b

		// ⚠️ 字典序比较
		for(let k=0; k<n; k++){
			if(b[k]>res[k]){
				break;
			} else if(b[k]<res[k]){
				res = [...b];
				break;
			};
		};
	}
	return res;
};

console.log(outputB([1,1,4,5,1,4]));