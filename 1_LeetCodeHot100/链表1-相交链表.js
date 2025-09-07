//给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。
//如果两个链表不存在相交节点，返回 null 。
//图示两个链表在节点 c1 开始相交：

//【链表】一系列节点（Node） 组成的数据结构，每个节点包含：
    // val：存储的值（可以是数字、字符串等）。
    // next：指向下一个节点的指针（引用）。
    // （如果是双向链表，还会有 prev 指向前一个节点）
//【链表在 JavaScript 中并不是内置的数据类型】如何用 JavaScript 表示链表？
    //（1）定义节点
function ListNode(val){
    this.val = val; // 节点值
    this.next = null; // 指向下一个节点的指针 默认没有下一个节点 默认null
}
    //（2）手动构造链表
    //示例1：  链表A：4 -> 1 -> 8 -> 4 -> 5
    //         链表B：5 -> 6 -> 1 -> 8 -> 4 -> 5 （两链表在值为 8 的节点相交）
const commonNode = new ListNode(8); // 创建公共部分
commonNode.next = new ListNode(4);
commonNode.next.next = new ListNode(5);
// 创建链表A：4 —— 1 —— 公共部分
const headA = new ListNode(4);
headA.next = new ListNode(1);
headA.next.next = commonNode; //指向公共节点8
// 创建链表B：5 —— 6 —— 公共部分
const headB = new ListNode(5);
headB.next = new ListNode(6);
headB.next.next = new ListNode(1);
headB.next.next.next = commonNode;
    //（3）验证链表结构 | 想打印链表 可以写辅助函数
function printList(head){
    let current = head;
    const result = [];
    while(current){
        result.push(current.val);//一定记得 .val!!
        current = current.next;
    };
    //join以指定参数将所有数组成员连接为一个字符串返回
    console.log(result.join("->"));
};
printList(headA); //4->1->8->4->5
printList(headB); //5->6->1->8->4->5

//回顾原题
//双指针找相交节点
var getIntersectionNode = function(headA, headB) {
    let pA = headA, pB = headB;
    while(pA !== pB){
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
        //pA 走：4 → 1 → 8 → 4 → 5 → 跳转到 headB → 5 → 6 → 1 → 8
        //pB 走：5 → 6 → 1 → 8 → 4 → 5 → 跳转到 headA → 4 → 1 → 8
        //!!!【要么在相交节点，要么同时为 null】【不会死循环】
    };
    return pA;
};
console.log(getIntersectionNode(headA, headB));