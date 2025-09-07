/**
 * 给你两非空的链表，表示两个非负的整数。
 * 它们每位数字都是按照[逆序]的方式存储的，并且每个节点只能存储[一位]数字。
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
*/
var ListNode = function(val){
    this.val = val;
    this.next = null; 
};

const l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);

const l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

var addTwoNumbers = function(l1, l2) {
    let result = new ListNode(0);
    let cur = result;

    let carry = 0;
    while(l1!==null || l2!==null || carry!==0){
        let val1 = l1===null ? 0 : l1.val;
        let val2 = l2===null ? 0 : l2.val;
        let val = (val1+val2+carry)%10;
        carry = Math.floor((val1+val2+carry)/10);
        cur.next = new ListNode(val);
        cur = cur.next;
        if(l1!==null) l1=l1.next;
        if(l2!==null) l2=l2.next;
    };
    return result.next;
};

console.log(addTwoNumbers(l1,l2));
//输入：l1 = [2,4,3], l2 = [5,6,4]
//输出：[7,0,8]
//解释：342 + 465 = 807.