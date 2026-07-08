import Node from './Node.js';

export default class LinkedList {
  constructor() {
    this.headNode = null;
  }

  // Adds a new node containing `value` to the end of the list.
  append(value) {
    const newNode = new Node(value);

    if (!this.headNode) {
      this.headNode = newNode;
      return this;
    }

    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
    return this;
  }

  // Adds a new node containing `value` to the start of the list.
  prepend(value) {
    this.headNode = new Node(value, this.headNode);
    return this;
  }

  // Total number of nodes in the list.
  size() {
    let count = 0;
    let current = this.headNode;
    while (current) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  // Value of the first node, or undefined if the list is empty.
  head() {
    return this.headNode ? this.headNode.value : undefined;
  }

  // Value of the last node, or undefined if the list is empty.
  tail() {
    if (!this.headNode) return undefined;
    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current.value;
  }

  // Value of the node at `index`, or undefined if there's no node there.
  at(index) {
    let current = this.headNode;
    let i = 0;
    while (current) {
      if (i === index) return current.value;
      current = current.nextNode;
      i++;
    }
    return undefined;
  }

  // Removes the head node and returns its value. Returns undefined on an empty list.
  pop() {
    if (!this.headNode) return undefined;
    const value = this.headNode.value;
    this.headNode = this.headNode.nextNode;
    return value;
  }

  // True if `value` exists anywhere in the list.
  contains(value) {
    let current = this.headNode;
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }

  // Index of the first node containing `value`, or -1 if not found.
  findIndex(value) {
    let current = this.headNode;
    let i = 0;
    while (current) {
      if (current.value === value) return i;
      current = current.nextNode;
      i++;
    }
    return -1;
  }

  // '( value ) -> ( value ) -> ... -> null'. Empty list -> ''.
  toString() {
    if (!this.headNode) return '';

    let result = '';
    let current = this.headNode;
    while (current) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    result += 'null';
    return result;
  }

  /* ---------------- Extra credit ---------------- */

  // Inserts new nodes for each of `values` starting at `index`, shifting
  // everything currently at/after `index` further down the list.
  insertAt(index, ...values) {
    const listSize = this.size();
    if (index < 0 || index > listSize) {
      throw new RangeError(`insertAt: index ${index} is out of bounds (list size is ${listSize}).`);
    }

    if (values.length === 0) return this;

    if (index === 0) {
      // Prepend in reverse so the values end up in the order given.
      for (let i = values.length - 1; i >= 0; i--) {
        this.prepend(values[i]);
      }
      return this;
    }

    // Walk to the node just before the insertion point.
    let nodeBefore = this.headNode;
    for (let i = 0; i < index - 1; i++) {
      nodeBefore = nodeBefore.nextNode;
    }

    const restOfList = nodeBefore.nextNode;

    let current = nodeBefore;
    for (const value of values) {
      const newNode = new Node(value);
      current.nextNode = newNode;
      current = newNode;
    }
    current.nextNode = restOfList;

    return this;
  }

  // Removes and returns the value of the node at `index`.
  removeAt(index) {
    const listSize = this.size();
    if (index < 0 || index >= listSize) {
      throw new RangeError(`removeAt: index ${index} is out of bounds (list size is ${listSize}).`);
    }

    if (index === 0) {
      const value = this.headNode.value;
      this.headNode = this.headNode.nextNode;
      return value;
    }

    let nodeBefore = this.headNode;
    for (let i = 0; i < index - 1; i++) {
      nodeBefore = nodeBefore.nextNode;
    }

    const nodeToRemove = nodeBefore.nextNode;
    nodeBefore.nextNode = nodeToRemove.nextNode;
    return nodeToRemove.value;
  }
}