import React from 'react';

export function Statistics({ comparisons, swaps, algorithm }) {
  const algorithmNames = {
    bubble: 'Bubble Sort',
    insertion: 'Insertion Sort',
    selection: 'Selection Sort',
    merge: 'Merge Sort',
    quick: 'Quick Sort'
  };

  return (
    <div className="flex items-center space-x-6 text-sm">
      <div className="text-gray-300">
        <span className="font-medium text-white">{algorithmNames[algorithm]}</span>
      </div>
      <div className="flex space-x-4">
        <div className="text-center">
          <div className="text-xs text-gray-400">Comparisons</div>
          <div className="text-lg font-bold text-blue-400">{comparisons.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">Swaps</div>
          <div className="text-lg font-bold text-red-400">{swaps.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}