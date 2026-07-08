
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const leftHalf = mergeSort(arr.slice(0, middle)); 
  const rightHalf = mergeSort(arr.slice(middle)); 
  return merge(leftHalf, rightHalf);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // One side may still have leftover elements once the other runs out -
  // they're already sorted, so just tack them on the end.
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}



console.log(mergeSort([]));


console.log(mergeSort([73]));


console.log(mergeSort([1, 2, 3, 4, 5]));


console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));


console.log(mergeSort([105, 79, 100, 110]));
