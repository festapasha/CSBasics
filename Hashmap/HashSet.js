import HashMap from './HashMap.js';

export default class HashSet {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.map = new HashMap(loadFactor, capacity);
  }

  hash(key) {
    return this.map.hash(key);
  }

  add(key) {
    this.map.set(key, true);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  length() {
    return this.map.length();
  }

  clear() {
    this.map.clear();
  }

  keys() {
    return this.map.keys();
  }

  get capacity() {
    return this.map.capacity;
  }

  get loadFactor() {
    return this.map.loadFactor;
  }
}