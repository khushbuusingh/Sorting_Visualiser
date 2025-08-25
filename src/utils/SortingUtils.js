export function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 400) + 10);
}

// Bubble Sort Implementation
export function bubbleSort(arr) {
  const steps = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = [];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      comparisons++;
      
      // Show comparison
      steps.push({
        array: [...array],
        state: {
          comparisons,//to show comparison 
          swaps,//to show swaps
          currentIndices: [j, j + 1],//to highlight these bars
          pivotIndex: null,
          sortedIndices: [...sortedIndices]
        }
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        
        // Show swap
        steps.push({
          array: [...array],
          state: {
            comparisons,
            swaps,
            currentIndices: [j, j + 1],
            pivotIndex: null,
            sortedIndices: [...sortedIndices]
          }
        });
      }
    }
    
    sortedIndices.push(array.length - 1 - i);
    
    // Show sorted element
    steps.push({
      array: [...array],
      state: {
        comparisons,
        swaps,
        currentIndices: [],
        pivotIndex: null,
        sortedIndices: [...sortedIndices]
      }
    });
  }
  
  sortedIndices.push(0);
  return steps;
}

// Insertion Sort Implementation
export function insertionSort(arr) {
  const steps = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = [0];

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0) {
      comparisons++;
      
      steps.push({
        array: [...array],
        state: {
          comparisons,
          swaps,
          currentIndices: [j, j + 1],
          pivotIndex: null,
          sortedIndices: [...sortedIndices]
        }
      });

      if (array[j] <= key) break;
      
      array[j + 1] = array[j];
      swaps++;
      j--;
    }
    
    array[j + 1] = key;
    sortedIndices.push(i);
    
    steps.push({
      array: [...array],
      state: {
        comparisons,
        swaps,
        currentIndices: [],
        pivotIndex: null,
        sortedIndices: [...sortedIndices]
      }
    });
  }

  return steps;
}

// Selection Sort Implementation
export function selectionSort(arr) {
  const steps = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = [];

  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < array.length; j++) {
      comparisons++;
      
      steps.push({
        array: [...array],
        state: {
          comparisons,
          swaps,
          currentIndices: [minIdx, j],
          pivotIndex: null,
          sortedIndices: [...sortedIndices]
        }
      });

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      swaps++;
      
      steps.push({
        array: [...array],
        state: {
          comparisons,
          swaps,
          currentIndices: [i, minIdx],
          pivotIndex: null,
          sortedIndices: [...sortedIndices]
        }
      });
    }
    
    sortedIndices.push(i);
  }
  
  sortedIndices.push(array.length - 1);
  return steps;
}

// Quick Sort Implementation
export function quickSort(arr) {
  const steps = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = [];

  function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      
      steps.push({
        array: [...array],
        state: {
          comparisons,
          swaps,
          currentIndices: [j],
          pivotIndex: high,
          sortedIndices: [...sortedIndices]
        }
      });

      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          [array[i], array[j]] = [array[j], array[i]];
          swaps++;
          
          steps.push({
            array: [...array],
            state: {
              comparisons,
              swaps,
              currentIndices: [i, j],
              pivotIndex: high,
              sortedIndices: [...sortedIndices]
            }
          });
        }
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    swaps++;
    sortedIndices.push(i + 1);
    
    steps.push({
      array: [...array],
      state: {
        comparisons,
        swaps,
        currentIndices: [i + 1, high],
        pivotIndex: null,
        sortedIndices: [...sortedIndices]
      }
    });

    return i + 1;
  }

  function quickSortHelper(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, array.length - 1);
  return steps;
}

// Merge Sort Implementation
export function mergeSort(arr) {
  const steps = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = [];

  function merge(left, mid, right) {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      
      steps.push({
        array: [...array],
        state: {
          comparisons,
          swaps,
          currentIndices: [left + i, mid + 1 + j],
          pivotIndex: null,
          sortedIndices: [...sortedIndices]
        }
      });

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }
      swaps++;
      k++;
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      swaps++;
      i++;
      k++;
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      swaps++;
      j++;
      k++;
    }

    steps.push({
      array: [...array],
      state: {
        comparisons,
        swaps,
        currentIndices: [],
        pivotIndex: null,
        sortedIndices: [...sortedIndices]
      }
    });
  }

  function mergeSortHelper(left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  }

  mergeSortHelper(0, array.length - 1);
  
  // Mark all as sorted at the end
  for (let i = 0; i < array.length; i++) {
    sortedIndices.push(i);
  }
  
  return steps;
}
