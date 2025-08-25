import { useState, useRef, useCallback } from 'react';
import { bubbleSort, mergeSort, quickSort, insertionSort, selectionSort } from '../utils/SortingUtils';

export function useSortingAlgorithm(
  array,
  setArray,
  setSortingState,
  algorithm,
  speed
) {
  const [isSorting, setIsSorting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timeoutRef = useRef(null);
  const stepsRef = useRef([]);
  const currentStepRef = useRef(0);

  const algorithmMap = {
    bubble: bubbleSort,
    merge: mergeSort,
    quick: quickSort,
    insertion: insertionSort,
    selection: selectionSort,
  };

  const executeNextStep = useCallback(() => {
    if (currentStepRef.current >= stepsRef.current.length) {
      setIsSorting(false);
      setIsCompleted(true);
      setSortingState(prev => ({
        ...prev,
        sortedIndices: Array.from({ length: array.length }, (_, i) => i)
      }));
      return;
    }

    const step = stepsRef.current[currentStepRef.current];
    setArray([...step.array]);  // update array on screen
    setSortingState({ ...step.state }); // update highlighting state
    currentStepRef.current++; // // move to next step

    timeoutRef.current = setTimeout(executeNextStep, speed); //  // keep running until finished
  }, [speed, setArray, setSortingState, array.length]);

  const startSorting = useCallback(() => {
    if (isCompleted) return;

    if (stepsRef.current.length === 0) {
      // Generate sorting steps
      const sortingFunction = algorithmMap[algorithm]; //sortingFunction = bubbleSort

      stepsRef.current = sortingFunction([...array]);//stepsRef.current = bubbleSort([...array]);
    }

    setIsSorting(true);
    executeNextStep();
  }, [algorithm, array, executeNextStep, isCompleted]);

  const pauseSorting = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsSorting(false);
  }, []);

  const resetSorting = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsSorting(false);
    setIsCompleted(false);
    stepsRef.current = [];
    currentStepRef.current = 0;
  }, []);

  return {
    startSorting,
    pauseSorting,
    resetSorting,
    isSorting,
    isCompleted
  };
}