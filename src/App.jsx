import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Shuffle, BarChart3 } from 'lucide-react';
import { SortingVisualizer } from './components/SortingVisualizer';
import { ControlPanel } from './components/ControlPanel';
import { Statistics } from './components/Statistics';
import { useSortingAlgorithm } from './hooks/UseSortingAlgorithm';
import { generateRandomArray } from './utils/SortingUtils';

function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sortingState, setSortingState] = useState({
    comparisons: 0,
    swaps: 0,
    currentIndices: [],
    pivotIndex: null,
    sortedIndices: []
  });

  const {
    startSorting,
    pauseSorting,
    resetSorting,
    isSorting,
    isCompleted
  } = useSortingAlgorithm(array, setArray, setSortingState, algorithm, speed);//custom hook

  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    resetSorting();
    setSortingState({
      comparisons: 0,
      swaps: 0,
      currentIndices: [],
      pivotIndex: null,
      sortedIndices: []
    });
  }, [arraySize, resetSorting]);

  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  const handlePlay = () => {
    if (!isSorting && !isCompleted) {
      startSorting();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    pauseSorting();
    setIsPlaying(false);
  };

  const handleReset = () => {
    resetSorting();
    setIsPlaying(false);
    setSortingState(prev => ({
      ...prev,
      currentIndices: [],
      pivotIndex: null,
      sortedIndices: []
    }));
  };

  const handleShuffle = () => {
    generateNewArray();
    setIsPlaying(false);
  };

  const handleAlgorithmChange = (newAlgorithm) => {
    setAlgorithm(newAlgorithm);
    handleReset();
  };

  const handleArraySizeChange = (newSize) => {
    setArraySize(newSize);
    setIsPlaying(false);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">Sorting Visualizer</h1>
          </div>
          <Statistics
            comparisons={sortingState.comparisons}
            swaps={sortingState.swaps}
            algorithm={algorithm}
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Control Panel */}
        <div className="mb-8">
          <ControlPanel
            algorithm={algorithm}
            onAlgorithmChange={handleAlgorithmChange}
            arraySize={arraySize}
            onArraySizeChange={handleArraySizeChange}
            speed={speed}
            onSpeedChange={handleSpeedChange}
            disabled={isSorting}
          />
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex justify-center space-x-4">
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            disabled={isCompleted}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isCompleted
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : isPlaying
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-orange-500/25'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/25'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleReset}
            disabled={!isSorting && !isCompleted}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-gray-500/25"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleShuffle}
            disabled={isSorting}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:text-gray-400 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            <Shuffle className="w-5 h-5" />
            <span>Shuffle</span>
          </button>
        </div>

        {/* Sorting Visualizer */}
        <SortingVisualizer
          array={array}
          sortingState={sortingState}
          isCompleted={isCompleted}
        />

        {/* Legend */}
        <div className="mt-8 flex justify-center">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3 text-center">Color Legend</h3>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span className="text-gray-300">Unsorted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-300">Comparing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-300">Swapping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-gray-300">Pivot</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-300">Sorted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;