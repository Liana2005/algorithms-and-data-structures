class Priority_Queue {
    #heap;
    #cmp;
    #size;

    #max_heap = false;
    #min_heap = false;

    constructor(cmp = (a, b) => a - b) {

        if (typeof cmp !== "function") {
            throw new Error("Comparator must be a function");
        }

        this.#cmp = cmp;
        this.#heap = [];
        this.#size = 0;

        // determine heap type
        if (cmp(1, 2) <= 0) {
            this.#min_heap = true;
        } else {
            this.#max_heap = true;
        }
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return this.#size === 0;
    }

    clear() {
        this.#heap = [];
        this.#size = 0;
    }

    comparator() {
        return this.#cmp;
    }

    /* ================= Access Operations ================= */

    peek() {
        if (this.is_empty()) return undefined;
        return this.#heap[0];
    }

    /* ================= Modification Operations ================= */

    add(value) {

        this.#heap.push(value);
        this.#size++;

        let index = this.#size - 1;

        if (this.#min_heap) {
            this.#shift_up_for_min_heap(index);
        } else {
            this.#shift_up_for_max_heap(index);
        }
    }

    pop() {

        if (this.is_empty()) return undefined;

        let root = this.#heap[0];

        this.#swap(0, this.#size - 1);
        this.#heap.pop();
        this.#size--;

        if (!this.is_empty()) {
            if (this.#min_heap) {
                this.#shift_down_for_min_heap(0);
            } else {
                this.#shift_down_for_max_heap(0);
            }
        }

        return root;
    }

    remove(value) {

        let index = this.#indexOf(value);
        if (index === -1) return;

        this.#swap(index, this.#size - 1);
        this.#heap.pop();
        this.#size--;

        if (index < this.#size) {
            if (this.#min_heap) {
                this.#shift_down_for_min_heap(index);
                this.#shift_up_for_min_heap(index);
            } else {
                this.#shift_down_for_max_heap(index);
                this.#shift_up_for_max_heap(index);
            }
        }
    }

    /* ================= Heap Utilities ================= */

    toArray() {
        return [...this.#heap];
    }

    /* ================= Index Helpers ================= */

    #get_parent(index) {
        return Math.floor((index - 1) / 2);
    }

    #get_left_child(index) {
        return 2 * index + 1;
    }

    #get_right_child(index) {
        return 2 * index + 2;
    }

    #swap(i, j) {
        [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
    }

    /* ================= Heap Maintenance ================= */

    #shift_up_for_min_heap(index) {

        while (index > 0) {
            let parent = this.#get_parent(index);

            if (this.#cmp(this.#heap[index], this.#heap[parent]) < 0) {
                this.#swap(index, parent);
                index = parent;
            } else break;
        }
    }

    #shift_up_for_max_heap(index) {

        while (index > 0) {
            let parent = this.#get_parent(index);

            if (this.#cmp(this.#heap[index], this.#heap[parent]) > 0) {
                this.#swap(index, parent);
                index = parent;
            } else break;
        }
    }

    #shift_down_for_min_heap(index) {

        while (true) {

            let left = this.#get_left_child(index);
            let right = this.#get_right_child(index);
            let smallest = index;

            if (left < this.#size &&
                this.#cmp(this.#heap[left], this.#heap[smallest]) < 0) {
                smallest = left;
            }

            if (right < this.#size &&
                this.#cmp(this.#heap[right], this.#heap[smallest]) < 0) {
                smallest = right;
            }

            if (smallest !== index) {
                this.#swap(index, smallest);
                index = smallest;
            } else break;
        }
    }

    #shift_down_for_max_heap(index) {

        while (true) {

            let left = this.#get_left_child(index);
            let right = this.#get_right_child(index);
            let largest = index;

            if (left < this.#size &&
                this.#cmp(this.#heap[left], this.#heap[largest]) > 0) {
                largest = left;
            }

            if (right < this.#size &&
                this.#cmp(this.#heap[right], this.#heap[largest]) > 0) {
                largest = right;
            }

            if (largest !== index) {
                this.#swap(index, largest);
                index = largest;
            } else break;
        }
    }

    /* ================= Search Utility ================= */

    #indexOf(value) {

        for (let i = 0; i < this.#size; i++) {
            if (this.#heap[i] === value) return i;
        }

        return -1;
    }

    /* ================= Advanced Heap Operations ================= */

    heapify(array) {

        this.#heap = [...array];
        this.#size = array.length;

        let start = Math.floor(this.#size / 2) - 1;

        for (let i = start; i >= 0; i--) {

            if (this.#min_heap) {
                this.#shift_down_for_min_heap(i);
            } else {
                this.#shift_down_for_max_heap(i);
            }
        }
    }

    replace(value) {

        if (this.is_empty()) {
            this.add(value);
            return undefined;
        }

        let root = this.#heap[0];
        this.#heap[0] = value;

        if (this.#min_heap) {
            this.#shift_down_for_min_heap(0);
        } else {
            this.#shift_down_for_max_heap(0);
        }

        return root;
    }

    contains(value) {
        return this.#indexOf(value) !== -1;
    }

    /* ================= Iteration ================= */

    *[Symbol.iterator]() {
        for (let v of this.#heap) {
            yield v;
        }
    }

    *values() {
        yield* this.#heap;
    }

    *entries() {
        for (let i = 0; i < this.#heap.length; i++) {
            yield [i, this.#heap[i]];
        }
    }
}