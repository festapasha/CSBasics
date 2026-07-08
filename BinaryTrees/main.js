import Tree from './Tree.js';
import prettyPrint from './prettyPrint.js';

function randomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function printAllOrders(tree) {
  const levelOrder = [];
  const preOrder = [];
  const postOrder = [];
  const inOrder = [];

  tree.levelOrderForEach((value) => levelOrder.push(value));
  tree.preOrderForEach((value) => preOrder.push(value));
  tree.postOrderForEach((value) => postOrder.push(value));
  tree.inOrderForEach((value) => inOrder.push(value));

  console.log('  Level order:', levelOrder);
  console.log('  Pre order:  ', preOrder);
  console.log('  Post order: ', postOrder);
  console.log('  In order:   ', inOrder);
}

/* ---------------- 1. Build a tree from random numbers < 100 ---------------- */

console.log('=========== 1. Building tree from random numbers < 100 ===========');
const tree = new Tree(randomArray(15, 100));
prettyPrint(tree.root);

/* ---------------- 2. Confirm it's balanced ---------------- */

console.log('\n=========== 2. isBalanced()? ===========');
console.log(tree.isBalanced()); // true - buildTree always produces a balanced tree

/* ---------------- 3. Print all traversal orders ---------------- */

console.log('\n=========== 3. All traversal orders ===========');
printAllOrders(tree);

/* ---------------- 4. Unbalance it with numbers > 100 ---------------- */

console.log('\n=========== 4. Unbalancing with values > 100 ===========');
[150, 200, 175, 190, 210, 160].forEach((value) => tree.insert(value));
prettyPrint(tree.root);

/* ---------------- 5. Confirm it's now unbalanced ---------------- */

console.log('\n=========== 5. isBalanced()? ===========');
console.log(tree.isBalanced()); // false

/* ---------------- 6. Rebalance ---------------- */

console.log('\n=========== 6. rebalance() ===========');
tree.rebalance();
prettyPrint(tree.root);

/* ---------------- 7. Confirm it's balanced again ---------------- */

console.log('\n=========== 7. isBalanced()? ===========');
console.log(tree.isBalanced()); // true

/* ---------------- 8. Print all traversal orders again ---------------- */

console.log('\n=========== 8. All traversal orders (after rebalance) ===========');
printAllOrders(tree);

/* ---------------- A few extra checks on the other required methods ---------------- */

console.log('\n=========== Extra: includes / insert / deleteItem / height / depth ===========');

const sample = new Tree([10, 5, 15, 3, 7, 12, 18]);
prettyPrint(sample.root);

console.log('includes(7):', sample.includes(7)); // true
console.log('includes(99):', sample.includes(99)); // false

console.log('height(10) [root]:', sample.height(10)); // 2
console.log('height(18) [leaf]:', sample.height(18)); // 0
console.log('height(999) [missing]:', sample.height(999)); // undefined

console.log('depth(10) [root]:', sample.depth(10)); // 0
console.log('depth(18) [leaf]:', sample.depth(18)); // 2
console.log('depth(999) [missing]:', sample.depth(999)); // undefined

console.log('\ndeleteItem(5) - a node with two children');
sample.deleteItem(5);
prettyPrint(sample.root);
console.log('includes(5) after delete:', sample.includes(5)); // false
console.log('isBalanced() after delete:', sample.isBalanced());

console.log('\ninsert(1) then insert(1) again (duplicate - should be a no-op)');
sample.insert(1);
sample.insert(1);
const values = [];
sample.inOrderForEach((v) => values.push(v));
console.log('in-order values (1 should appear only once):', values);

console.log('\nCalling levelOrderForEach() with no callback should throw:');
try {
  sample.levelOrderForEach();
} catch (err) {
  console.log(' ->', err.message);
}