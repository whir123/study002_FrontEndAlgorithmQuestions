/**
 * 将两个升序链表合并为一个新的升序链表并返回。
 * 新链表是通过拼接给定的两个链表的所有节点组成的。 
*/
var ListNode = function(val){
    this.val = val;
    this.next = null; 
};

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(4);
const list2 = new ListNode(1);
list2.next = new ListNode(3);
list2.next.next = new ListNode(4);

var mergeTwoLists = function(list1, list2) {
    let l1 = list1;
    let l2 = list2;
    // 创建哨兵节点 他的next为返回的头部
    let dummy = new ListNode(-1);
    let cur = dummy;
    while (l1!==null && l2!==null) {
        if(l1.val > l2.val) {
            cur.next = l2;
            l2 = l2.next;
        } else {
            cur.next = l1;
            l1 = l1.next;
        };
        cur = cur.next;
    };
    if(l1!==null || l2!==null) {
        cur.next = l1!==null ? l1 : l2;
    };
    return dummy.next;
};

console.log(mergeTwoLists(list1,list2));