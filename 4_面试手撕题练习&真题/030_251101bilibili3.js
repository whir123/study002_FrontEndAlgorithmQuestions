/**
 * 拿到一颗二叉树 希望找到一条路径 该路径上所有节点互为祖先和子孙关系
 * 并且路径的所有节点权值尽可能大 返回这个权值之和的最大值
 * ⚠️ （即只能往下走，不能拐弯）
 */

function maxSum(root) {
  let res = -Infinity;

  function dfs(node) {
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);
    // ⚠️ 计算当前节点往下走的最大路径和（自己 / 自己+左 / 自己+右）
    const maxDown = Math.max(node.val, node.val + left, node.val + right);
    // ⚠️ 更新全局最大值
    res = Math.max(res, maxDown);
    return maxDown;
  }
  dfs(root);
  return res;
}

const root1 = { val: 5, left: null, right: null };
console.log(maxSum(root1)); // 输出 5

const root2 = {
  val: 2,
  left: {
    val: 1,
    left: null,
    right: null,
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};
console.log(maxSum(root2)); // 输出 5（2+3）

const root3 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
  right: {
    val: 4,
    left: null,
    right: null,
  },
};
console.log(maxSum(root3)); // 输出 6（1+2+3）
