/**
 * a b c 共有 M 元 各自都为整数
 * 多少种情况组合？
 */

// ⭐️ 插板法：
// ⭐️ M+2个空位 插两个板
function money_list_count_func(money_total) {
    return (money_total + 2) * (money_total + 1) / 2;
};