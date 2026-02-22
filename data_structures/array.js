class Array {
    #size;
    #capacity;
    #arr ;
    #GROWTH = 2;
    constructor(cap = 0,fill = 0){
          if(cap < 0){
            throw new Error("invalid value");
        }
         if (typeof fill !== "number") throw new Error("Fill must be a number");
        this.#size =cap;
        this.#capacity = cap;
         this.#arr = new Array(cap);

        for (let i = 0; i < cap; i++) {
            this.#arr[i] = fill;
        }
      
    }
    size(){
        return this.#size;
    }
    capacity(){
        return this.#capacity;
    }
    empty(){
        if(this.#size === 0){
            return true;
        }
        return false;

    }

    reserve(n){
        if(n <= capacity){ return

        }
          this.resize(n);
    }

    shrinkToFit(){
     this.resize(this.#size);

    }

    clear(){
        this.#size = 0;
    }
    at(i){
        if(i < 0 || i >= this.#size){
            throw new Error("invalid value");
            
        }
        return this.#arr[i];
    }
    set(i,value){
        if(i < 0){
            throw new Error("invalid value");
            
        }
        if(typeof value !== "Number"){
            throw new Error("invalid value");
            
        }
        this.#arr[i] = value;
    }
    front(){
        return this.at(0)
    }
    back(){
        return this.at(size - 1);
    }
    toArray(){
          return this.#arr.slice(0, this.#size);

    }
    pushBack(value){
        if(typeof value !== "Number"){
            throw new Error("invalid value");
            
        }
        if(size === capacity){
             const newCap = this.#capacity === 0 ? 1 : this.#capacity * this.#GROWTH;
            this.resize(newCap);
        }
          this.#arr[this.#size] = value;
        this.#size++;
    }
    popBack(){
        if(this.empty){
            throw new Error("this is an empty array");
            
        }
         const val = this.#arr[this.#size - 1];
        this.#size--;
        return val;
    }

    insert(pos,value){
        if(pos < 0 || pos > size){
            throw new Error("error");
            
        }
              if (typeof value !== "number") {
            throw new Error("Value must be a number");
        }

        if (this.#size === this.#capacity) {
            const newCap = this.#capacity === 0 ? 1 : this.#capacity * this.#GROWTH;
            this.resize(newCap);
        }

        for (let i = this.#size; i > pos; i--) {
            this.#arr[i] = this.#arr[i - 1];
        }

        this.#arr[pos] = value;
        this.#size++;
    }
    erase(pos){
        if(pos < 0){
            throw new Error("invalid pos");
            
        }
        for (let i = pos; i < this.#size - 1; i++) {
            this.#arr[i] = this.#arr[i + 1];
        }

        this.#size--;

    }
   resize(n){
    for (let i = pos; i < this.#size - 1; i++) {
            this.#arr[i] = this.#arr[i + 1];
        }

        this.#size--;

   }
  swap(i,j){
    if(i < 0 || j < 0){
        throw new Error("invalid index");
        
    }
    const temp = this.#arr[i];
    this.#arr[i] = this.#arr[j];
    this.#arr[j] = temp;

  }
[Symbol.iterator](){
       let index = 0;
    const self = this;

    return {
        next() {
            if (index < self.#size) {
                return { value: self.#arr[index++], done: false };
            }
            return { done: true };
        }
    };
}
values(){
    return this[Symbol.iterator];
}

keys(){
      let index = 0;
    const size = this.#size;

    return {
        next() {
            if (index < size) {
                return { value: index++, done: false };
            }
            return { done: true };
        }
    }
}

entries(){
        let index = 0;
    const self = this;

    return {
        next() {
            if (index < self.#size) {
                return { value: [index, self.#arr[index++]], done: false };
            }
            return { done: true };
        }
    }
}

forEach(fn){
    for (let i = 0; i < this.#size; i++) {
        fn(this.#arr[i], i, this);
    }

}
map(fn){
    const result = new DynamicArray(0);
    for (let i = 0; i < this.#size; i++) {
        result.pushBack(fn(this.#arr[i], i, this));
    }
    return result;
}
filter(fn){
        const result = new DynamicArray(0);
    for (let i = 0; i < this.#size; i++) {
        if (fn(this.#arr[i], i, this)) {
            result.pushBack(this.#arr[i]);
        }
    }
    return result;
}
reduce(fn,initial){
    if(this.empty() && initial == undifined){
        throw new Error("error");
        
    }
    let acc;
    let start;
    if(initial !== undefined){
        acc = initial;
        start = 0;
    }
    else{
        acc = this.#arr[0];
        start = 1;
    }

    for (let i = start; i < this.#size; i++) {
        acc = fn(acc, this.#arr[i], i, this);
    }
    return acc;
}
some(fn){
      for (let i = 0; i < this.#size; i++) {
        if (fn(this.#arr[i], i, this)) return true;
    }
    return false;
}
every(fn){
   for(let i = 0; i < this.#size; ++i){
    if(!fn(this.#arr[i],i,this)){
        return false;
    }
    return true;
   }
    
}
find(fn){
      for (let i = 0; i < this.#size; i++) {
        if (fn(this.#arr[i], i, this)) return this.#arr[i];
    }
    return undefined;
    
}
findIndex(value){
     for (let i = 0; i < this.#size; i++) {
        if (fn(this.#arr[i], i, this)) return i;
    }
    return -1;
}
includes(value){
  for (let i = 0; i < this.#size; i++) {
        if (this.#arr[i] === value) return true;
    }
    return false;
}

reverse() {
    let l = 0;
    let r = this.#size - 1;

    while (l < r) {
        const tmp = this.#arr[l];
        this.#arr[l] = this.#arr[r];
        this.#arr[r] = tmp;
        l++;
        r--;
    }
}

sort(compareFn = (a, b) => a - b) {
    for (let i = 0; i < this.#size - 1; i++) {
        let swapped = false;

        for (let j = 0; j < this.#size - 1 - i; j++) {
            if (compareFn(this.#arr[j], this.#arr[j + 1]) > 0) {
                const tmp = this.#arr[j];
                this.#arr[j] = this.#arr[j + 1];
                this.#arr[j + 1] = tmp;
                swapped = true;
            }
        }

        
        if (!swapped) break;
    }
}

clone() {
    const copy = new Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
        copy.arr[i] = this.#arr[i];
    }
    return copy;
}

equals(other) {
    if (!(other instanceof DynamicArray)) return false;
    if (this.#size !== other.size()) return false;

    for (let i = 0; i < this.#size; i++) {
        if (this.#arr[i] !== other.at(i)) return false;
    }
    return true;
}


};