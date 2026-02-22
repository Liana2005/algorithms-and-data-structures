class Deque {
  #arr;
  #front;
  #size;

  constructor(capacity = 8) {
    if (capacity < 2) throw new Error("Capacity must be >= 2");
    this.#arr = new Array(capacity);
    this.#front = 0;
    this.#size = 0;
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  capacity() {
    return this.#arr.length;
  }

  empty() {
    return this.#size === 0;
  }

  full() {
    return this.#size === this.capacity();
  }

  /* ================= Internal Helpers ================= */

  #mod(i) {
    const n = this.capacity();
    return ((i % n) + n) % n;
  }

  #index(i) {
    return this.#mod(this.#front + i);
  }

  #ensureCapacityForOneMore() {
    if (this.#size < this.capacity()) return;

    const newCap = this.capacity() * 2;
    const newArr = new Array(newCap);

    for (let i = 0; i < this.#size; i++) {
      newArr[i] = this.#arr[this.#index(i)];
    }

    this.#arr = newArr;
    this.#front = 0;
  }

  /* ================= Element Access ================= */

  front() {
    if (this.empty()) throw new Error("Deque is empty");
    return this.#arr[this.#front];
  }

  back() {
    if (this.empty()) throw new Error("Deque is empty");
    return this.#arr[this.#index(this.#size - 1)];
  }

  at(i) {
    if (i < 0 || i >= this.#size) throw new Error("Index out of bounds");
    return this.#arr[this.#index(i)];
  }

  /* ================= Modifiers ================= */

  push_back(value) {
    this.#ensureCapacityForOneMore();
    this.#arr[this.#index(this.#size)] = value;
    this.#size++;
  }

  push_front(value) {
    this.#ensureCapacityForOneMore();
    this.#front = this.#mod(this.#front - 1);
    this.#arr[this.#front] = value;
    this.#size++;
  }

  pop_front() {
    if (this.empty()) throw new Error("Deque is empty");
    const value = this.#arr[this.#front];
    this.#front = this.#mod(this.#front + 1);
    this.#size--;
    return value;
  }

  pop_back() {
    if (this.empty()) throw new Error("Deque is empty");
    const idx = this.#index(this.#size - 1);
    const value = this.#arr[idx];
    this.#size--;
    return value;
  }

  clear() {
    this.#front = 0;
    this.#size = 0;
  }

  /* ================= Extended Professional Methods ================= */

  reserve(newCapacity) {
    if (newCapacity <= this.capacity()) return;

    const newArr = new Array(newCapacity);
    for (let i = 0; i < this.#size; i++) {
      newArr[i] = this.#arr[this.#index(i)];
    }

    this.#arr = newArr;
    this.#front = 0;
  }

  shrinkToFit() {
    const newArr = new Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
      newArr[i] = this.#arr[this.#index(i)];
    }

    this.#arr = newArr;
    this.#front = 0;
  }

  rotateLeft(k = 1) {
    if (this.#size === 0) return;
    k %= this.#size;
    this.#front = this.#index(k);
  }

  rotateRight(k = 1) {
    if (this.#size === 0) return;
    k %= this.#size;
    this.#front = this.#mod(this.#front - k);
  }

  swap(i, j) {
    if (i < 0 || j < 0 || i >= this.#size || j >= this.#size) {
      throw new Error("Index out of bounds");
    }
    const a = this.#index(i);
    const b = this.#index(j);
    [this.#arr[a], this.#arr[b]] = [this.#arr[b], this.#arr[a]];
  }

  /* ================= Search & Utilities ================= */

  find(value) {
    for (let i = 0; i < this.#size; i++) {
      if (this.at(i) === value) return i;
    }
    return -1;
  }

  includes(value) {
    return this.find(value) !== -1;
  }

  toArray() {
    const res = new Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
      res[i] = this.at(i);
    }
    return res;
  }

  clone() {
    const d = new Deque(this.capacity());
    for (let i = 0; i < this.#size; i++) {
      d.push_back(this.at(i));
    }
    return d;
  }

  equals(other) {
    if (!(other instanceof Deque)) return false;
    if (this.#size !== other.size()) return false;
    for (let i = 0; i < this.#size; i++) {
      if (this.at(i) !== other.at(i)) return false;
    }
    return true;
  }

  /* ================= Iteration ================= */

  *[Symbol.iterator]() {
    for (let i = 0; i < this.#size; i++) {
      yield this.at(i);
    }
  }

  values() {
    return this[Symbol.iterator]();
  }

  *keys() {
    for (let i = 0; i < this.#size; i++) yield i;
  }

  *entries() {
    for (let i = 0; i < this.#size; i++) {
      yield [i, this.at(i)];
    }
  }

  /* ================= Functional Style ================= */

  forEach(fn) {
    for (let i = 0; i < this.#size; i++) {
      fn(this.at(i), i, this);
    }
  }

  map(fn) {
    const d = new Deque(this.#size || 2);
    for (let i = 0; i < this.#size; i++) {
      d.push_back(fn(this.at(i), i, this));
    }
    return d;
  }

  filter(fn) {
    const d = new Deque();
    for (let i = 0; i < this.#size; i++) {
      const v = this.at(i);
      if (fn(v, i, this)) d.push_back(v);
    }
    return d;
  }

  reduce(fn, initial) {
    if (this.#size === 0 && arguments.length < 2) {
      throw new Error("Reduce of empty deque with no initial value");
    }

    let acc, start;
    if (arguments.length >= 2) {
      acc = initial;
      start = 0;
    } else {
      acc = this.at(0);
      start = 1;
    }

    for (let i = start; i < this.#size; i++) {
      acc = fn(acc, this.at(i), i, this);
    }
    return acc;
  }
}
