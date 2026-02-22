class Queue{
    #queue;
    #front;
    #back;
    #size;
    #cap;
    constructor(capacity){
        if(!Number.isInteger(capacity) || capacity <= 0){
            throw new Error("Invalid value");
            
        }
        this.#queue = new Array(capacity);
        this.#front = 0;
        this.#back = -1;
        this.#size = 0;
        this.#cap = capacity;
    }
    size(){
    return this.#size;
}
capacity(){
    return this.#cap;
}
is_empty(){
    return this.#size === 0;
}
is_full(){
    return this.#size === this.#cap;
}
clear(){
    this.#front = 0;
    this.#back = -1;
    this.#size = 0;
}
 enqueue(value) {
        if (this.is_full()) {
            throw new Error("Queue overflow");
        }

      
        this.#back = (this.#back + 1) % this.#cap;
        this.#queue[this.#back] = value;
        this.#size++;
    }

    dequeue() {
        if (this.is_empty()) {
            throw new Error("Queue underflow");
        }

        const value = this.#queue[this.#front];
        this.#queue[this.#front] = undefined; 
        this.#front = (this.#front + 1) % this.#cap;
        this.#size--;
        return value;
    }
peek(){
    if(this.is_empty()){
        return null;
    }
    return this.#queue[this.#front];
}
back(){
    if(this.is_empty()){
        throw new Error("the queue is empty");
        
    }
    return this.#queue[this.#back];
}
    print(){   let result = [];
        for (let i = 0; i < this.#size; i++) {
            result.push(this.#queue[(this.#front + i) % this.#cap]);
        }
        console.log(result.join(" <- "));
    }


}