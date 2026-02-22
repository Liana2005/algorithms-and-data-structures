class Node{
    #value;
    #next = null;
    constructor(val = 0){
        this.#value = val;
        this.#next = null;
    }
    get value(){
         return this.#value;
    }
    set value(val){
        this.#value = val;

    }

    get next(){
        if(!this.#next){
            return null;
        }
        return this.#next;
    }
    set next(new_node){
              if (new_node instanceof Node || new_node === null) {
            this.#next = new_node;
        } else {
            throw new TypeError("next must be Node or null");
        }
    }

    }


class SinglyLinkedList{
    #head = null;
    #size = 0;
    constructor(iterable){
        if(iterable === undefined){
            return;
        }
             if (typeof iterable[Symbol.iterator] === "function") {
            for (let val of iterable) {
                this.push_back(val);
            }
        } else {
            this.push_back(iterable);
        }
    }
    size(){
        return this.#size;
    }
    isEmpty(){
        return this.#size === 0;
    }
    clear(){
        this.#head = null;
        this.#size = 0;
    }
    front(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.#head.value;
    }
   push_front(val){
    let node = new Node(val);
    node.next = this.#head;
    this.#head = node;
    this.#size++;
   }
   push_back(val){
    const node = new Node(val);
    if(this.isEmpty()){
        this.#head = node;
    } else {
            let curr = this.#head;
            while (curr.next !== null) {
                curr = curr.next;
            }
            curr.next = node;
        }
        this.#size++;

   }
   pop_front(){
    if(this.isEmpty()){
        return undefined
    }
      let removedValue = this.#head.value;
      this.#head = this.#head.next;
     this.#size--;
      return removedValue;
   }
   pop_back(){
    if(this.isEmpty()){
        return undefined;
    }
    
           if (this.#size === 1) {
            const val = this.#head.value;
            this.#head = null;
            this.#size--;
            return val;
        }

        let prev = null;
        let curr = this.#head;

        while (curr.next !== null) {
            prev = curr;
            curr = curr.next;
        }

        prev.next = null;
        this.#size--;

        return curr.value;
    }
    at(index){
        if (index < 0 || index >= this.size) return undefined;

        let curr = this.head;
        for (let i = 0; i < index; i++) {
            curr = curr.next;
        }
        return curr.value;
    }
    insert(index,val){
            if (index < 0 || index > this.size) return;

        if (index === 0) {
            this.head = new Node(val, this.head);
        } else {
            let prev = this.head;
            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }
            prev.next = new Node(val, prev.next);
        }
        this.size++;

    }
    erase(index){
            if (index < 0 || index >= this.size) return;

        if (index === 0) {
            this.head = this.head.next;
        } else {
            let prev = this.head;
            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }
            prev.next = prev.next.next;
        }
        this.size--;

    }
    remove(value,equals){
        let count = 0;
        const eq = equals || ((a, b) => a === b);

        while (this.head && eq(this.head.value, value)) {
            this.head = this.head.next;
            this.size--;
            count++;
        }

        let curr = this.head;
        while (curr && curr.next) {
            if (eq(curr.next.value, value)) {
                curr.next = curr.next.next;
                this.size--;
                count++;
            } else {
                curr = curr.next;
            }
        }
        return count;

    }

    reverse(){
        let current = this.#head;
        let prev = null;
        while(current){
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

     sort(cmp = (a, b) => a - b) {
        const mergeSort = (head) => {
            if (!head || !head.next) return head;

            let slow = head, fast = head.next;
            while (fast && fast.next) {
                slow = slow.next;
                fast = fast.next.next;
            }

            let mid = slow.next;
            slow.next = null;

            return merge(
                mergeSort(head),
                mergeSort(mid)
            );
        };

        const merge = (a, b) => {
            let dummy = new Node(null);
            let tail = dummy;

            while (a && b) {
                if (cmp(a.value, b.value) <= 0) {
                    tail.next = a;
                    a = a.next;
                } else {
                    tail.next = b;
                    b = b.next;
                }
                tail = tail.next;
            }
            tail.next = a || b;
            return dummy.next;
        };

        this.head = mergeSort(this.head);
    }

    merge(list, cmp = (a, b) => a - b) {
        let dummy = new Node(null);
        let tail = dummy;

        let a = this.head;
        let b = list.head;

        while (a && b) {
            if (cmp(a.value, b.value) <= 0) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }
            tail = tail.next;
        }

        tail.next = a || b;

        this.head = dummy.next;
        this.size += list.size;
        list.head = null;
        list.size = 0;
    }

 

    toArray() {
        const arr = [];
        let curr = this.head;
        while (curr) {
            arr.push(curr.value);
            curr = curr.next;
        }
        return arr;
    }

    static fromArray(arr) {
        const list = new LinkedList();
        for (let val of arr) {
            list.insert(list.size, val);
        }
        return list;
    }

    

    *[Symbol.iterator]() {
        let curr = this.head;
        while (curr) {
            yield curr.value;
            curr = curr.next;
        }
    }
}

new Node();
new SinglyLinkedList();