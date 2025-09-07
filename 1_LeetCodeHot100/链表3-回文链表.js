//给你一个单链表的头节点 head ，请你判断该链表是否为【回文链表】
//如果是，返回 true ；否则，返回 false

//【创建链表函数】
var ListNode = function(val){
    this.val = val;
    this.next = this.next; 
};
var buildList = function(arr){
    const head = new ListNode(arr[0]);
    let cur = head;
    for(i=1;i<arr.length;i++){
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    };
    return head;
}
//【打印链表】
var printList = function(head){
    let cur = head;
    let result = [];
    while(cur){
        result.push(cur.val);
        cur = cur.next;
    };
    console.log(result.join("——>"));
}

//【判断回文链表】
var isPalindrome = function(head) {
    if(!head || !head.next){return true;}
    let cur = head;
    head.prev = null;
    while(cur.next){
        cur.next.prev = cur;
        cur = cur.next; 
    };
    let left=head, right=cur;
    while(left.next && right.prev){
        if(left.val !== right.val){return false;}
        left = left.next;
        right = right.prev;
    };
    return true;
};

const head1 = buildList([1,2,2,1]);
printList(head1);
const head2 = buildList([1,2]);
printList(head2);
console.log(isPalindrome(head1));
console.log(isPalindrome(head2));
