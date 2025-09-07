//给你一个链表的头节点 head ，判断链表中是否有环。
//如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
//为了表示给定链表中的环，评测系统内部使用【整数pos】 来表示【链表尾】连接到【链表中】的位置（索引从 0 开始）
//注意：pos 不作为参数进行传递。仅仅是为了标识链表的实际情况。
//如果链表中存在环 ，则返回 true 。 否则返回 false

//输入：head = [3,2,0,-4], pos = 1  【如图33】
//输出：true
//解释：链表中有一个环，其尾部连接到第二个节点
var ListNode = function(val){
    this.val = val;
    this.next = null; 
};//【构建一下链表】
const head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = new ListNode(0);
head.next.next.next = head.next;

//思路：如果链表中某个节点的 next 指针指向它之前的某个节点，则链表存在环
//【方法1】【哈希表法】
    //Set 是一种叫做【集合】的数据结构，Map 是一种叫做【字典】的数据结构
    //Map:一组键值对的结构 Map.set(key,val) Map.get(key) Map.has(key) 一个key只能对应一个value，多次对一个key放入value，后面的值会把前面的值冲掉
    //Set:也是一组key的集合，但不存储value Set.add(val) Set.has(val) 
var hasCycle = function(head) {
    if(!head){return false;}
    const visited = new Set();
    let cur = head;
    while(cur){
        if(visited.has(cur)){return true;}
        else{visited.add(cur);}
        cur = cur.next;
    };
    return false;
};
//【方法2】【快慢指针法】
//初始化两个指针 slow 和 fast，都指向 head
//如果 fast 或 fast.next 为 null，说明无环
//如果 slow === fast，说明快慢指针相遇，有环
var hasCycle2 = function(head) {
    if(!head){return false;}
    let slow = head, fast = head;
    while(fast && fast.next){//fast.next可能会是null 导致错误
        slow = slow.next;
        fast = fast.next.next;
        if(slow===fast){return true;}
    };
    return false;
};
console.log(hasCycle(head));
console.log(hasCycle2(head));