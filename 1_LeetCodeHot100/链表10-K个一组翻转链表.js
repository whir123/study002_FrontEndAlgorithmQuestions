/**
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
 * k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 */
var ListNode = function(val){
    this.val = val;
    this.next = null; 
};

var reverseKGroup = function(head, k) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let start = head;

    // start | end : 头尾
    // prev | next : 头前一个 尾后一个
    while(start){
        let end = prev;
        for(let i=0;i<k;i++){// 循环后 end指向当前组最后一个节点
            end = end.next;
            if(!end) return dummy.next; // 数量不足k 直接返回
        };
        let next = end.next; // 下一组的第一个节点

        end.next = null; //断开当前组
        prev.next = reverse(start); // 调用反转链表
        // [start]->...->end | start<-...<-[end] 
        start.next = next; // 接回去 当前组屁股是start
        prev = start;
        start = next;
    };
    return dummy.next;
};
var reverse = function(head) {
    let prev = null;
    let cur = head;
    while(cur){
        let tem = cur.next; // 临时保存下一个节点
        cur.next = prev;
        prev = cur;
        cur = tem;
    };
    return prev;
}

const head1 = new ListNode(1);
head1.next = new ListNode(2);
head1.next.next = new ListNode(3);
head1.next.next.next = new ListNode(4);
head1.next.next.next.next = new ListNode(5);
const head2 = new ListNode(1);
head2.next = new ListNode(2);
head2.next.next = new ListNode(3);
head2.next.next.next = new ListNode(4);
head2.next.next.next.next = new ListNode(5);

console.log(reverseKGroup(head1,2));
console.log(reverseKGroup(head2,3));