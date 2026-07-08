
function fibs(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      result.push(0);
    } else if (i === 1) {
      result.push(1);
    } else {
      result.push(result[i - 1] + result[i - 2]);
    }
  }
  return result;
}


function fibsRec(n) {
  console.log('This was printed recursively');

  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const sequence = fibsRec(n - 1); 
  const nextNumber = sequence[sequence.length - 1] + sequence[sequence.length - 2];
  sequence.push(nextNumber);
  return sequence;
}



console.log('fibs(8):', fibs(8));


console.log('fibs(1):', fibs(1));


console.log('fibs(0):', fibs(0));


console.log('---');

console.log('fibsRec(8):', fibsRec(8));


console.log('fibsRec(1):', fibsRec(1));
console.log('fibsRec(0):', fibsRec(0));
console.log('fibsRec(15):', fibsRec(15));