import LinkedList from './LinkedList.js';

const list = new LinkedList();

list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');

console.log(list.toString());
// Expected: ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null

console.log('--- basic methods ---');
console.log('size():', list.size()); // 6
console.log('head():', list.head()); // dog
console.log('tail():', list.tail()); // turtle
console.log('at(2):', list.at(2)); // parrot
console.log('at(99):', list.at(99)); // undefined
console.log('contains("snake"):', list.contains('snake')); // true
console.log('contains("fish"):', list.contains('fish')); // false
console.log('findIndex("hamster"):', list.findIndex('hamster')); // 3
console.log('findIndex("fish"):', list.findIndex('fish')); // -1

console.log('--- pop() ---');
console.log('pop():', list.pop()); // dog
console.log('after pop:', list.toString());
// Expected: ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null

console.log('--- prepend() ---');
list.prepend('lion');
console.log('after prepend("lion"):', list.toString());
// Expected: ( lion ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null

console.log('--- insertAt() (extra credit) ---');
const numberList = new LinkedList();
numberList.append(1).append(2).append(3);
console.log('before insertAt:', numberList.toString());
// Expected: ( 1 ) -> ( 2 ) -> ( 3 ) -> null

numberList.insertAt(1, 10, 11);
console.log('after insertAt(1, 10, 11):', numberList.toString());
// Expected: ( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null

numberList.insertAt(0, 'first');
console.log('after insertAt(0, "first"):', numberList.toString());

numberList.insertAt(numberList.size(), 'last');
console.log('after insertAt(size, "last"):', numberList.toString());

try {
  numberList.insertAt(999, 'oops');
} catch (err) {
  console.log('insertAt(999, ...) correctly threw:', err instanceof RangeError, '-', err.message);
}

console.log('--- removeAt() (extra credit) ---');
console.log('removeAt(0):', numberList.removeAt(0));
console.log('after removeAt(0):', numberList.toString());

try {
  numberList.removeAt(999);
} catch (err) {
  console.log('removeAt(999) correctly threw:', err instanceof RangeError, '-', err.message);
}

console.log('--- empty list edge cases ---');
const emptyList = new LinkedList();
console.log('toString():', JSON.stringify(emptyList.toString())); // ""
console.log('size():', emptyList.size()); // 0
console.log('head():', emptyList.head()); // undefined
console.log('tail():', emptyList.tail()); // undefined
console.log('pop():', emptyList.pop()); // undefined
console.log('contains("x"):', emptyList.contains('x')); // false
console.log('findIndex("x"):', emptyList.findIndex('x')); // -1