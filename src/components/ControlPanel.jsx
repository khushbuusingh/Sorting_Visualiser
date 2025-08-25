import React from 'react';

const algorithms = [
  { value: 'bubble', label: 'Bubble Sort', description: 'O(n²) - Simple comparison-based algorithm' },
  { value: 'insertion', label: 'Insertion Sort', description: 'O(n²) - Efficient for small datasets' },
  { value: 'selection', label: 'Selection Sort', description: 'O(n²) - Finds minimum element repeatedly' },
  { value: 'merge', label: 'Merge Sort', description: 'O(n log n) - Divide and conquer approach' },
  { value: 'quick', label: 'Quick Sort', description: 'O(n log n) avg - Partition-based sorting' }
];

export function ControlPanel({
  algorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  speed,
  onSpeedChange,
  disabled
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Sorting Algorithm
          </label>
          <select
            value={algorithm}
            onChange={(e) => onAlgorithmChange(e.target.value)}
            disabled={disabled}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {algorithms.map((algo) => (
              <option key={algo.value} value={algo.value}>
                {algo.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-2">
            {algorithms.find(a => a.value === algorithm)?.description}
          </p>
        </div>

        {/* Array Size */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>10</span>
            <span>100</span>
          </div>
        </div>

        {/* Speed Control */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Speed: {speed}ms
          </label>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Fast (10ms)</span>
            <span>Slow (500ms)</span>
          </div>
        </div>
      </div>
    </div>
  );
}