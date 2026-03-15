const color = { Red: 1, Black: 0 };

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = color.Red;
    }
}

class RBTree {
    #root;
    #nil;

    constructor() {
        this.#nil = new TreeNode(null);
        this.#nil.color = color.Black;

        this.#nil.left = this.#nil;
        this.#nil.right = this.#nil;

        this.#root = this.#nil;
    }

    insert(data) {
        let newNode = new TreeNode(data);

        let parentNode = this.#nil;
        let curr = this.#root;

        while (curr !== this.#nil) {
            parentNode = curr;

            if (data < curr.data) {
                curr = curr.left;
            } else if (data > curr.data) {
                curr = curr.right;
            } else {
                return;
            }
        }

        newNode.parent = parentNode;

        if (parentNode === this.#nil) {
            this.#root = newNode;
        } else if (data < parentNode.data) {
            parentNode.left = newNode;
        } else {
            parentNode.right = newNode;
        }

        newNode.left = this.#nil;
        newNode.right = this.#nil;
        newNode.color = color.Red;

        this.#insertFixUp(newNode);
    }

    #insertFixUp(z) {

        while (z.parent.color === color.Red) {

            if (z.parent === z.parent.parent.left) {

                let uncle = z.parent.parent.right;

                if (uncle.color === color.Red) {

                    z.parent.color = color.Black;
                    uncle.color = color.Black;
                    z.parent.parent.color = color.Red;
                    z = z.parent.parent;

                } else {

                    if (z === z.parent.right) {
                        z = z.parent;
                        this.#left_rotate(z);
                    }

                    z.parent.color = color.Black;
                    z.parent.parent.color = color.Red;
                    this.#right_rotate(z.parent.parent);
                }

            } else {

                let uncle = z.parent.parent.left;

                if (uncle.color === color.Red) {

                    z.parent.color = color.Black;
                    uncle.color = color.Black;
                    z.parent.parent.color = color.Red;
                    z = z.parent.parent;

                } else {

                    if (z === z.parent.left) {
                        z = z.parent;
                        this.#right_rotate(z);
                    }

                    z.parent.color = color.Black;
                    z.parent.parent.color = color.Red;
                    this.#left_rotate(z.parent.parent);
                }
            }
        }

        this.#root.color = color.Black;
    }

    #left_rotate(x) {

        let y = x.right;

        x.right = y.left;

        if (y.left !== this.#nil) {
            y.left.parent = x;
        }

        y.parent = x.parent;

        if (x.parent === this.#nil) {
            this.#root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    #right_rotate(y) {

        let x = y.left;

        y.left = x.right;

        if (x.right !== this.#nil) {
            x.right.parent = y;
        }

        x.parent = y.parent;

        if (y.parent === this.#nil) {
            this.#root = x;
        } else if (y === y.parent.right) {
            y.parent.right = x;
        } else {
            y.parent.left = x;
        }

        x.right = y;
        y.parent = x;
    }

    getMinimum(node = this.#root) {

        while (node.left !== this.#nil) {
            node = node.left;
        }

        return node.data;
    }

    search(key){
    let curr = this.#root;

    while(curr !== this.#nil){

        if(key === curr.data){
            return curr;
        }

        if(key < curr.data){
            curr = curr.left;
        }else{
            curr = curr.right;
        }

    }

    return null;
}
delete(z){

    let y = z;
    let yOriginalColor = y.color;
    let x;

    if(z.left === this.#nil){

        x = z.right;
        this.#transplant(z, z.right);

    }
    else if(z.right === this.#nil){

        x = z.left;
        this.#transplant(z, z.left);

    }
    else{

        y = this.getMinimum(z.right);
        yOriginalColor = y.color;
        x = y.right;

        if(y.parent === z){
            x.parent = y;
        }
        else{
            this.#transplant(y, y.right);
            y.right = z.right;
            y.right.parent = y;
        }

        this.#transplant(z, y);
        y.left = z.left;
        y.left.parent = y;
        y.color = z.color;
    }

    if(yOriginalColor === color.Black){
        this.#deleteFixUp(x);
    }
}
#transplant(u,v){

    if(u.parent === this.#nil){
        this.#root = v;
    }
    else if(u === u.parent.left){
        u.parent.left = v;
    }
    else{
        u.parent.right = v;
    }

    v.parent = u.parent;
}
#deleteFixUp(x){

    while(x !== this.#root && x.color === color.Black){

        if(x === x.parent.left){

            let w = x.parent.right;

            // Case 1
            if(w.color === color.Red){
                w.color = color.Black;
                x.parent.color = color.Red;
                this.#left_rotate(x.parent);
                w = x.parent.right;
            }

            // Case 2
            if(w.left.color === color.Black && w.right.color === color.Black){
                w.color = color.Red;
                x = x.parent;
            }
            else{

                // Case 3
                if(w.right.color === color.Black){
                    w.left.color = color.Black;
                    w.color = color.Red;
                    this.#right_rotate(w);
                    w = x.parent.right;
                }

                // Case 4
                w.color = x.parent.color;
                x.parent.color = color.Black;
                w.right.color = color.Black;
                this.#left_rotate(x.parent);
                x = this.#root;
            }

        }
        else{

            let w = x.parent.left;

            // Case 1
            if(w.color === color.Red){
                w.color = color.Black;
                x.parent.color = color.Red;
                this.#right_rotate(x.parent);
                w = x.parent.left;
            }

            // Case 2
            if(w.right.color === color.Black && w.left.color === color.Black){
                w.color = color.Red;
                x = x.parent;
            }
            else{

                // Case 3
                if(w.left.color === color.Black){
                    w.right.color = color.Black;
                    w.color = color.Red;
                    this.#left_rotate(w);
                    w = x.parent.left;
                }

                // Case 4
                w.color = x.parent.color;
                x.parent.color = color.Black;
                w.left.color = color.Black;
                this.#right_rotate(x.parent);
                x = this.#root;
            }

        }
    }

    x.color = color.Black;
}
}