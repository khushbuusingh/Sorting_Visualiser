import React from 'react';

export function SortingVisualizer({ array, sortingState, isCompleted }) {
  const maxValue = Math.max(...array);
  const containerHeight = 400;

  const getBarColor = (index) => {
    if (isCompleted) return 'bg-green-500';
    if (sortingState.sortedIndices.includes(index)) return 'bg-green-500';
    if (sortingState.pivotIndex === index) return 'bg-purple-500';
    if (sortingState.currentIndices.includes(index)) {
      // If multiple indices are being compared, use blue for comparison
      // If it's a swap operation (typically 2 indices), use red
      return sortingState.currentIndices.length === 2 ? 'bg-red-500' : 'bg-blue-500';
    }
    return 'bg-gray-500';
  };

  const getBarHeight = (value) => {
    return (value / maxValue) * containerHeight;
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg p-6 shadow-xl">
      <div 
        className="flex items-end justify-center space-x-1 overflow-hidden"
        style={{ height: `${containerHeight + 20}px` }}
      >
        {array.map((value, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ease-in-out rounded-t-sm ${getBarColor(index)} shadow-sm`}
            style={{
              height: `${getBarHeight(value)}px`,
              width: `${Math.max(800 / array.length - 2, 2)}px`,
              minWidth: '2px'
            }}
            title={`Value: ${value}, Index: ${index}`}
          >
            {array.length <= 20 && (
              <div className="text-xs text-white font-medium text-center mt-1">
                {value}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isCompleted && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg">
            <span className="text-lg">🎉</span>
            <span className="font-medium">Sorting Complete!</span>
          </div>
        </div>
      )}
    </div>
  );
}