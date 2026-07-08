import HashMap from './HashMap.js';
import HashSet from './Hashset.js';

console.log('=========== HashMap ===========');

const test = new HashMap(0.75);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('After 12 entries:');
console.log('  length():', test.length()); 
console.log('  capacity:', test.capacity); 
console.log('  load level:', test.length() / test.capacity); 

console.log('\nOverwriting a few existing keys...');
test.set('apple', 'green'); 
test.set('dog', 'black'); 
console.log('  length() after overwrites (should still be 12):', test.length());
console.log('  capacity after overwrites (should still be 16):', test.capacity);
console.log('  get("apple") ->', test.get('apple'));
console.log('  get("dog") ->', test.get('dog')); 

console.log('\nAdding "moon" - this should push us over the load factor and trigger growth...');
test.set('moon', 'silver');
console.log('  length() (should be 13):', test.length());
console.log('  capacity (should have doubled to 32):', test.capacity);
console.log('  load level (should now be well under 0.75):', test.length() / test.capacity);

console.log('\nOverwriting again after growth...');
test.set('moon', 'gray'); 
console.log('  length() (should still be 13):', test.length());
console.log('  get("moon") ->', test.get('moon')); 

console.log('\nOther methods:');
console.log('  has("grape"):', test.has('grape')); 
console.log('  has("nonexistent"):', test.has('nonexistent')); 
console.log('  get("nonexistent"):', test.get('nonexistent')); 

console.log('  keys():', test.keys());
console.log('  values():', test.values());
console.log('  entries():', test.entries());

console.log('\nremove("frog") ->', test.remove('frog')); 
console.log('remove("frog") again ->', test.remove('frog')); 
console.log('length() after removing frog (should be 12):', test.length());

console.log('\nclear()');
test.clear();
console.log('length() after clear() (should be 0):', test.length());
console.log('keys() after clear() (should be []):', test.keys());

console.log('\n=========== HashSet (extra credit) ===========');

const petSet = new HashSet();
petSet.add('dog');
petSet.add('cat');
petSet.add('parrot');
petSet.add('dog');

console.log('length() (should be 3):', petSet.length());
console.log('has("cat"):', petSet.has('cat')); 
console.log('has("fish"):', petSet.has('fish')); 
console.log('keys():', petSet.keys());

console.log('remove("cat") ->', petSet.remove('cat'));
console.log('length() after remove (should be 2):', petSet.length());

for (let i = 0; i < 20; i++) {
  petSet.add(`animal-${i}`);
}
console.log('length() after adding 20 more (should be 22):', petSet.length());
console.log('capacity (should have grown beyond the initial 16):', petSet.capacity);