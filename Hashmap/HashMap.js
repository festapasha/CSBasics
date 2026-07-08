export default class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    
    this.buckets = this.#makeEmptyBuckets(this.capacity);
    this.count = 0; 
  }

  #makeEmptyBuckets(capacity) {
    return Array.from({ length: capacity }, () => []);
  }


  #checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
  }

  
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    this.#checkBounds(index);
    const bucket = this.buckets[index];

    const existingPair = bucket.find(([existingKey]) => existingKey === key);
    if (existingPair) {
      existingPair[1] = value; 
      return;
    }

    bucket.push([key, value]);
    this.count++;

   
    if (this.count / this.capacity > this.loadFactor) {
      this.#grow();
    }
  }

  #grow() {
    const oldEntries = this.entries(); 
    this.capacity *= 2;
    this.buckets = this.#makeEmptyBuckets(this.capacity);
    this.count = 0;
    for (const [key, value] of oldEntries) {
      this.set(key, value); 
    }
  }

  get(key) {
    const index = this.hash(key);
    this.#checkBounds(index);
    const pair = this.buckets[index].find(([existingKey]) => existingKey === key);
    return pair ? pair[1] : null;
  }

  has(key) {
    const index = this.hash(key);
    this.#checkBounds(index);
    return this.buckets[index].some(([existingKey]) => existingKey === key);
  }

  remove(key) {
    const index = this.hash(key);
    this.#checkBounds(index);
    const bucket = this.buckets[index];
    const pairIndex = bucket.findIndex(([existingKey]) => existingKey === key);
    if (pairIndex === -1) return false;
    bucket.splice(pairIndex, 1);
    this.count--;
    return true;
  }

  length() {
    return this.count;
  }

  clear() {
    this.buckets = this.#makeEmptyBuckets(this.capacity);
    this.count = 0;
  }

  keys() {
    return this.entries().map(([key]) => key);
  }

  values() {
    return this.entries().map(([, value]) => value);
  }

  entries() {
    const result = [];
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        result.push([pair[0], pair[1]]);
      }
    }
    return result;
  }
}