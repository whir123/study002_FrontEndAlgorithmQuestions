/**
 * 你的任务是为一个很受欢迎的银行设计一款程序，以自动化执行所有传入的交易（转账，存款和取款）。
 * 银行共有 n 个账户，编号从 1 到 n 。每个账号的初始余额存储在一个下标从 0 开始的整数数组 balance 中，其中第 (i + 1) 个账户的初始余额是 balance[i] 。
 * 请你执行所有有效的交易。如果满足下面全部条件，则交易有效 ：
 * - 指定的账户数量在 1 和 n 之间，且
 * - 取款或者转账需要的钱的总数 小于或者等于 账户余额。
 * 实现 Bank 类：
 * Bank(long[] balance) 使用下标从 0 开始的整数数组 balance 初始化该对象。
 * boolean transfer(int account1, int account2, long money) 从编号为 account1 的账户向编号为 account2 的账户转帐 money 美元。如果交易成功，返回 true ，否则，返回 false 。
 * boolean deposit(int account, long money) 向编号为 account 的账户存款 money 美元。如果交易成功，返回 true ；否则，返回 false 。
 * boolean withdraw(int account, long money) 从编号为 account 的账户取款 money 美元。如果交易成功，返回 true ；否则，返回 false 。
 */

class Bank {
    constructor(balance){
        this.data = balance;
        this.n = balance.length;
    };

    transfer(ac1, ac2, money){
        if (ac1>this.n || ac2>this.n) return false;
        if (this.data[ac1-1]<money) return false;
        this.data[ac1-1] -= money;
        this.data[ac2-1] += money;
        return true;
    };

    deposit(ac, money){
        if (ac>this.n) return false;
        this.data[ac-1] += money;
        return true;
    };

    withdraw(ac, money){
        if (ac>this.n || this.data[ac-1]<money) return false;
        this.data[ac-1] -= money;
        return true;
    };

    show(){
        console.log(this.data);
    }
};

const b = new Bank([10,100,20,50,30]); b.show();
b.withdraw(3,10); b.show();
b.transfer(5,1,20); b.show();
b.deposit(5,20); b.show();
b.transfer(3,4,15); b.show();
b.withdraw(10,50); b.show();