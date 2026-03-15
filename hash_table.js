class Node {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class HashTable {
    #table;
    #capacity;
    #size;
    #loadFactor;

    constructor(capacity = 16, loadFactor = 0.75) {
        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new Error("Capacity must be positive integer");
        }

        this.#capacity = capacity;
        this.#loadFactor = loadFactor;
        this.#size = 0;

        this.#table = new Array(capacity).fill(null);
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        this.#table = new Array(this.#capacity).fill(null);
        this.#size = 0;
    }

    /* ================= Hashing ================= */

    #hash(key) {
        let hash = 0;

        if (typeof key === "number") {
            hash = key;
        } 
        else if (typeof key === "string") {

            for (let i = 0; i < key.length; i++) {
                hash = hash * 31 + key.charCodeAt(i);
            }

        } 
        else {
            throw new Error("Unsupported key type");
        }

        return Math.abs(hash) % this.#capacity;
    }

    /* ================= Core Operations ================= */

    put(key, value) {

        const index = this.#hash(key);
        let head = this.#table[index];

        let current = head;

        while (current) {
            if (current.key === key) {
                current.value = value;
                return;
            }

            current = current.next;
        }

        const newNode = new Node(key, value, head);

        this.#table[index] = newNode;
        this.#size++;

        if (this.#size / this.#capacity > this.#loadFactor) {
            this.#resize(this.#capacity * 2);
        }
    }

    get(key) {

        const index = this.#hash(key);
        let current = this.#table[index];

        while (current) {
            if (current.key === key) {
                return current.value;
            }

            current = current.next;
        }

        return undefined;
    }

    remove(key) {

        const index = this.#hash(key);

        let current = this.#table[index];
        let prev = null;

        while (current) {

            if (current.key === key) {

                if (prev === null) {
                    this.#table[index] = current.next;
                } else {
                    prev.next = current.next;
                }

                this.#size--;
                return current.value;
            }

            prev = current;
            current = current.next;
        }

        return undefined;
    }

    containsKey(key) {
        return this.get(key) !== undefined;
    }

    containsValue(value) {

        for (let head of this.#table) {

            let current = head;

            while (current) {

                if (current.value === value) {
                    return true;
                }

                current = current.next;
            }
        }

        return false;
    }

    /* ================= Resize / Rehash ================= */

    #resize(newCapacity) {

        const oldTable = this.#table;

        this.#capacity = newCapacity;
        this.#table = new Array(newCapacity).fill(null);
        this.#size = 0;

        for (let head of oldTable) {

            let current = head;

            while (current) {
                this.put(current.key, current.value);
                current = current.next;
            }
        }
    }

    loadFactor() {
        return this.#size / this.#capacity;
    }

    /* ================= Entry Views ================= */

    keys() {

        const result = [];

        for (let head of this.#table) {

            let current = head;

            while (current) {
                result.push(current.key);
                current = current.next;
            }
        }

        return result;
    }

    values() {

        const result = [];

        for (let head of this.#table) {

            let current = head;

            while (current) {
                result.push(current.value);
                current = current.next;
            }
        }

        return result;
    }

    entries() {

        const result = [];

        for (let head of this.#table) {

            let current = head;

            while (current) {
                result.push([current.key, current.value]);
                current = current.next;
            }
        }

        return result;
    }

    /* ================= Iteration ================= */

    *[Symbol.iterator]() {

        for (let head of this.#table) {

            let current = head;

            while (current) {
                yield [current.key, current.value];
                current = current.next;
            }
        }
    }

    /* ================= Utility Operations ================= */

    toObject() {

        const obj = {};

        for (let [k, v] of this) {
            obj[k] = v;
        }

        return obj;
    }

    clone() {

        const newTable = new HashTable(this.#capacity, this.#loadFactor);

        for (let [k, v] of this) {
            newTable.put(k, v);
        }

        return newTable;
    }

    equals(otherTable) {

        if (this.size() !== otherTable.size()) return false;

        for (let [k, v] of this) {

            if (otherTable.get(k) !== v) {
                return false;
            }
        }

        return true;
    }

    /* ================= Debug ================= */

    bucketSizes() {

        const result = [];

        for (let head of this.#table) {

            let count = 0;
            let current = head;

            while (current) {
                count++;
                current = current.next;
            }

            result.push(count);
        }

        return result;
    }

    print() {

        for (let i = 0; i < this.#capacity; i++) {

            let current = this.#table[i];
            let bucket = "";

            while (current) {

                bucket += `[${current.key}:${current.value}] -> `;
                current = current.next;
            }

            console.log(i + ":", bucket + "null");
        }
    }
}