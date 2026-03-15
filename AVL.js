class Node {
    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVL {

    #root = null;
    #size = 0;

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return this.#size === 0;
    }

    clear() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Core Operations ================= */

    insert(value) {
        if (!this.search(value)) {
            this.#root = this.#insert(this.#root, value);
            this.#size++;
        }
    }

    delete(value) {
        if (this.search(value)) {
            this.#root = this.#delete(this.#root, value);
            this.#size--;
        }
    }

    search(value) {
        return this.#search(this.#root, value);
    }

    /* ================= Height / Min / Max ================= */

    getHeight() {
        return this.#getHeight(this.#root);
    }

    getMin() {
        const node = this.#getMin(this.#root);
        return node ? node.value : null;
    }

    getMax() {
        const node = this.#getMax(this.#root);
        return node ? node.value : null;
    }

    /* ================= Traversals ================= */

    levelOrder() {

        if (!this.#root) return [];

        let queue = [this.#root];
        let res = [];

        while (queue.length) {

            let node = queue.shift();
            res.push(node.value);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return res;
    }

    preorder_rec() {
        let res = [];
        this.#preorder_rec(this.#root, res);
        return res;
    }

    inorder_rec() {
        let res = [];
        this.#inorder_rec(this.#root, res);
        return res;
    }

    postorder_rec() {
        let res = [];
        this.#postorder_rec(this.#root, res);
        return res;
    }

    preorder_itr() {

        if (!this.#root) return [];

        let stack = [this.#root];
        let res = [];

        while (stack.length) {

            let node = stack.pop();
            res.push(node.value);

            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }

        return res;
    }

    inorder_itr() {

        let stack = [];
        let node = this.#root;
        let res = [];

        while (stack.length || node) {

            while (node) {
                stack.push(node);
                node = node.left;
            }

            node = stack.pop();
            res.push(node.value);
            node = node.right;
        }

        return res;
    }

    postorder_itr() {

        if (!this.#root) return [];

        let s1 = [this.#root];
        let s2 = [];
        let res = [];

        while (s1.length) {

            let node = s1.pop();
            s2.push(node);

            if (node.left) s1.push(node.left);
            if (node.right) s1.push(node.right);
        }

        while (s2.length) {
            res.push(s2.pop().value);
        }

        return res;
    }

    /* ================= AVL Insert ================= */

    #insert(node, value) {

        if (!node) return new Node(value);

        if (value < node.value)
            node.left = this.#insert(node.left, value);

        else if (value > node.value)
            node.right = this.#insert(node.right, value);

        node.height = 1 + Math.max(
            this.#getHeight(node.left),
            this.#getHeight(node.right)
        );

        return this.#reBalance(node);
    }

    /* ================= AVL Delete ================= */

    #delete(node, value) {

        if (!node) return null;

        if (value < node.value)
            node.left = this.#delete(node.left, value);

        else if (value > node.value)
            node.right = this.#delete(node.right, value);

        else {

            if (!node.left || !node.right)
                node = node.left || node.right;

            else {

                let successor = this.#getMin(node.right);
                node.value = successor.value;
                node.right = this.#delete(node.right, successor.value);
            }
        }

        if (!node) return node;

        node.height = 1 + Math.max(
            this.#getHeight(node.left),
            this.#getHeight(node.right)
        );

        return this.#reBalance(node);
    }

    /* ================= AVL Balance ================= */

    #reBalance(node) {

        let balance = this.#balanceFactor(node);

        if (balance > 1 && this.#balanceFactor(node.left) >= 0)
            return this.#rotateRight(node);

        if (balance > 1 && this.#balanceFactor(node.left) < 0) {
            node.left = this.#rotateLeft(node.left);
            return this.#rotateRight(node);
        }

        if (balance < -1 && this.#balanceFactor(node.right) <= 0)
            return this.#rotateLeft(node);

        if (balance < -1 && this.#balanceFactor(node.right) > 0) {
            node.right = this.#rotateRight(node.right);
            return this.#rotateLeft(node);
        }

        return node;
    }

    #balanceFactor(node) {
        return this.#getHeight(node.left) - this.#getHeight(node.right);
    }

    #rotateLeft(node) {

        let newRoot = node.right;
        let T2 = newRoot.left;

        newRoot.left = node;
        node.right = T2;

        node.height = 1 + Math.max(
            this.#getHeight(node.left),
            this.#getHeight(node.right)
        );

        newRoot.height = 1 + Math.max(
            this.#getHeight(newRoot.left),
            this.#getHeight(newRoot.right)
        );

        return newRoot;
    }

    #rotateRight(node) {

        let newRoot = node.left;
        let T3 = newRoot.right;

        newRoot.right = node;
        node.left = T3;

        node.height = 1 + Math.max(
            this.#getHeight(node.left),
            this.#getHeight(node.right)
        );

        newRoot.height = 1 + Math.max(
            this.#getHeight(newRoot.left),
            this.#getHeight(newRoot.right)
        );

        return newRoot;
    }

    #getHeight(node) {
        return node ? node.height : 0;
    }

    /* ================= BST Helpers ================= */

    #getMin(node) {
        while (node && node.left)
            node = node.left;
        return node;
    }

    #getMax(node) {
        while (node && node.right)
            node = node.right;
        return node;
    }

    #search(node, value) {

        if (!node) return false;

        if (value === node.value) return true;

        if (value < node.value)
            return this.#search(node.left, value);

        return this.#search(node.right, value);
    }

    /* ================= DFS Helpers ================= */

    #preorder_rec(node, res) {

        if (!node) return;

        res.push(node.value);
        this.#preorder_rec(node.left, res);
        this.#preorder_rec(node.right, res);
    }

    #inorder_rec(node, res) {

        if (!node) return;

        this.#inorder_rec(node.left, res);
        res.push(node.value);
        this.#inorder_rec(node.right, res);
    }

    #postorder_rec(node, res) {

        if (!node) return;

        this.#postorder_rec(node.left, res);
        this.#postorder_rec(node.right, res);
        res.push(node.value);
    }

    /* ================= Utilities ================= */

    isBalanced() {

        const check = (node) => {

            if (!node) return true;

            let bf = Math.abs(this.#balanceFactor(node));

            return bf <= 1 &&
                check(node.left) &&
                check(node.right);
        }

        return check(this.#root);
    }

    validateBST() {

        const check = (node, min, max) => {

            if (!node) return true;

            if (node.value <= min || node.value >= max)
                return false;

            return check(node.left, min, node.value) &&
                check(node.right, node.value, max);
        }

        return check(this.#root, -Infinity, Infinity);
    }

    toArray() {
        return this.inorder_rec();
    }

    clone() {

        const copy = (node) => {

            if (!node) return null;

            let newNode = new Node(node.value);
            newNode.left = copy(node.left);
            newNode.right = copy(node.right);
            newNode.height = node.height;

            return newNode;
        }

        let tree = new AVL();
        tree.#root = copy(this.#root);
        tree.#size = this.#size;

        return tree;
    }

    equals(otherTree) {

        const check = (a, b) => {

            if (!a && !b) return true;
            if (!a || !b) return false;

            return a.value === b.value &&
                check(a.left, b.left) &&
                check(a.right, b.right);
        }

        return check(this.#root, otherTree.#root);
    }

    /* ================= Iterators ================= */

    *values() {

        for (let v of this.inorder_rec())
            yield v;
    }

    *entries() {

        let arr = this.inorder_rec();

        for (let i = 0; i < arr.length; i++)
            yield [i, arr[i]];
    }

    [Symbol.iterator]() {
        return this.values();
    }
}