/**
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。
 * 你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 * 
 * 输入：head = [1,2,3,4]
 * 输出：[2,1,4,3]
 * 
 * 输入：head = []
 * 输出：[]
 * 
 * 输入：head = [1]
 * 输出：[1]
 */

var ListNode = function(val){
    this.val = val;
    this.next = null; 
};

const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);

var swapPairs = function(head) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    while(prev.next!==null && prev.next.next!==null) {
        let first = prev.next;
        let second = prev.next.next;

        prev.next = second;
        first.next = second.next;
        second.next = first;

        prev = first;
    };
    return dummy.next;
};

console.log(swapPairs(head));