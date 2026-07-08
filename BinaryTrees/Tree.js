import Node from './Node.js';

export default class Tree {
  constructor(array = []) {
    this.root = this.#buildTree(array);
  }

  /* ---------------- Building the tree ---------------- */

  // Sorts, removes duplicates, then hands off to the actual recursive builder.
  #buildTree(array) {
    const sortedUnique = [...new Set(array)].sort((a, b) => a - b);
    return this.#buildBalanced(sortedUnique, 0, sortedUnique.length - 1);
  }

  // Classic "pick the middle element as root, recurse on each half" approach -
  // this is what actually guarantees the tree comes out balanced.
  #buildBalanced(sortedArray, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(sortedArray[mid]);
    node.left = this.#buildBalanced(sortedArray, start, mid - 1);
    node.right = this.#buildBalanced(sortedArray, mid + 1, end);
    return node;
  }

  /* ---------------- includes / insert / delete ---------------- */

  includes(value, node = this.root) {
    if (node === null) return false;
    if (value === node.data) return true;
    return value < node.data ? this.includes(value, node.left) : this.includes(value, node.right);
  }

  insert(value) {
    this.root = this.#insertNode(this.root, value);
  }

  #insertNode(node, value) {
    if (node === null) return new Node(value);
    if (value === node.data) return node; // duplicate - do nothing, per the assignment

    if (value < node.data) {
      node.left = this.#insertNode(node.left, value);
    } else {
      node.right = this.#insertNode(node.right, value);
    }
    return node;
  }

  deleteItem(value) {
    this.root = this.#deleteNode(this.root, value);
  }

  #deleteNode(node, value) {
    if (node === null) return null; // value not found - nothing to do

    if (value < node.data) {
      node.left = this.#deleteNode(node.left, value);
      return node;
    }
    if (value > node.data) {
      node.right = this.#deleteNode(node.right, value);
      return node;
    }

    // Found the node to delete - three cases:

    // 1. No children - just remove it.
    if (node.left === null && node.right === null) {
      return null;
    }
    // 2. One child - replace this node with that child.
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    // 3. Two children - find the in-order successor (smallest value in the
    // right subtree), copy its data up into this node, then delete that
    // successor node from the right subtree (it has at most one child, so
    // that recursive call falls into an easier case above).
    let successor = node.right;
    while (successor.left !== null) {
      successor = successor.left;
    }
    node.data = successor.data;
    node.right = this.#deleteNode(node.right, successor.data);
    return node;
  }

  /* ---------------- Traversals ---------------- */

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('levelOrderForEach requires a callback function');
    }
    if (this.root === null) return;

    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // Same traversal, implemented recursively instead of with a while-loop,
  // per the assignment's "try implementing both!" suggestion.
  levelOrderForEachRecursive(callback) {
    if (typeof callback !== 'function') {
      throw new Error('levelOrderForEachRecursive requires a callback function');
    }

    const traverseQueue = (queue) => {
      if (queue.length === 0) return;
      const [node, ...rest] = queue;
      callback(node.data);
      const nextQueue = [...rest];
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
      traverseQueue(nextQueue);
    };

    if (this.root) traverseQueue([this.root]);
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('inOrderForEach requires a callback function');
    }
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };
    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('preOrderForEach requires a callback function');
    }
    const traverse = (node) => {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('postOrderForEach requires a callback function');
    }
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };
    traverse(this.root);
  }

  /* ---------------- height / depth ---------------- */

  #findNode(node, value) {
    if (node === null) return null;
    if (value === node.data) return node;
    return value < node.data ? this.#findNode(node.left, value) : this.#findNode(node.right, value);
  }

  // Height = number of edges on the longest path from this node down to a
  // leaf. A leaf itself has height 0, so a null child contributes -1 (that
  // way 1 + max(-1, -1) = 0 for an actual leaf).
  #nodeHeight(node) {
    if (node === null) return -1;
    return 1 + Math.max(this.#nodeHeight(node.left), this.#nodeHeight(node.right));
  }

  height(value) {
    const node = this.#findNode(this.root, value);
    if (node === null) return undefined;
    return this.#nodeHeight(node);
  }

  // Depth = number of edges from the root down to this node.
  depth(value) {
    return this.#depthHelper(this.root, value, 0);
  }

  #depthHelper(node, value, currentDepth) {
    if (node === null) return undefined;
    if (value === node.data) return currentDepth;
    return value < node.data
      ? this.#depthHelper(node.left, value, currentDepth + 1)
      : this.#depthHelper(node.right, value, currentDepth + 1);
  }

  /* ---------------- balance ---------------- */

  // Checked at EVERY node, not just the root - a tree can look fine at the
  // top and still be unbalanced several levels down.
  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.#nodeHeight(node.left);
    const rightHeight = this.#nodeHeight(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    // In-order traversal of a BST always yields values in sorted order,
    // balanced or not - so this gives buildBalanced exactly what it needs.
    const values = [];
    this.inOrderForEach((value) => values.push(value));
    this.root = this.#buildBalanced(values, 0, values.length - 1);
  }
}