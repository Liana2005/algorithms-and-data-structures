class Stack{
    #stack;
    #size;
    #cap;
    constructor(capacity){
        if(!Number.isInteger(capacity) || capacity <= 0){
            throw new Error("Invalid value");
            
        }
        this.#stack = new Array(capacity)
        this.#size = 0
        this.#cap = capacity
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
    this.#size = 0;
}
push(value){
    if(this.is_full()){
        throw new Error("the stack is full");
        
    }
         
        this.#stack[this.#size] =value;
        this.#size++;
}

pop(){
    if(this.is_empty()){
        throw new Error("stack is empty");
        
    }
    this.#size--;
    const value = this.#stack[this.#size];
     this.#stack[this.#size] = undefined;
     
     return value;
}
peek(){
    if(this.is_empty()){
        throw new Error("stack is empty");
        
    }
    return this.#stack[this.#size-1];
}

}